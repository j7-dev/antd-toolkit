import { describe, it, expect } from 'vitest'
import {
	cn,
	getCurrencyString,
	filterObjKeys,
	keyToWord,
	getGCDItems,
	simpleDecrypt,
	getFileExtension,
	isImageFile,
	isAudioFile,
	isVideoFile,
} from './index'

describe('cn', () => {
	it('合併 Tailwind CSS class 並解決衝突', () => {
		expect(cn('p-2', 'p-4')).toBe('p-4')
	})

	it('支援條件式 class 合併', () => {
		const isActive = true
		expect(cn('at-flex', isActive && 'at-bg-blue-500')).toBe(
			'at-flex at-bg-blue-500',
		)
	})
})

describe('getCurrencyString', () => {
	it('預設使用 NT$ 符號格式化價格', () => {
		expect(getCurrencyString({ price: 100 })).toBe('NT$ 100')
	})

	it('price 為 undefined 時回傳空字串', () => {
		expect(getCurrencyString({ price: undefined })).toBe('')
	})

	it('支援自訂貨幣符號', () => {
		expect(getCurrencyString({ price: 50, symbol: '$' })).toBe('$ 50')
	})

	it('price 為字串時直接串接', () => {
		expect(getCurrencyString({ price: '1,000' })).toBe('NT$ 1,000')
	})
})

describe('filterObjKeys', () => {
	it('預設過濾 undefined 值的 key', () => {
		const obj = { a: 1, b: undefined, c: 'hello' }
		const result = filterObjKeys(obj)
		expect(result).toEqual({ a: 1, c: 'hello' })
	})

	it('遞迴處理巢狀物件', () => {
		const obj = { a: 1, b: { c: undefined } }
		const result = filterObjKeys(obj)
		expect(result).toEqual({ a: 1 })
	})

	it('移除過濾後的空物件', () => {
		const obj = { a: 1, b: { c: undefined, d: undefined } }
		const result = filterObjKeys(obj)
		expect(result).toEqual({ a: 1 })
	})
})

describe('keyToWord', () => {
	it('snake_case 轉換為大寫開頭的單字', () => {
		expect(keyToWord('hello_world')).toBe('Hello World')
	})

	it('camelCase 在大寫字母前插入空格', () => {
		expect(keyToWord('helloWorld')).toBe('Hello World')
	})
})

describe('getGCDItems', () => {
	it('回傳所有陣列中的共同項目', () => {
		const items = [
			[
				{ id: '1', name: 'a' },
				{ id: '2', name: 'b' },
			],
			[
				{ id: '2', name: 'b' },
				{ id: '3', name: 'c' },
			],
			[
				{ id: '2', name: 'b' },
				{ id: '4', name: 'd' },
			],
		]
		const result = getGCDItems(items)
		expect(result).toEqual([{ id: '2', name: 'b' }])
	})

	it('空陣列回傳空結果', () => {
		expect(getGCDItems([])).toEqual([])
	})

	it('支援自訂 key', () => {
		const items = [
			[{ code: 'A' }, { code: 'B' }],
			[{ code: 'B' }, { code: 'C' }],
		]
		const result = getGCDItems(items, 'code')
		expect(result).toEqual([{ code: 'B' }])
	})
})

describe('simpleDecrypt', () => {
	it('反向位移 base64 解碼後回傳 JSON 物件', () => {
		// 手動生成加密字串：JSON.stringify -> btoa -> 逐字元 +1
		const original = { key: 'value' }
		const jsonStr = JSON.stringify(original)
		const base64 = btoa(jsonStr)
		const encrypted = base64
			.split('')
			.map((c) => String.fromCharCode(c.charCodeAt(0) + 1))
			.join('')
		expect(simpleDecrypt(encrypted)).toEqual(original)
	})

	it('非字串輸入回傳 null', () => {
		expect(simpleDecrypt(123 as any)).toBeNull()
	})
})

describe('getFileExtension', () => {
	it('取得檔案副檔名並轉小寫', () => {
		expect(getFileExtension('photo.JPG')).toBe('jpg')
	})
})

describe('isImageFile', () => {
	it('辨識圖片副檔名 (jpg, jpeg, png, gif, webp)', () => {
		expect(isImageFile('photo.jpg')).toBe(true)
		expect(isImageFile('photo.png')).toBe(true)
		expect(isImageFile('photo.gif')).toBe(true)
		expect(isImageFile('photo.webp')).toBe(true)
		expect(isImageFile('file.mp4')).toBe(false)
	})
})

describe('isAudioFile', () => {
	it('辨識音訊副檔名 (mp3, wav, m4a, aac, flac)', () => {
		expect(isAudioFile('song.mp3')).toBe(true)
		expect(isAudioFile('audio.wav')).toBe(true)
		expect(isAudioFile('track.flac')).toBe(true)
		expect(isAudioFile('file.jpg')).toBe(false)
	})
})

describe('isVideoFile', () => {
	it('辨識影片副檔名 (mp4, webm)', () => {
		expect(isVideoFile('video.mp4')).toBe(true)
		expect(isVideoFile('clip.webm')).toBe(true)
		expect(isVideoFile('file.avi')).toBe(false)
	})
})
