import type { Meta, StoryObj } from '@storybook/react'

import { Upload } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Upload> & {
  argTypes: any
} = {
  title: 'WordPress/組件/Upload',
  component: Upload,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

    layout: 'centered',
    docs: {
      description: {
        component: `
結合 WordPress rest API 的圖片/檔案上傳組件，會將檔案上傳到媒體庫

使用 \`useUpload\` hook 來獲取組件的 props，並且可以透過 \`useUpload\` 取得已上傳的 attachment id


				`, // 可以寫 markdown
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // currency: {
    //   control: {
    //     type: 'text',
    //   },
    // },
    // symbol: {
    //   control: {
    //     type: 'boolean',
    //     defaultValue: false,
    //   },
    // },
  },
}

export default meta
type Story = StoryObj<typeof Upload>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  args: {},
}
