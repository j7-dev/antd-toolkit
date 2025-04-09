import type { Meta, StoryObj } from '@storybook/react'

import { ActionArea } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ActionArea> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/ActionArea',
	component: ActionArea,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
固定在頁面底部的操作區域元件

通常搭配可選 Table 裡面放批量操作使用

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof ActionArea>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {},
}
