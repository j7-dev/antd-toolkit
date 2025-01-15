import type { Meta, StoryObj } from '@storybook/react'

import { ProductPrice } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ProductPrice> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductPrice',
	component: ProductPrice,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示商品價格，從 \`$product->get_price_html()\` 取得


				`, // 可以寫 markdown
			},
		},
	},
	decorators: [
		(Story) => (
			// @ts-ignore
			<div className="ant-container">
				{/* @ts-ignore */}
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof ProductPrice>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		record: {
			price_html:
				'<span class="sale-price"><del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">NT$</span>2,000</bdi></span></del> <span class="screen-reader-text">原始價格：NT$2,000。</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">NT$</span>300</bdi></span></ins><span class="screen-reader-text">目前價格：NT$300。</span></span>',
		},
	},
}
