import { describe, it, expect } from 'vitest'
import {
	preTransformLegacyHtml,
	countLossySignals,
	countBlockSignals,
	detectContentLoss,
} from './legacyHtml'

/** 以 DOMParser 解析結果，避免對屬性順序做脆弱的字串比對 */
const parse = (html: string) =>
	new DOMParser().parseFromString(html, 'text/html')

describe('preTransformLegacyHtml', () => {
	it('裸 <img> 轉為 mediaLibrary block 結構', () => {
		const result = preTransformLegacyHtml(
			'<img src="https://x.com/a.jpg" alt="foo" title="bar">',
		)
		const div = parse(result).body.querySelector(
			'[data-block-key="mediaLibrary"]',
		)
		expect(div).not.toBeNull()
		expect(div?.getAttribute('data-url')).toBe('https://x.com/a.jpg')
		expect(div?.getAttribute('data-file-type')).toBe('image')
		expect(div?.getAttribute('data-alt')).toBe('foo')
		expect(div?.getAttribute('data-title')).toBe('bar')
		// 原始 <img> 已被替換掉
		expect(parse(result).body.querySelector('img')).toBeNull()
	})

	it('img 有 width attribute 時帶入 data-width-value / px', () => {
		const result = preTransformLegacyHtml('<img src="a.jpg" width="300">')
		const div = parse(result).body.querySelector('[data-block-key]')
		expect(div?.getAttribute('data-width-value')).toBe('300')
		expect(div?.getAttribute('data-width-unit')).toBe('px')
	})

	it('img 無 width attribute 時不設寬度（用 parse 預設）', () => {
		const result = preTransformLegacyHtml('<img src="a.jpg">')
		const div = parse(result).body.querySelector('[data-block-key]')
		expect(div?.hasAttribute('data-width-value')).toBe(false)
		expect(div?.hasAttribute('data-width-unit')).toBe(false)
	})

	it('<a> 包住的 img 保留連結資訊並替換整個 <a>', () => {
		const result = preTransformLegacyHtml(
			'<a href="https://x.com" target="_blank"><img src="a.jpg"></a>',
		)
		const doc = parse(result)
		const div = doc.body.querySelector('[data-block-key="mediaLibrary"]')
		expect(div?.getAttribute('data-link')).toBe('https://x.com')
		expect(div?.getAttribute('data-target')).toBe('_blank')
		// <a> 已被整個替換
		expect(doc.body.querySelector('a')).toBeNull()
	})

	it('裸 <iframe> 轉為 customHTML block 結構並保留原始元素', () => {
		const result = preTransformLegacyHtml(
			'<iframe src="https://y.com/embed"></iframe>',
		)
		const doc = parse(result)
		const wrapper = doc.body.querySelector('[data-block-key="customHTML"]')
		expect(wrapper).not.toBeNull()
		// customHTML 的 parse 會取 :scope > div 的 innerHTML
		const inner = wrapper?.querySelector(':scope > div')
		expect(inner?.querySelector('iframe')?.getAttribute('src')).toBe(
			'https://y.com/embed',
		)
	})

	it('已在 data-block-key 容器內的 img 不重複轉換', () => {
		const input =
			'<div data-block-key="mediaLibrary" data-url="a.jpg"><img src="a.jpg"></div>'
		const result = preTransformLegacyHtml(input)
		// 沒有可轉換的裸元素 → 原樣回傳
		expect(result).toBe(input)
		expect(
			parse(result).body.querySelectorAll('[data-block-key="mediaLibrary"]')
				.length,
		).toBe(1)
	})

	it('已在 bn- 容器內的 img 不重複轉換', () => {
		const input = '<div class="bn-file-block"><img src="a.jpg"></div>'
		expect(preTransformLegacyHtml(input)).toBe(input)
	})

	it('空字串原樣回傳', () => {
		expect(preTransformLegacyHtml('')).toBe('')
	})

	it('無 img / embed 的內容原樣回傳', () => {
		const input = '<p>hello world</p>'
		expect(preTransformLegacyHtml(input)).toBe(input)
	})
})

describe('countLossySignals', () => {
	it('統計純文字長度與媒體元素數', () => {
		const result = countLossySignals('<p>hello</p><img src="a.jpg">')
		expect(result.textLength).toBe(5)
		expect(result.mediaCount).toBe(1)
	})

	it('img / iframe / video / audio 皆計入媒體數', () => {
		const result = countLossySignals(
			'<img src="a.jpg"><iframe></iframe><video></video><audio></audio>',
		)
		expect(result.mediaCount).toBe(4)
	})

	it('空字串回傳 0', () => {
		expect(countLossySignals('')).toEqual({ textLength: 0, mediaCount: 0 })
	})
})

describe('countBlockSignals', () => {
	it('累加 paragraph 的 inline 文字長度', () => {
		const blocks = [
			{ type: 'paragraph', content: [{ type: 'text', text: 'hello' }] },
		]
		expect(countBlockSignals(blocks).textLength).toBe(5)
	})

	it('計數 mediaLibrary / customHTML / bunnyVideo 媒體 block', () => {
		const blocks = [
			{ type: 'mediaLibrary' },
			{ type: 'customHTML' },
			{ type: 'bunnyVideo' },
			{ type: 'paragraph', content: [] },
		]
		expect(countBlockSignals(blocks).mediaCount).toBe(3)
	})

	it('遞迴走訪 link inline 與 children', () => {
		const blocks = [
			{
				type: 'bulletListItem',
				content: [{ type: 'text', text: 'x' }],
				children: [
					{
						type: 'paragraph',
						content: [
							{ type: 'link', content: [{ type: 'text', text: 'yz' }] },
						],
					},
				],
			},
		]
		expect(countBlockSignals(blocks).textLength).toBe(3)
	})

	it('非陣列輸入回傳 0', () => {
		expect(countBlockSignals(null)).toEqual({ textLength: 0, mediaCount: 0 })
	})
})

describe('detectContentLoss', () => {
	it('圖片成功轉為 mediaLibrary block → 無遺失', () => {
		expect(detectContentLoss('<img src="a.jpg">', [{ type: 'mediaLibrary' }])).toBe(
			false,
		)
	})

	it('媒體 block 數變少 → 判定遺失', () => {
		expect(detectContentLoss('<img src="a.jpg">', [])).toBe(true)
	})

	it('文字損失超過 20% → 判定遺失', () => {
		const blocks = [
			{ type: 'paragraph', content: [{ type: 'text', text: 'ab' }] },
		]
		expect(detectContentLoss('<p>abcdefghij</p>', blocks)).toBe(true)
	})

	it('文字完整保留 → 無遺失', () => {
		const blocks = [
			{ type: 'paragraph', content: [{ type: 'text', text: 'abcdefghij' }] },
		]
		expect(detectContentLoss('<p>abcdefghij</p>', blocks)).toBe(false)
	})

	it('原始內容為空 → 無遺失', () => {
		expect(detectContentLoss('', [])).toBe(false)
	})
})
