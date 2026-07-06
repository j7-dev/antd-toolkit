/**
 * Legacy HTML 預轉換與內容遺失偵測
 *
 * Power 編輯器（BlockNote）移除了預設的 image/video/audio/file blocks，改用自家
 * mediaLibrary / customHTML block。因此傳統編輯器或頁面編輯器產生的「裸 <img>、
 * <iframe>」等元素在 tryParseHTMLToBlocks 時會直接被丟棄，導致圖文商品描述打開全空。
 *
 * 這裡的 preTransformLegacyHtml 在 parse 之前，先把這些裸元素改寫成 mediaLibrary /
 * customHTML block 的 parse() 認得的 DOM 結構，讓內容得以保留；countLossySignals /
 * detectContentLoss 則用來偵測「解析前後」的內容量落差，供 UI 提出警告。
 *
 * 本檔刻意只依賴瀏覽器 DOMParser（純函式、無 BlockNote 依賴），方便單元測試。
 */

/** 被視為「媒體 / 嵌入」的 custom block 型別，供內容量比對用 */
const MEDIA_BLOCK_TYPES = ['mediaLibrary', 'customHTML', 'bunnyVideo']

/** 不被 Power 編輯器原生支援、需包成 customHTML 保留的嵌入類元素 */
const EMBED_SELECTOR = 'iframe, video, audio, embed, object, script, style'

/** 用於偵測遺失的「媒體」元素（純文字損失另計） */
const MEDIA_SELECTOR = 'img, iframe, video, audio'

/**
 * 元素是否已位於某個 block 容器內
 *
 * 兩種情況要略過（代表它已經是編輯器輸出、不是傳統編輯器的裸元素）：
 * 1. 祖先帶有 data-block-key（本專案 custom block 的輸出）
 * 2. 祖先的 class 以 bn- 開頭（BlockNote 舊版輸出，見 parse.tsx isLegacy）
 */
const isInsideBlock = (element: Element): boolean =>
	!!element.closest('[data-block-key], [class^="bn-"]')

/**
 * 依 <img> 屬性建立 mediaLibrary block 的 parse() 認得的 <div>
 *
 * @see CustomBlocks/MediaLibrary/index.tsx 的 parse()
 */
const buildMediaLibraryDiv = (
	doc: Document,
	img: HTMLImageElement,
): HTMLDivElement => {
	const div = doc.createElement('div')
	div.setAttribute('data-block-key', 'mediaLibrary')
	div.setAttribute('data-url', img.getAttribute('src') || '')
	div.setAttribute('data-file-type', 'image')
	div.setAttribute('data-alt', img.getAttribute('alt') || '')
	div.setAttribute('data-title', img.getAttribute('title') || '')

	// 只有 img 帶明確 width attribute 時才指定寬度，否則交給 parse 預設值
	const width = img.getAttribute('width')
	if (width) {
		div.setAttribute('data-width-value', width)
		div.setAttribute('data-width-unit', 'px')
	}

	return div
}

/**
 * 把傳統／頁面編輯器的裸 <img>、嵌入元素改寫成 Power 編輯器 custom block 認得的結構
 *
 * - 裸 <img> → mediaLibrary block 結構；若父層是 <a>（電商圖片連結常見）則連同連結
 *   資訊改寫並替換整個 <a>。
 * - 裸 iframe/video/audio/embed/object/script/style → customHTML block 結構
 *   （包成 `<div data-block-key="customHTML"><div>{原始 outerHTML}</div></div>`，
 *   customHTML 的 parse 會取 `:scope > div` 的 innerHTML）。
 * - 已在 [data-block-key] / bn- 容器內的元素不重複轉換。
 * - 輸入為空字串或沒有可轉換元素時，原樣回傳、行為不變。
 */
