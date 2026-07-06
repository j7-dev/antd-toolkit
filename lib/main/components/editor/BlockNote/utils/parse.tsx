import { BlockNoteEditor } from '@blocknote/core'
import { escapeHtml } from '@/main/utils/common'

/**
 * 檢查 Element 是否是 Legacy 版本的 HTML
 * 有兩種輸出 html 的方式 editor.blocksToHTMLLossy 和 editor.blocksToFullHTML
 * 目前用 blocksToHTMLLossy ，但要兼容舊版本的 editor.blocksToFullHTML
 * 檢查 class 是不是已 bn- 開頭
 * @param element
 * @returns boolean
 */
export const isLegacy = (element: HTMLElement): boolean => {
	const className = getEleClassName(element)
	return className.startsWith('bn-')
}

export const getEleClassName = (element: HTMLElement): string => {
	const className = element.className
	if (typeof className !== 'string') return ''
	return className
}

export const toFlexAlign = (
	align: 'center' | 'start' | 'left' | 'right' | '' | undefined | null,
) => {
	if (!align) return 'start'
	if (align === 'right') return 'end'
	return align
}

/**
 * 判斷 editor.document 是否含有實質內容
 *
 * 「無實質內容」= 完全沒有 block，或唯一 block 是空的 paragraph。
 * 其餘（block 數 > 1、唯一 block 非 paragraph、或 paragraph 有 inline content）
 * 皆視為有內容。用於序列化防呆，避免把有內容的文件誤存成空字串。
 */
function hasSubstantiveContent(blocks: BlockNoteEditor['document']): boolean {
	if (!Array.isArray(blocks) || blocks.length === 0) return false
	if (blocks.length > 1) return true
	const only = blocks[0]
	if ('paragraph' !== only?.type) return true
	return !!(only?.content as Array<any>)?.length
}

/**
 * 將 editor 內容序列化為 HTML 字串
 *
 * 重要：序列化過程若拋錯（例如 custom block 的 renderToDOMSpec 在 view 尚未掛載時
 * 直接 throw），不再吞掉錯誤回傳空字串，而是往上拋交由呼叫端處理。過去「錯誤回 ''」
 * 會讓任何序列化失敗都變成「成功存進空字串」，直接覆蓋掉原本的內容造成資料遺失。
 */
export async function getEditorHtml(editor: BlockNoteEditor, escape = false) {
	const blocks = editor?.document || []

	// 完全沒有 block：視為空內容，回傳空字串（非錯誤路徑）
	if (!blocks?.length) return ''

	// 唯一一個空 paragraph：真的沒內容，回傳空字串（非錯誤路徑）
	if (blocks.length === 1) {
		const firstBlock = blocks[0]
		if (
			'paragraph' === firstBlock?.type &&
			!(firstBlock?.content as Array<any>)?.length
		) {
			return ''
		}
	}

	// 序列化失敗會直接 throw（不再吞錯），由呼叫端 try/catch 中止儲存
	const html = await editor?.blocksToHTMLLossy(blocks)

	// 解析 html 結構
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	// 將 customHTML 的 data-html 移除
	doc.body.querySelectorAll('[data-html]').forEach((ele) => {
		ele.removeAttribute('data-html')
	})

	// 將每個 <p></p> 的空標籤，加上空白字符 &nbsp;
	doc.body.querySelectorAll('p').forEach((ele) => {
		if (ele.innerHTML.trim() === '') {
			ele.innerHTML = '&nbsp;'
		}
	})

	const newHtml = doc.body.innerHTML

	// 防呆：document 明明有實質內容，序列化結果卻是空字串 → 中止儲存避免覆蓋內容。
	// 注意：純圖片／媒體 block 序列化後 textContent 為空但 HTML 字串非空，故用字串本身判斷。
	if ('' === newHtml.trim() && hasSubstantiveContent(blocks)) {
		throw new Error('編輯器序列化結果為空,已中止儲存以避免內容遺失')
	}

	if (escape) {
		return escapeHtml(newHtml)
	}
	return `<div class="power-editor">${newHtml}</div>`
}
