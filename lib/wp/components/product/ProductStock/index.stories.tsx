import type { Meta, StoryObj } from '@storybook/react'

import { ProductStock } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ProductStock> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductStock',
	component: ProductStock,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
	顯示商品庫存
				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		record: {
			description: '商品資料',
			table: {
				type: {
					summary: 'object',
					detail: `
stock_status: "instock" | "outofstock" | "onbackorder",
stock_quantity: number | null,
low_stock_amount: number | null
`,
				},
			},
		},
		type: {
			description: '顯示類型',
			table: {
				type: {
					summary: 'text | tag',
				},
				defaultValue: { summary: 'text' },
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof ProductStock>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '庫存充足',
	args: {
		record: {
			stock_status: 'instock',
			stock_quantity: 10,
			low_stock_amount: 5,
		},
		type: 'text',
	},
}

export const LowStock: Story = {
	name: '庫存不足',
	args: {
		record: {
			stock_status: 'instock',
			stock_quantity: 10,
			low_stock_amount: 20,
		},
		type: 'text',
	},
}

export const OutOfStock: Story = {
	name: '缺貨',
	args: {
		record: {
			stock_status: 'outofstock',
			stock_quantity: 0,
			low_stock_amount: 5,
		},
		type: 'text',
	},
}

export const OnBackorder: Story = {
	name: '允許缺貨',
	args: {
		record: {
			stock_status: 'onbackorder',
			stock_quantity: 10,
			low_stock_amount: 5,
		},
		type: 'text',
	},
}
