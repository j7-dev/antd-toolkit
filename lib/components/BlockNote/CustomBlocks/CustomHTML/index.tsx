import {
  FileBlockConfig,
  videoBlockConfig,
  defaultProps,
  insertOrUpdateBlock,
  videoParse,
} from '@blocknote/core'
import { useState } from 'react'
import { RiVideoFill } from 'react-icons/ri'

import {
  createReactBlockSpec,
  ReactCustomBlockRenderProps,
  AddFileButton,
  DefaultFilePreview,
  FigureWithCaption,
  FileAndCaptionWrapper,
  LinkWithCaption,
  ResizeHandlesWrapper,
  useResolveUrl,
} from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { ImEmbed2 } from 'react-icons/im'
import { Input } from 'antd'
import { renderHTML } from '@/utils'

export const customHTMLMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
  key: 'customHTML',
  title: '自訂 HTML', // 選單中文
  subtext: '支援 HTML、CSS、JavaScript、iframe 等...', // 說明文字
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'customHTML',
    })
  },
  aliases: [
    'html',
  ],
  group: 'Advanced',
  icon: <ImEmbed2 className="w-[1.125rem] h-[1.125rem]" />,
})

export const VideoPreview = (
  props: Omit<
    ReactCustomBlockRenderProps<FileBlockConfig, any, any>,
    'contentRef'
  >,
) => {
  const [width, setWidth] = useState<number>(
    Math.min(
      props.block.props.previewWidth!,
      props.editor.domElement.firstElementChild!.clientWidth,
    ),
  )

  const resolved = useResolveUrl(props.block.props.url!)

  if (resolved.loadingState === 'loading') {
    return null
  }

  return (
    <ResizeHandlesWrapper {...props} width={width} setWidth={setWidth}>
      <video
        className={'bn-visual-media'}
        src={resolved.downloadUrl}
        controls={true}
        contentEditable={false}
        draggable={false}
        width={width}
      />
    </ResizeHandlesWrapper>
  )
}

export const ToExternalHTML = (
  props: Omit<
    ReactCustomBlockRenderProps<typeof videoBlockConfig, any, any>,
    'contentRef'
  >,
) => {
  if (!props.block.props.url) {
    return <p>沒有 內容</p>
  }

  return <>{renderHTML(props.block.props.url)}</>
}
console.log('⭐  videoBlockConfig:', videoBlockConfig)

export const CustomHTML = createReactBlockSpec(
  {
    type: 'customHTML',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      url: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: (props) => {
      const value = props.block.props.url
      console.log('⭐  props:', props)

      // contentRef 有個屬性 name ，如果不能編輯是 ""，可以編輯是 "nodeViewContentRef"
      const editable = !(props.contentRef.name === '')

      if (!editable) {
        return <>{renderHTML(value)}</>
      }

      return (
        <div
          className={'bn-file-block-content-wrapper w-full'}
          data-editable="1"
          ref={props.contentRef}
        >
          <textarea
            className="w-full rounded-md border-2 border-solid border-gray-200 p-2"
            rows={10}
            onChange={(e) => {
              props.editor.updateBlock(props.block, {
                type: 'customHTML',
                props: { url: e.target.value },
              })
            }}
            value={value}
          />
        </div>
      )
    },

    parse: videoParse,
    toExternalHTML: (props) => {
      // 不知道為什麼沒有用
      return <p {...props}>AAA</p>
    },
  },
)
