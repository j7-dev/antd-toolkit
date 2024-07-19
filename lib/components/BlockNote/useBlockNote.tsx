import { useState } from 'react'
import { TApiConfig } from './types'
import {
  useCreateBlockNote,
  BlockNoteViewProps,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
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
} from '@blocknote/core'
import { Alert } from './CustomBlocks'
import { RiAlertFill } from 'react-icons/ri'
import { uploadWP } from './utils'

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs, // Adds all default blocks.
    alert: Alert, // Adds the Alert block.
    video: undefined as any, // TODO 未來再整合
    file: undefined as any,
    audio: undefined as any,
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
      const newHtml = await editor.blocksToFullHTML(editor.document)
      setHTML(newHtml)
    },
    theme: 'light',
    formattingToolbar: true,
    linkToolbar: true,
    sideMenu: true,
    slashMenu: false,
    emojiPicker: true,
    filePanel: true,
    tableHandles: true,
    children: (
      <>
        <SuggestionMenuController
          triggerCharacter={'/'}
          getItems={async (query) =>
            filterSuggestionItems(
              // eslint-disable-next-line lines-around-comment
              // Gets all default slash menu items and `insertAlert` item.
              [...getDefaultReactSlashMenuItems(editor), insertAlert(editor)],
              query,
            )
          }
        />
        {/* <GridSuggestionMenuController
          triggerCharacter={':'}

          // Changes the Emoji Picker to only have 5 columns.
          columns={5}
          minQueryLength={2}
        /> */}
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
