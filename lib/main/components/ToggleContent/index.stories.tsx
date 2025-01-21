import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fakeImage } from '@/utils'
import { ToggleContent } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ToggleContent> & {
	argTypes: any
} = {
	title: 'MAIN/常用/ToggleContent',
	component: ToggleContent,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
摺疊內容，可以讓內容在超過一定高度時，自動摺疊

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		content: {
			description: '要顯示的 HTML 內容',
			control: {
				type: 'text',
			},
		},
		className: {
			description: '容器的 className，可以設定高度',
			control: {
				type: 'text',
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof ToggleContent>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const node = '<p>Hello World!</p>'
const htmlString = new Array(100).fill(node).join('')

export const General: Story = {
	name: '一般',
	args: {
		content: htmlString,
	},
	decorators: [
		(Story) => (
			<div className="w-[20rem]">
				<Story />
			</div>
		),
	],
}
