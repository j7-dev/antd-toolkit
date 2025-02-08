import type { Meta, StoryObj } from '@storybook/react'
import { BooleanSegmented } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof BooleanSegmented> & {
	argTypes: any
} = {
	title: 'MAIN/表單控件/BooleanSegmented',
	component: BooleanSegmented,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `

通常用於 Filter 組件表單，可以搜尋 ALL / TRUE / FALSE

帶的 value 分別是 '' / '1' / '0'

可以使用 segmentedProps 的 options 來自定義 value 與外觀樣式

				`, // 可以寫 markdown
			},
		},
	},

	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs

	tags: ['autodocs'],

	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes

	argTypes: {
		formItemProps: {
			description:
				"<a href='https://ant.design/components/form-cn#formitem' target='_blank'>antd Form.Item props</a>",
		},
		segmentedProps: {
			description:
				"<a href='https://ant.design/components/segmented-cn#api' target='_blank'>antd Segmented props</a>",
		},
		type: {
			description:
				'選擇不同的預設樣式種類，如果是從 segmentedProps 自訂 options 進去，此參數將被覆寫',
			control: 'select',
			options: ['default', 'text', 'icon', 'vertical'],
		},
	},
}

export default meta
type Story = StoryObj<typeof BooleanSegmented>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
	name: '預設樣式',
	args: {
		formItemProps: {
			className: 'at-w-80',
		},
		type: 'default',
	},
}

export const Icon: Story = {
	name: '只有 icon',
	args: {
		formItemProps: {
			className: 'at-w-80',
		},
		type: 'icon',
	},
}
export const Text: Story = {
	name: '只有文字',
	args: {
		formItemProps: {
			className: 'at-w-80',
		},
		type: 'text',
	},
}

export const Vertical: Story = {
	name: '垂直顯示',
	args: {
		formItemProps: {
			className: 'at-w-80',
		},
		type: 'vertical',
	},
}
