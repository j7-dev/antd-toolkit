import type { Meta, StoryObj } from '@storybook/react'

import { BreathLight } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof BreathLight> & {
  argTypes: any
} = {
  title: '常用/BreathLight',
  component: BreathLight,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

    layout: 'centered',
    docs: {
      description: {
        component: `
呼吸燈

#### 未來優化:



				`, // 可以寫 markdown
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof BreathLight>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  args: {},
}

export const Custom: Story = {
  name: '自訂顏色 & 大小',
  args: {
    color: 'LightSkyBlue ',
    size: '1.5rem',
  },
}
