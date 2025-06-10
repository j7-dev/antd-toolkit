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

export async function getEditorHtml(editor: BlockNoteEditor, escape = false) {
	try {
		const blocks = editor?.document || []

		if (!blocks) return ''

		// 如果沒有內容就 setHTML 為空字串
		if (blocks?.length === 1) {
			const firstBlock = blocks[0]
			if (
				'paragraph' === firstBlock?.type &&
				!(firstBlock?.content as Array<any>)?.length
			) {
				console.error('⭐ 沒有內容')
				return ''
			}
		}

		const html = await editor?.blocksToHTMLLossy(blocks || [])

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

		if (escape) {
			return escapeHtml(newHtml)
		}
		return newHtml
	} catch (error) {
		console.error('BlockNote getHtml error:', error)
		return ''
	}
}
