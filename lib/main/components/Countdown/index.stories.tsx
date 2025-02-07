import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Countdown } from './index'
import dayjs from 'dayjs'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Countdown> & {
	argTypes: any
} = {
	title: 'MAIN/常用/Countdown',
	component: Countdown,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `

倒數計時組件

#### 未來優化:

🔲 不同 style 選擇

🔲 可以用 emotion 暴露一些 style 變數出來

				`, // 可以寫 markdown
			},
		},
	},

	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs

	tags: ['autodocs'],

	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes

	argTypes: {
		width: { control: { type: 'range', min: 400, max: 1200, step: 10 } },
		title: {
			control: {
				type: 'text',
			},
		},
		date: {
			description: '毫秒數字，共 13 位',
		},
	},
}

export default meta
type Story = StoryObj<typeof Countdown>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const NotExpired: Story = {
	name: '未到期',
	args: {
		date: dayjs().endOf('day').valueOf(),
		title: (
			<p className="at-text-xl at-text-center at-font-bold">
				距離晚上 12 點還有
			</p>
		),
		width: 800,
		className: '',
	},
}
export const Expired: Story = {
	name: '已到期',
	args: {
		date: dayjs().startOf('day').valueOf(),
		title: (
			<p className="at-text-xl at-text-center at-font-bold">
				距離晚上 12 點還有
			</p>
		),
		width: 800,
		className: '',
	},
}

export const Error: Story = {
	name: '錯誤處理，型別錯誤',
	args: {
		date: 123,
		title: '距離晚上 12 點還有',
		width: 600,
		className: '',
	},
}
