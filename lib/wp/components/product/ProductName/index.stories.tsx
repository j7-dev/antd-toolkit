import type { Meta, StoryObj } from '@storybook/react'

import { ProductName } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// @ts-ignore
const meta: Meta<typeof ProductName> & {
	argTypes: any
} = {
	title: 'WordPress/product/ProductName',
	component: ProductName,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示商品名稱，使用 \`label\` 可以覆寫商品名稱
\`onClick\` 可以添加點擊事件
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
id: string,
name: string,
sku: string,
images: {
  url: string
}[]
`,
				},
			},
		},
		label: {
			description: '覆寫商品名稱',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
		onClick: {
			description: '點擊事件',
			table: {
				type: {
					summary: '(record: any) => void',
				},
			},
		},
		imageProps: {
			description: '圖片屬性',
			table: {
				type: {
					summary: 'object',
					detail: `
antd 的 ImageProps 例如寬高屬性
width?: number,
height?: number
`,
				},
			},
		},
		hideImage: {
			description: '是否隱藏圖片',
			table: {
				type: {
					summary: 'boolean',
				},
				defaultValue: { summary: false },
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof ProductName>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		record: {
			id: '28',
			name: 'Power 漏斗學',
			sku: '19880810',
			images: [
				{
					url: 'https://via.placeholder.com/150',
				},
			],
		},
	},
}

export const WideImage: Story = {
	name: '寬圖片',
	args: {
		record: {
			id: '28',
			name: 'Power 漏斗學',
			sku: '19880810',
			images: [
				{
					url: 'https://via.placeholder.com/150',
				},
			],
		},
		imageProps: {
			width: 85,
			height: 48,
		},
	},
}

export const HideImage: Story = {
	name: '不顯示圖片',
	args: {
		record: {
			id: '28',
			name: 'Power 漏斗學',
			sku: '19880810',
			images: [
				{
					url: 'https://via.placeholder.com/150',
				},
			],
		},
		hideImage: true,
	},
}
