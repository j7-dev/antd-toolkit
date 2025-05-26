import { useState } from 'react'
import { TUseBlockNoteParams } from './types'
import {
	useCreateBlockNote,
	BlockNoteViewProps,
	SuggestionMenuController,
	getDefaultReactSlashMenuItems,
	BasicTextStyleButton,
	BlockTypeSelect,
	ColorStyleButton,
	CreateLinkButton,
	FileCaptionButton,
	FileReplaceButton,
	FormattingToolbar,
	FormattingToolbarController,
	NestBlockButton,
	TextAlignButton,
	UnnestBlockButton,
	DefaultReactSuggestionItem,
} from '@blocknote/react'
import {
	DefaultStyleSchema,
	DefaultInlineContentSchema,
	Block,
	BlockNoteSchema,
	defaultBlockSpecs,
	filterSuggestionItems,
} from '@blocknote/core'
import {
	Alert,
	alertMenuItem,
	CustomHTML,
	customHTMLMenuItem,
	BunnyVideo,
	bunnyVideoMenuItem,
	MediaLibrary,
	mediaLibraryMenuItem,
} from './CustomBlocks'
import { uploadWP, getIconHTML, convertDivToATag, hasScriptTag } from './utils'
import { getFileExtension } from '@/main/utils'

// undefined = 禁用選單
export const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs, // Adds all default blocks.
		alert: Alert,
		customHTML: CustomHTML,
		bunnyVideo: BunnyVideo,
		// numberedListItem: undefined as any, // undefined = 禁用選單
		checkListItem: undefined as any, // 樣式有問題，禁用
		file: undefined as any, // 用媒體庫就好，禁用
		video: undefined as any, // 用媒體庫就好，禁用
		audio: undefined as any, // 用媒體庫就好，禁用
		image: undefined as any, // 用媒體庫就好，禁用
		mediaLibrary: MediaLibrary,
	},
})

/* 要隱藏的選單 */
const HIDDEN_MENU_ITEMS: string[] = []

/* 自訂選單順序 */
const CUSTOM_MENU_ORDER = [
	'heading',
	'heading_2',
	'heading_3',
	'paragraph',
	'quote',
	'numbered_list',
	'bullet_list',
	'code_block',
	'mediaLibrary',
	'file',
	'image',
	'alert',
	'table',
	'customHTML',
	'bunnyVideo',
	'bunnyAudio',
]

