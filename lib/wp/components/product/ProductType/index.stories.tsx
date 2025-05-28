import type { Meta, StoryObj } from '@storybook/react'

import { ProductType } from './index'
import { refineDecorator } from '../../../../stories'

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
type: "simple" | "grouped" | "external" | "variable" | "variation" | "subscription" | "variable-subscription" | "subscription_variation", // 商品類型，simple=單一商品、grouped=組合商品、external=外部商品、variable=可變商品、variation=商品變體、subscription=訂閱商品、variable-subscription=可變訂閱商品、subscription_variation=訂閱商品變體
featured: boolean, // 是否為精選商品
virtual: boolean, // 是否為虛擬商品
downloadable: boolean // 是否可下載
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
		renderBefore: {
			description: '在商品類型前方插入內容',
			table: {
				type: {
					summary: 'React.ReactNode',
				},
			},
		},
		renderAfter: {
			description: '在商品類型後方插入內容',
			table: {
				type: {
					summary: 'React.ReactNode',
				},
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
	decorators: [refineDecorator],
}
