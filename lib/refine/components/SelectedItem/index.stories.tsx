import type { Meta, StoryObj } from '@storybook/react'

import { SelectedItem } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof SelectedItem> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/SelectedItem',
	component: SelectedItem,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示已選擇項目的元件

通常搭配可選 Table 跨頁選取使用

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof SelectedItem>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		ids: ['1', '6', '9'],
		onClear: undefined,
		onSelected: undefined,
	},
}

export const Callbacks: Story = {
	name: '自訂 callback',
	args: {
		ids: ['1', '6', '9'],
		onClear: () => console.log('clear'),
		onSelected: () => console.log('selected'),
	},
}
