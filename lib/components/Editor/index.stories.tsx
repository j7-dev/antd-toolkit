import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Editor, useEditor } from './index'
import { Button } from 'antd'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Editor> & {
  argTypes: any
} = {
  title: '編輯器/Editor',
  component: Editor,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

    layout: 'centered',
    docs: {
      description: {
        component: `
使用 \`useEditor\` hook 取得編輯器的 props，並且可以取得編輯器的數據。

### useEditor

\`formattedBlocks\` 是排序後的 Blocks，可以直接拿來重組使用。

\`yooptaEditorProps\` 是編輯器的 props，可以直接傳入 Editor 元件。

### 使用方式

\`\`\`tsx
const { yooptaEditorProps, formattedBlocks } = useEditor()

<Editor {...yooptaEditorProps} />
\`\`\`

\`yooptaEditorProps\`  身上可以拿到 \`editor\` 實例，可以呼叫許多方法

例如

\`\`\`tsx
editor.on('change', handleChange)
editor.getEditorValue()
editor.setEditorValue(data)
\`\`\`

等等方法...

詳情可以看 [yooptaEditorProps](https://github.com/Darginec05/Yoopta-Editor) 或 \`YooEditor\` 的 type 定義

---

TODO

[ ] 整合上傳圖片影片

				`, // 可以寫 markdown
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

const EditorWithHooks = () => {
  const { yooptaEditorProps, formattedBlocks } = useEditor()

  return (
    <>
      <Editor {...yooptaEditorProps} />

      <hr className="bg-gray-200 w-full h-1 mb-6" />
      <p>onChange 時顯示數據 Get Blocks，debounce 1.5秒</p>
      {!!formattedBlocks.length && (
        <pre className="mt-8 prismjs bg-gray-100 p-4 rounded-md">
          {JSON.stringify(formattedBlocks, null, 2)}
        </pre>
      )}
    </>
  )
}

export default meta
type Story = StoryObj<typeof Editor>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  args: {},
  render: () => <EditorWithHooks />,
}
