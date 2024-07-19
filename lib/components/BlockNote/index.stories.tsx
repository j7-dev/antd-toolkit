import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNote, useBlockNote } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof BlockNote> & {
  argTypes: any
} = {
  title: '編輯器/BlockNote',
  component: BlockNote,
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

const DEFAULT = {
  API: 'http://ltest.test:8080/wp-json/power-course/upload',
  USERNAME: 'j7',
  PASSWORD: 'gRJ0 14kC n9ye kQft k2Iz 5BAP',
}

const BlockNoteWithHooks = () => {
  const { blockNoteViewProps, blocks, html } = useBlockNote({
    apiConfig: {
      apiEndpoint: DEFAULT.API,
      headers: new Headers({
        Authorization:
          'Basic ' + btoa(DEFAULT.USERNAME + ':' + DEFAULT.PASSWORD),
      }),
    },
  })

  return (
    <>
      <BlockNote {...blockNoteViewProps} />

      <hr className="bg-gray-200 w-full h-[1px] mb-6" />
      <p>onChange 時顯示數據 Get Blocks，debounce 0.5秒</p>
      <pre className="mt-8 prismjs bg-gray-100 p-4 rounded-md whitespace-normal">
        {html}
      </pre>
      <pre className="mt-8 prismjs bg-gray-100 p-4 rounded-md">
        {JSON.stringify(blocks, null, 2)}
      </pre>
    </>
  )
}

export default meta
type Story = StoryObj<typeof BlockNote>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  args: {},
  render: () => <BlockNoteWithHooks />,
}
