import {
  YooEditor,
  YooptaPlugin,
  YooptaMark,
  YooptaContentValue,
  Tools,
} from '@yoopta/editor'

export type TBlock = {
  id: string
  value: [
    {
      id: string
      type: string
      children: [
        {
          text: string
        },
      ]
      props: {
        nodeType: string
      }
    },
  ]
  type: string
  meta: {
    order: number
    depth: number
  }
}

export type YooptaEditorProps = {
  editor: YooEditor
  plugins: YooptaPlugin[]
  marks?: YooptaMark<any>[]
  value?: YooptaContentValue
  autoFocus?: boolean
  className?: string
  selectionBoxRoot?:
    | HTMLElement
    | React.MutableRefObject<HTMLElement | null>
    | false
  children?: React.ReactNode
  tools?: Partial<Tools>
  placeholder?: string
  readOnly?: boolean
  width?: number | string
}

export type EditorProps = {
  yooptaEditorProps: YooptaEditorProps
  formattedBlocks: TBlock[]
}
