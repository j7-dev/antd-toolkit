import type { Meta, StoryObj } from '@storybook/react'
import { BooleanIndicator } from './index'

const meta: Meta<typeof BooleanIndicator> & {
	argTypes: any
} = {
	title: 'MAIN/常用/BooleanIndicator',
	component: BooleanIndicator,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `

簡單傳入一個 true / false 的值，就可以顯示對應的圖示


				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		tooltipProps: {
			description:
				"<a href='https://ant.design/components/tooltip-cn#api' target='_blank'>antd Tooltip props</a>",
		},
	},
}

export default meta
type Story = StoryObj<typeof BooleanIndicator>

export const WithoutTooltips: Story = {
	name: '無提示',
	args: {
		enabled: false,
	},
}
export const WithTooltips: Story = {
	name: '有提示',
	args: {
		enabled: true,
		tooltipProps: {
			enabled: true,
			title: '啟用狀態',
		},
	},
}

export const CustomClassname: Story = {
	name: '自訂 className',
	args: {
		enabled: true,
		tooltipProps: {
			enabled: true,
			title: '啟用狀態',
		},
		className: 'at-rounded-none at-h-8 at-w-8',
	},
}
