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
	getNearestBlockPos,
	BlockSchema,
	InlineContentSchema,
	StyleSchema,
	BlockNoteEditor,
	PartialBlock,
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
import { debounce } from 'lodash-es'
import { codeBlock } from '@blocknote/code-block'
import { useCustomMutation, useApiUrl } from '@refinedev/core'
import { TImage } from '@/wp'
import { getFileType } from './CustomBlocks/MediaLibrary/Button'

type TUploaded = TImage & {
	name: string
	size: number
	type: string
	width?: number
	height?: number
}

// undefined = 禁用選單
export const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs, // Adds all default blocks.
		alert: Alert,
		customHTML: CustomHTML,
		bunnyVideo: BunnyVideo,
		// numberedListItem: undefined as any, // undefined = 禁用選單
		checkListItem: undefined as any, // 樣式有問題，禁用
		// file: undefined as any, // 用媒體庫就好，禁用
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
	const { mutate: uploadFile, mutateAsync: uploadFileAsync } =
		useCustomMutation()
	const apiUrl = useApiUrl()

	/** @see https://www.blocknotejs.org/docs/editor-basics/setup */
	const editor = useCreateBlockNote(
		{
			codeBlock,
			schema,
			pasteHandler: ({ event, editor, defaultPasteHandler }) => {
				try {
					if ((event?.clipboardData?.files?.length || 0) > 0) {
						const file = event?.clipboardData?.files?.[0]

						// 自定義檔案上傳邏輯

						const insertedBlockId = getInsertedBlockId(
							event as ClipboardEvent,
							editor as any,
						)
						if (!insertedBlockId) {
							throw new Error('插入區塊失敗，找不到 insertedBlockId')
						}

						uploadFile(
							{
								url: `${apiUrl}/upload`,
								method: 'post',
								values: {
									files: [file],
								},
								config: {
									headers: {
										'Content-Type': 'multipart/form-data',
									},
								},
							},
							{
								onSuccess: (data) => {
									const file = data?.data?.data?.[0] as TUploaded
									if (!file) {
										throw new Error('上傳成功但找不到檔案!?')
									}

									const fileType = getFileType(file?.url)
									editor.updateBlock(insertedBlockId as string, {
										type: 'mediaLibrary',
										props: {
											widthValue: fileType === 'image' ? file.width : undefined,
											widthUnit: fileType === 'image' ? 'px' : undefined,
											align: 'start',
											url: file.url,
											alt: file.name,
											title: file.name,
											fileType,
										},
									})
								},
								onError: (error) => {
									editor.updateBlock(insertedBlockId as string, {
										type: 'paragraph',
										props: {
											textColor: 'default',
											textAlignment: 'left',
										},
										content: [
											{
												type: 'text',
												text: '',
												styles: {},
											},
										],
									})
									console.log('❌ 上傳失敗', insertedBlockId, error)
								},
							},
						)

						return true
					}

					return defaultPasteHandler()
				} catch (error) {
					console.error('❌ 貼上操作失敗', error)
					return defaultPasteHandler()
				}
			},
			uploadFile: async (file: File, blockId?: string): Promise<any> => {
				// 處理 Drag & Drop 上傳
				try {
					const result = await uploadFileAsync({
						url: `${apiUrl}/upload`,
						method: 'post',
						values: {
							files: [file],
						},
						config: {
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						},
					})
					const uploadedFile = result?.data?.data?.[0] as TUploaded
					const fileType = getFileType(uploadedFile?.url)
					return {
						type: 'mediaLibrary',
						props: {
							widthValue: fileType === 'image' ? uploadedFile.width : undefined,
							widthUnit: fileType === 'image' ? 'px' : undefined,
							align: 'start',
							url: uploadedFile.url,
							alt: uploadedFile.name,
							title: uploadedFile.name,
							fileType,
						},
					}
				} catch (error) {
					editor.updateBlock(blockId as string, {
						type: 'paragraph',
						props: {
							textColor: 'default',
							textAlignment: 'left',
						},
						content: [
							{
								type: 'text',
								text: '',
								styles: {},
							},
						],
					})
					console.log('❌ 上傳失敗', blockId, error)
				}
			},
			...options,
		},
		deps,
	)

	const [blocks, setBlocks] = useState<Block[]>([])

	const blockNoteViewProps: BlockNoteViewProps<
		typeof schema.blockSchema,
		DefaultInlineContentSchema,
		DefaultStyleSchema
	> = {
		editor,
		onChange: debounce(async (theEditor) => {
			setBlocks(theEditor?.document as Block[])
		}, 700),
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

						const sortedMenuItems = customMenuItems
							.sort((a, b) => {
								// 更簡潔的寫法
								const getIndex = (key: string) => {
									const index = CUSTOM_MENU_ORDER.indexOf(key)
									return index === -1 ? Infinity : index
								}

								const result = getIndex(a.key) - getIndex(b.key)

								// 如果兩個都不在優先清單中 (Infinity - Infinity = NaN)
								return isNaN(result) ? a.key.localeCompare(b.key) : result
							})
							.filter((item) => item.key !== 'file')

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
	}
}

