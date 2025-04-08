import type { Meta, StoryObj } from '@storybook/react'

import { TrendIndicator } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof TrendIndicator> & {
	argTypes: any
} = {
	title: 'MAIN/常用/TrendIndicator',
	component: TrendIndicator,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示上漲、下跌的組件

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		currency: {
			control: {
				type: 'text',
			},
		},
		symbol: {
			control: {
				type: 'boolean',
				defaultValue: false,
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof TrendIndicator>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Rise: Story = {
	name: '上漲',
	args: {
		tooltipProps: {
			title: '去年營收 80,000',
		},
		value: 100000,
		compareValue: 80000,
	},
}

export const Fall: Story = {
	name: '下跌',
	args: {
		tooltipProps: {
			title: '去年營收 80,000',
		},
		value: 80000,
		compareValue: 100000,
	},
}

export const LakeValue: Story = {
	name: '缺少今年資料',
	args: {
		tooltipProps: {
			title: '去年營收 80,000',
		},
		value: 0,
		compareValue: 80000,
	},
}

export const LakeCompareValue: Story = {
	name: '缺少去年資料',
	args: {
		tooltipProps: {
			title: '去年營收 0',
		},
		value: 80000,
		compareValue: 0,
	},
}

export const Same: Story = {
	name: '持平',
	args: {
		tooltipProps: {
			title: '去年營收 80,000',
		},
		value: 80000,
		compareValue: 80000,
	},
}
