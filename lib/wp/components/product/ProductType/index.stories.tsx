import type { Meta, StoryObj } from '@storybook/react'

import { ProductType } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// @ts-ignore
const meta: Meta<typeof ProductType> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductType',
	component: ProductType,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
	顯示商品類型


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
type: "simple" | "grouped" | "external" | "variable" | "variation" | "subscription" | "variable-subscription" | "subscription_variation",
featured: boolean,
virtual: boolean,
downloadable: boolean
`,
				},
			},
		},
		hideDownloadable: {
			description: '是否隱藏可下載圖示',
			table: {
				type: {
					summary: 'boolean',
				},
				defaultValue: { summary: true },
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof ProductType>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '庫存充足',
	args: {
		record: {
			type: 'simple',
			featured: true,
			virtual: true,
			downloadable: true,
		},
		hideDownloadable: false,
	},
}