/**
 * 執行插入或更新，並返回插入的區塊 ID
 *
 * 處理貼上或拖放事件時插入區塊的邏輯,並返回插入區塊的 ID
 *
 * @param {ClipboardEvent} event - 剪貼簿事件對象
 * @param {BlockNoteEditor} editor - BlockNote 編輯器實例
 * @returns {string|undefined} 插入區塊的 ID,如果插入失敗則返回 undefined
 */
function getInsertedBlockId(
	event: ClipboardEvent,
	editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>,
) {
	const newBlock = {
		type: 'paragraph',
		content: [
			{
				type: 'text',
				text: '上傳中...',
				styles: {},
			},
		],
		props: {
			textAlignment: 'center',
			textColor: 'orange',
		},
	} as any

	let insertedBlockId: string | undefined = undefined

	if (event.type === 'paste') {
		const currentBlock = editor.getTextCursorPosition().block
		insertedBlockId = insertOrUpdateBlock(editor, currentBlock, newBlock as any)
	} else if (event.type === 'drop') {
		const coords = {
			left: (event as unknown as DragEvent).clientX,
			top: (event as unknown as DragEvent).clientY,
		}

		const pos = editor.prosemirrorView?.posAtCoords(coords)
		if (!pos) {
			return
		}

		insertedBlockId = editor.transact((tr) => {
			const posInfo = getNearestBlockPos(tr.doc, pos.pos)
			return insertOrUpdateBlock(
				editor,
				editor.getBlock(posInfo.node.attrs.id)!,
				newBlock as any,
			)
		})

		return insertedBlockId
	} else {
		return
	}

	return insertedBlockId
}

/**
 * 插入或更新區塊
 *
 * 根據參考區塊插入新區塊,或更新現有區塊
 *
 * @template BSchema - 區塊結構類型
 * @template I - 內聯內容結構類型
 * @template S - 樣式結構類型
 * @param {BlockNoteEditor<BSchema, I, S>} editor - BlockNote 編輯器實例
 * @param {Block<BSchema, I, S>} referenceBlock - 參考區塊
 * @param {PartialBlock<BSchema, I, S>} newBlock - 要插入的新區塊
 * @returns {string|undefined} 插入或更新後區塊的 ID
 */
function insertOrUpdateBlock<
	BSchema extends BlockSchema,
	I extends InlineContentSchema,
	S extends StyleSchema,
>(
	editor: BlockNoteEditor<BSchema, I, S>,
	referenceBlock: Block<BSchema, I, S>,
	newBlock: PartialBlock<BSchema, I, S>,
) {
	let insertedBlockId: string | undefined

	if (
		Array.isArray(referenceBlock.content) &&
		referenceBlock.content.length === 0
	) {
		insertedBlockId = editor.updateBlock(referenceBlock, newBlock).id
	} else {
		insertedBlockId = editor.insertBlocks(
			[newBlock],
			referenceBlock,
			'after',
		)[0].id
	}

	return insertedBlockId
}
