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

const INIT: any = [
  {
    type: 'paragraph',
    content: 'Welcome to this demo!',
  },
  {
    type: 'paragraph',
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Blocks:',
        styles: { bold: true },
      },
    ],
  },
  {
    type: 'paragraph',
    content: 'Paragraph',
  },
  {
    type: 'heading',
    content: 'Heading',
  },
  {
    type: 'bulletListItem',
    content: 'Bullet List Item',
  },
  {
    type: 'numberedListItem',
    content: 'Numbered List Item',
  },
  {
    type: 'checkListItem',
    content: 'Check List Item',
  },
  {
    type: 'table',
    content: {
      type: 'tableContent',
      rows: [
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
        {
          cells: ['Table Cell', 'Table Cell', 'Table Cell'],
        },
      ],
    },
  },
  {
    type: 'file',
  },
  {
    type: 'image',
    props: {
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      caption:
        'From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
  },
  {
    type: 'video',
    props: {
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      caption:
        'From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    },
  },
  {
    type: 'audio',
    props: {
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      caption:
        'From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    },
  },
  {
    type: 'paragraph',
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Inline Content:',
        styles: { bold: true },
      },
    ],
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Styled Text',
        styles: {
          bold: true,
          italic: true,
          textColor: 'red',
          backgroundColor: 'blue',
        },
      },
      {
        type: 'text',
        text: ' ',
        styles: {},
      },
      {
        type: 'link',
        content: 'Link',
        href: 'https://www.blocknotejs.org',
      },
    ],
  },
  {
    type: 'paragraph',
  },
]

// Our schema with block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs, // Adds all default blocks.
    alert: Alert, // Adds the Alert block.
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
      initialContent: INIT,
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
      const newHtml = await editor.blocksToHTMLLossy(editor.document)
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
