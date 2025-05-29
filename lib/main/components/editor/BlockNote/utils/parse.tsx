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
		// 如果沒有內容就 setHTML 為空字串
		if (editor?.document?.length === 1) {
			if (
				'paragraph' === editor?.document[0]?.type &&
				!(editor?.document[0]?.content as Array<any>)?.length
			) {
				console.error('⭐ 沒有內容')
				return ''
			}
		}

		const newHtml = await editor?.blocksToHTMLLossy(editor?.document || [])
		if (escape) {
			return escapeHtml(newHtml)
		}
		return newHtml
	} catch (error) {
		console.error('BlockNote getHtml error:', error)
		return ''
	}
}
