import type { Meta, StoryObj } from '@storybook/react'

import { ProductTotalSales } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ProductTotalSales> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductTotalSales',
	component: ProductTotalSales,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示商品銷售數量指示器
				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof ProductTotalSales>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		record: {
			total_sales: 80,
		},
		max_sales: 100,
	},
}
