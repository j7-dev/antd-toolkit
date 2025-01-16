import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SelectedRecord } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof SelectedRecord> & {
	argTypes: any
} = {
	title: '常用/SelectedRecord',
	component: SelectedRecord,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
僅為外觀組件

沒有選擇任何用戶的話預設會隱藏且佔位 h-8 的高度

\`onClear\` 以及 \`onSelected\` 需要自己實現

通常是使用跨頁選取時會使用

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof SelectedRecord>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		ids: [
			'1',
			'2',
			'3',
			'4',
			'5',
		],
		resourceLabel: '用戶',
	},
}
