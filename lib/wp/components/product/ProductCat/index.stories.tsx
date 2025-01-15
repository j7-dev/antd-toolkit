import type { Meta, StoryObj } from '@storybook/react'

import { ProductCat } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ProductCat> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductCat',
	component: ProductCat,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示分類與標籤


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
categories: {
  id: string,
  name: string
}[],
tags: {
  id: string,
  name: string
}[]
`,
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof ProductCat>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		record: {
			categories: [
				{
					id: 'wordpress',
					name: 'WordPress',
				},
				{
					id: 'shopline',
					name: 'Shopline',
				},
				{
					id: 'shopify',
					name: 'Shopify',
				},
				{
					id: '91app',
					name: '91 APP',
				},
			],
			tags: [
				{
					id: 'react',
					name: 'React',
				},
				{
					id: 'nodejs',
					name: 'Node.js',
				},
				{
					id: 'antdesign',
					name: 'Ant Design',
				},
			],
		},
	},
}