export function preTransformLegacyHtml(html: string): string {
	if (!html || !html.trim()) return html

	const doc = new DOMParser().parseFromString(html, 'text/html')

	const bareImages = Array.from(doc.body.querySelectorAll('img')).filter(
		(img) => !isInsideBlock(img),
	)
	const bareEmbeds = Array.from(
		doc.body.querySelectorAll(EMBED_SELECTOR),
	).filter((el) => !isInsideBlock(el))

	// 沒有任何需要轉換的元素 → 原樣回傳，避免不必要的 DOM 正規化
	if (bareImages.length === 0 && bareEmbeds.length === 0) {
		return html
	}

	bareImages.forEach((img) => {
		if (!img.isConnected) return
		const div = buildMediaLibraryDiv(doc, img)
		const anchor = img.parentElement

		// 圖片被 <a> 包住 → 保留連結資訊並替換整個 <a>
		if (anchor && 'A' === anchor.tagName) {
			div.setAttribute('data-link', anchor.getAttribute('href') || '')
			div.setAttribute('data-target', anchor.getAttribute('target') || '_self')
			anchor.replaceWith(div)
		} else {
			img.replaceWith(div)
		}
	})

	bareEmbeds.forEach((el) => {
		if (!el.isConnected) return
		const wrapper = doc.createElement('div')
		wrapper.setAttribute('data-block-key', 'customHTML')
		const inner = doc.createElement('div')
		// customHTML 的 parse 會取這層 div 的 innerHTML 當作原始 HTML 還原
		inner.innerHTML = el.outerHTML
		wrapper.appendChild(inner)
		el.replaceWith(wrapper)
	})

	return doc.body.innerHTML
}

/**
 * 統計一段 HTML 的「純文字長度」與「媒體元素數」
 *
 * 供 detectContentLoss 與解析後的 block 統計比對，判斷內容是否在解析過程中遺失。
 */
export function countLossySignals(html: string): {
	textLength: number
	mediaCount: number
} {
	const doc = new DOMParser().parseFromString(html || '', 'text/html')
	const textLength = (doc.body.textContent || '').trim().length
	const mediaCount = doc.body.querySelectorAll(MEDIA_SELECTOR).length
	return { textLength, mediaCount }
}

/** 解析後 blocks 的最小結構（避免依賴 BlockNote 型別，維持純函式可測性） */
type TSignalBlock = {
	type?: string
	content?: unknown
	children?: unknown
}

/**
 * 統計解析後 blocks 的「inline 文字總長」與「媒體 block 數」
 *
 * 以泛用遞迴走訪 content / children，累加任何字串型別的 text 欄位長度，
 * 並計數 mediaLibrary / customHTML / bunnyVideo 這幾種媒體 block。
 */
export function countBlockSignals(blocks: unknown): {
	textLength: number
	mediaCount: number
} {
	let textLength = 0
	let mediaCount = 0

	const walkInline = (content: unknown): void => {
		if (!content) return
		if (Array.isArray(content)) {
			content.forEach(walkInline)
			return
		}
		if ('object' === typeof content) {
			const node = content as Record<string, unknown>
			if ('string' === typeof node.text) {
				textLength += node.text.length
			}
			// link 等 inline 有巢狀 content；table content 為 { rows: [{ cells: [...] }] }
			if (node.content) walkInline(node.content)
			if (node.rows) walkInline(node.rows)
			if (node.cells) walkInline(node.cells)
		}
	}

	const walkBlocks = (list: unknown): void => {
		if (!Array.isArray(list)) return
		list.forEach((block: TSignalBlock) => {
			if (block?.type && MEDIA_BLOCK_TYPES.includes(block.type)) {
				mediaCount += 1
			}
			walkInline(block?.content)
			walkBlocks(block?.children)
		})
	}

	walkBlocks(blocks)
	return { textLength, mediaCount }
}

/**
 * 偵測原始 HTML 在解析為 blocks 後是否可能發生內容遺失
 *
 * 判準（任一成立即視為有遺失）：
 * - 解析後媒體 block 數比原始媒體元素數少（有元素被丟棄）
 * - 純文字長度損失超過 20%
 *
 * 原始內容本身沒有文字也沒有媒體時，視為無可損失、回傳 false。
 */
export function detectContentLoss(
	originalHtml: string,
	blocks: unknown,
): boolean {
	const original = countLossySignals(originalHtml)
	const parsed = countBlockSignals(blocks)

	if (0 === original.textLength && 0 === original.mediaCount) {
		return false
	}

	if (parsed.mediaCount < original.mediaCount) {
		return true
	}

	if (original.textLength > 0) {
		const lost = original.textLength - parsed.textLength
		if (lost / original.textLength > 0.2) {
			return true
		}
	}

	return false
}
