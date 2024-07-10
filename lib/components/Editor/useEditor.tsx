import { useMemo, useState, useRef, useEffect } from 'react'
import { createYooptaEditor } from '@yoopta/editor'
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from '@yoopta/marks'
import { TBlock, EditorProps, YooptaEditorProps, TApiConfig } from './types'
import { getPlugins, DEFAULT } from './utils'
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list'
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar'
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool'
import { debounce } from 'lodash-es'
import { html } from '@yoopta/exports'

const defaultHeaders = new Headers()
defaultHeaders.append(
  'Authorization',
  'Basic ' + btoa(DEFAULT.USERNAME + ':' + DEFAULT.PASSWORD),
)
const defaultApiConfig = {
  apiEndpoint: DEFAULT.API,
  headers: defaultHeaders,
}

const tools = {
  // [ActionMenu] - + 跟 / 的主選單

  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },

  // [Toolbar] - 選取文字後的工具列

  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },

  // [LinkTool] - 選取文字後的工具列，上面的 Link 點了會有 popup 填寫 url 跟 title

  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
}

const marks = [
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
]

export const useEditor = (apiConfig?: TApiConfig) => {
  const selectionRef = useRef(null)
  const editor = useMemo(() => createYooptaEditor(), [])

  const [formattedBlocks, setFormattedBlocks] = useState<TBlock[]>([])

  // add debounce

  useEffect(() => {
    if (editor) {
      editor.on(
        'change',
        debounce(() => {
          const raw: {
            [key: string]: TBlock
          } = editor.getEditorValue()
          const blocks: TBlock[] = Object.values(raw)
          const htmlString = getHtmlFromBlocks()
          console.log('⭐  htmlString:', htmlString)

          // 按照畫面上的順序排序

          blocks.sort((a, b) => a?.meta?.order - b?.meta?.order)
          setFormattedBlocks(blocks)
        }, 500),
      )
    }
  }, [editor])

  const getHtmlFromBlocks = () => {
    const raw: {
      [key: string]: TBlock
    } = editor.getEditorValue()
    const htmlString = html.serialize(editor, raw)
    return htmlString
  }

  const setBlocksFromHtml = (htmlString: string) => {
    const content = html.deserialize(editor, htmlString)
    editor.setEditorValue(content)
  }

  const plugins = getPlugins(apiConfig || defaultApiConfig)

  const yooptaEditorProps: YooptaEditorProps = {
    editor,
    plugins,
    tools,
    marks,
    selectionBoxRoot: selectionRef,
    autoFocus: true,
  }

  const editorProps: EditorProps = {
    yooptaEditorProps,
    formattedBlocks,
    getHtmlFromBlocks,
    setBlocksFromHtml,
  }

  return editorProps
}
