import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Card> & {
	argTypes: any
} = {
	title: 'MAIN/常用/Card',
	component: Card,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
卡片元件

為什麼需要這個: 因為有頁面組件通常會搭配卡片，例如 user list ，但有時候做篩選器時，也會搭配這個 user list 但不需要顯示卡片容器

基於 Antd Card 組件的封裝，提供要不要顯示卡片容器的選項 \`showCard\`

其他 props 都跟 antd 一樣



				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		showCard: {
			control: {
				type: 'boolean',
				defaultValue: true,
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof Card>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const ShowCard: Story = {
	name: '顯示卡片',
	args: {
		showCard: true,
		title: '卡片標題',
		children: <div>卡片內容</div>,
	},
}

export const HideCard: Story = {
	name: '不顯示卡片',
	args: {
		...ShowCard.args,
		showCard: false,
		title: '卡片標題',
		children: <div>卡片內容</div>,
	},
}
