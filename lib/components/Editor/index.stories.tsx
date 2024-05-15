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
      <p>onChange 時顯示數據 Get Blocks</p>
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