export const useBlockNote = (params?: TUseBlockNoteParams) => {
	const options = params?.options
	const deps = params?.deps || []

	/** @see https://www.blocknotejs.org/docs/editor-basics/setup */
	const editor = useCreateBlockNote(
		{
			schema,
			...options,
		},
		deps,
	)

	const [blocks, setBlocks] = useState<Block[]>([])
	const [html, setHTML] = useState<string>('')

	const blockNoteViewProps: BlockNoteViewProps<
		typeof schema.blockSchema,
		DefaultInlineContentSchema,
		DefaultStyleSchema
	> = {
		editor,
		onChange: async (theEditor) => {
			try {
				// Saves the document JSON to state.
				setBlocks(theEditor?.document as Block[])

				// 如果沒有內容就 setHTML 為空字串
				if (theEditor?.document?.length === 1) {
					if (
						'paragraph' === theEditor?.document[0]?.type &&
						!(theEditor?.document[0]?.content as Array<any>)?.length
					) {
						console.error('⭐ 沒有內容')
						setHTML('')
						return
					}
				}

				const newHtml = await theEditor?.blocksToHTMLLossy(
					theEditor?.document || [],
				)
				setHTML(newHtml)
			} catch (error) {
				console.error('BlockNote onChange error:', error)
			}
			return
			//另一種輸出方式
			/*
			// const newHtml = await editor.blocksToFullHTML(editor.document)
			const parser = new DOMParser()
			const doc = parser.parseFromString('', 'text/html')

			// 將圖片的 data-url 轉換成 src
			doc.body
				.querySelectorAll('[data-content-type="image"]')
				.forEach((node) => {
					const src = node.getAttribute('data-url')
					const imageNode = node.querySelector('img')
					if (imageNode) {
						imageNode.setAttribute('src', src || '')
					}
				})

			// 將檔案的 data-url 轉換成 下載連結
			doc.body
				.querySelectorAll('[data-content-type="file"]')
				.forEach((node) => {
					const link = node.getAttribute('data-url')
					const previewNode = node.querySelector(
						'.bn-file-default-preview',
					) as HTMLDivElement

					if (previewNode) {
						const previewANode = convertDivToATag(previewNode)
						previewANode.setAttribute('href', link || '')
						previewANode.setAttribute('target', '_blank')

						const iconNode = previewANode.querySelector(
							'.bn-file-default-preview-icon',
						)

						if (iconNode) {
							const ext = getFileExtension(link || '')
							iconNode.innerHTML = getIconHTML(ext)
						}
					}
				})

			// 將自訂 HTML
			doc.body
				.querySelectorAll('[data-content-type="customHTML"]')
				.forEach((node) => {
					const html = node.getAttribute('data-html')
					const hasScript = hasScriptTag(html || '')

					if (!hasScript) {
						node.innerHTML = html || ''
					} else {
						const tempDiv = document.createElement('div')
						tempDiv.innerHTML = html || ''

						const scripts = tempDiv.getElementsByTagName('script')
						const scriptContents = Array.from(scripts).map(
							(script) => script.textContent || '',
						)

						// 移除所有 script 標籤
						Array.from(scripts).forEach((script) => script.remove())

						// 將剩餘的 HTML 內容放回
						node.innerHTML = tempDiv.innerHTML

						// 執行所有 script
						scriptContents.forEach((content) => {
							const scriptElement = document.createElement('script')
							scriptElement.textContent = content
							document.body.appendChild(scriptElement)
							scriptElement.remove()
						})
					}
				})

			setHTML(doc.body.innerHTML)
			*/
		},
		theme: 'light',
		formattingToolbar: false, // 自訂 toolbar
		linkToolbar: true,
		sideMenu: true,
		slashMenu: false, // 自訂選單
		emojiPicker: true, // 啟用 Emoji
		filePanel: true,
		tableHandles: true,
		children: (
			<>
				<SuggestionMenuController
					triggerCharacter={'/'}
					getItems={async (query) => {
						const menuItems = (
							getDefaultReactSlashMenuItems(
								editor,
							) as (DefaultReactSuggestionItem & { key: string })[]
						).filter(
							({ key }) => !HIDDEN_MENU_ITEMS.includes(key), // 隱藏指定選單
						)

						const customMenuItems = [
							...menuItems,
							alertMenuItem(editor),
							customHTMLMenuItem(editor),
							bunnyVideoMenuItem(editor),
							mediaLibraryMenuItem(editor),
						]

						const sortedMenuItems = customMenuItems.sort((a, b) => {
							// 更簡潔的寫法
							const getIndex = (key: string) => {
								const index = CUSTOM_MENU_ORDER.indexOf(key)
								return index === -1 ? Infinity : index
							}

							const result = getIndex(a.key) - getIndex(b.key)

							// 如果兩個都不在優先清單中 (Infinity - Infinity = NaN)
							return isNaN(result) ? a.key.localeCompare(b.key) : result
						})

						return filterSuggestionItems(
							// eslint-disable-next-line lines-around-comment
							// Gets all default slash menu items and `insertAlert` item.
							sortedMenuItems,
							query,
						)
					}}
				/>
				<FormattingToolbarController
					formattingToolbar={() => (
						<FormattingToolbar>
							<BlockTypeSelect key={'blockTypeSelect'} />

							<FileCaptionButton key={'fileCaptionButton'} />
							<FileReplaceButton key={'replaceFileButton'} />

							<BasicTextStyleButton
								basicTextStyle={'bold'}
								key={'boldStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'italic'}
								key={'italicStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'underline'}
								key={'underlineStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'strike'}
								key={'strikeStyleButton'}
							/>
							{/* Extra button to toggle code styles */}
							<BasicTextStyleButton
								key={'codeStyleButton'}
								basicTextStyle={'code'}
							/>

							<TextAlignButton
								textAlignment={'left'}
								key={'textAlignLeftButton'}
							/>
							<TextAlignButton
								textAlignment={'center'}
								key={'textAlignCenterButton'}
							/>
							<TextAlignButton
								textAlignment={'right'}
								key={'textAlignRightButton'}
							/>

							<ColorStyleButton key={'colorStyleButton'} />

							<NestBlockButton key={'nestBlockButton'} />
							<UnnestBlockButton key={'unnestBlockButton'} />

							<CreateLinkButton key={'createLinkButton'} />
						</FormattingToolbar>
					)}
				/>
			</>
		),
	}

	return {
		blockNoteViewProps,
		blocks,
		setBlocks,
		html,
		setHTML,
	}
}
