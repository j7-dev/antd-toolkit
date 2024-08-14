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
    // alert: Alert, // TODO Adds the Alert block. 因為不能自動轉 HTML 先隱藏
    video: undefined as any, // TODO 未來再整合
    file: undefined as any,
    audio: undefined as any,
    checkListItem: undefined as any,
  },
})

// export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
//   title: 'Alert',
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: 'alert',
//     })
//   },
//   aliases: [
//     'alert',
//     'notification',
//     'emphasize',
//     'warning',
//     'error',
//     'info',
//     'success',
//   ],
//   group: 'Other',
//   icon: <RiAlertFill />,
// })

type TUseBlockNoteParams = {
  options?: BlockNoteEditorOptions<
    typeof schema.blockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema
  >
  deps?: React.DependencyList
  apiConfig: TApiConfig
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

      const newHtml = await editor.blocksToHTMLLossy(editor.document)

      setHTML(newHtml)
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
              [...menuItems],
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
              {/* <BasicTextStyleButton
                key={'codeStyleButton'}
                basicTextStyle={'code'}
              />
               */}

              {/* <TextAlignButton
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
              /> */}

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
