import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from 'antd'

import { CopyText } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof CopyText> & {
  argTypes: any
} = {
  title: '常用/CopyText',
  component: CopyText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

    layout: 'centered',
    docs: {
      description: {
        component: `

				預設外觀是一個複製的 icon，可以透過 children 傳入其他元件，例如 Button

				`, // 可以寫 markdown
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CopyText>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  args: {
    text: 'Hello Antd Toolkit',
  },
}

export const CustomEle: Story = {
  name: '自訂顯示',
  args: {
    text: 'Hello Antd Toolkit',
    children: <Button type="primary">複製</Button>,
  },
}
