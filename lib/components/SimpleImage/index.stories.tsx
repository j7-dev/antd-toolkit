import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fakeImage } from '@/utils'
import { SimpleImage } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof SimpleImage> & {
	argTypes: any
} = {
	title: '常用/SimpleImage',
	component: SimpleImage,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
因為圖片、或其他 lazyload 內容還在加載中時，會空白，使用此組件可以有佔位符，讓用戶知道內容正在加載中

並且會有一個尺寸，避免跑版

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		src: {
			description: '圖片來源網址',
			control: {
				type: 'text',
			},
		},
		ratio: {
			description: '圖片比例，使用 Tailwind aspect-* 的 class',
			control: {
				type: 'text',
			},
		},
		className: {
			description: '容器的 className',
			control: {
				type: 'text',
			},
		},
		loadingClassName: {
			description: 'Loading 狀態的 className',
			control: {
				type: 'text',
			},
		},
		render: {
			description: '自訂渲染內容',
			control: {
				type: 'object',
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof SimpleImage>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		src: fakeImage,
	},
}

export const Square: Story = {
	name: '正方形',
	args: {
		src: fakeImage,
		ratio: 'aspect-square',
	},
}

export const Loading: Story = {
	name: '加載中',
	args: {
		render: <></>,
	},
	decorators: [
		(Story) => (
			<div className="w-[20rem]">
				<Story />
			</div>
		),
	],
}
