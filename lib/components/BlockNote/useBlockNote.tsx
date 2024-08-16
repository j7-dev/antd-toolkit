import { useState } from 'react'
import { TApiConfig } from './types'
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
} from '@blocknote/react'
import {
  DefaultStyleSchema,
  DefaultInlineContentSchema,
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  BlockNoteEditorOptions,
  createExternalHTMLExporter,
  PartialBlock,
  blockToNode,
  BlockSchemaFromSpecs,
} from '@blocknote/core'
import { Alert } from './CustomBlocks'
import { RiAlertFill } from 'react-icons/ri'
import { uploadWP } from './utils'
import { Fragment } from 'prosemirror-model'

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs, // Adds all default blocks.
    alert: Alert, // TODO Adds the Alert block. 因為不能自動轉 HTML 先隱藏
    // video: undefined as any, // TODO 未來再整合
    checkListItem: undefined as any,
  },
})

export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Alert',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'alert',
    })
  },
  aliases: [
    'alert',
    'notification',
    'emphasize',
    'warning',
    'error',
    'info',
    'success',
  ],
  group: 'Other',
  icon: <RiAlertFill />,
})

type TUseBlockNoteParams = {
  options?: BlockNoteEditorOptions<
    typeof schema.blockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema
  >
  deps?: React.DependencyList
  apiConfig: TApiConfig
}

function convertDivToATag(divElement: HTMLDivElement) {
  // 創建新的 <a> 元素
  const aTag = document.createElement('a')

  // 複製 DIV 的子元素到 <a> 標籤
  while (divElement.firstChild) {
    aTag.appendChild(divElement.firstChild)
  }

  // 複製 DIV 的屬性到 <a> 標籤
  for (let i = 0; i < divElement.attributes.length; i++) {
    const attr = divElement.attributes[i]
    aTag.setAttribute(attr.name, attr.value)
  }

  // 設置 href 屬性（如果需要）
  aTag.setAttribute('href', '#') // 或者設置為其他適當的 URL

  // 用新創建的 <a> 標籤替換原始的 DIV
  // @ts-ignore
  divElement.parentNode.replaceChild(aTag, divElement)

  return aTag // 返回新創建的 <a> 元素
}

export const useBlockNote = (params: TUseBlockNoteParams) => {
  const { options, deps = [], apiConfig } = params || {}

  /** @see https://www.blocknotejs.org/docs/editor-basics/setup */
  const editor = useCreateBlockNote(
    {
      schema,
      uploadFile: uploadWP(apiConfig),
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
    onChange: async () => {
      // Saves the document JSON to state.
      setBlocks(editor.document as Block[])

      /* TODO 未來有機會再來處理 parser
			 const pmSchema = editor.pmSchema
      const exporter = createExternalHTMLExporter(pmSchema, editor)
      const exportBlocks = (
        blocksValue: PartialBlock<
          typeof schema.blockSchema,
          DefaultInlineContentSchema,
          DefaultStyleSchema
        >[],
        optionsValue: object = {},
      ) => {
        const nodes = blocksValue.map((block) =>
          blockToNode(block, pmSchema, editor.schema.styleSchema),
        )
        console.log('⭐  nodes:', nodes)
        const blockGroup = pmSchema.nodes['blockGroup'].create(null, nodes)
        console.log('⭐  blockGroup:', blockGroup)
        console.log('⭐  Fragment.from(blockGroup):', Fragment.from(blockGroup))

        const fragment = exporter.exportProseMirrorFragment(
          Fragment.from(blockGroup),
          optionsValue,
        )
        console.log('⭐  fragment:', fragment)

        return fragment
      }
      const newHtml = await exportBlocks(editor.document, {})
      console.log('⭐  newHtml:', newHtml)

			*/

      // const newHtml = await editor.blocksToHTMLLossy(editor.document)

      const newHtml = await editor.blocksToFullHTML(editor.document)
      const parser = new DOMParser()
      const doc = parser.parseFromString(newHtml, 'text/html')

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
          }
        })

      // 將音檔的 data-url 轉換成 下載連結
      doc.body
        .querySelectorAll('[data-content-type="audio"]')
        .forEach((node) => {
          const src = node.getAttribute('data-url')
          const audioNode = node.querySelector('.bn-audio')

          if (audioNode) {
            audioNode.setAttribute('src', src || '')
          }
        })

      setHTML(doc.body.innerHTML)
    },
    theme: 'light',
    formattingToolbar: false, // 自訂 toolbar
    linkToolbar: true,
    sideMenu: true,
    slashMenu: false, // 自訂選單
    emojiPicker: false, // 關閉 Emoji
    filePanel: true,
    tableHandles: true,
    children: (
      <>
        <SuggestionMenuController
          triggerCharacter={'/'}
          getItems={async (query) => {
            const menuItems = getDefaultReactSlashMenuItems(editor).filter(
              (menuItem) => menuItem?.key !== 'emoji', // 隱藏 Emoji
            )
            return filterSuggestionItems(
              // eslint-disable-next-line lines-around-comment
              // Gets all default slash menu items and `insertAlert` item.
              [...menuItems, insertAlert(editor)],
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
