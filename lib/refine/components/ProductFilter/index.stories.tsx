import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form } from 'antd'
import { ProductFilter } from './index'
import { refineDecorator } from '../../../stories'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ProductFilter> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/ProductFilter',
	component: ProductFilter,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `


				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof ProductFilter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	render: () => {
		const [form] = Form.useForm()
		return (
			<Form form={form}>
				<ProductFilter
					searchFormProps={{ form }}
					options={{
						product_cats: [],
						product_tags: [],
						product_shipping_classes: [],
						product_brands: [],
						top_sales_products: [],
						max_price: 0,
						min_price: 0,
						isLoading: false,
					}}
				/>
			</Form>
		)
	},
	decorators: [refineDecorator],
}
