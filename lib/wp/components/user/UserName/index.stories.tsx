import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fakeImage } from '@/main/utils'
import { UserName } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof UserName> & {
	argTypes: any
} = {
	title: 'WordPress/user/UserName',
	component: UserName,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示用戶名稱


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
type Story = StoryObj<typeof UserName>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		record: {
			display_name: 'test',
			user_email: 'test@test.com',
			id: '1',
			user_avatar_url: fakeImage,
		},
		onClick: undefined,
	},
}

export const NoImage: Story = {
	name: '不顯示圖片',
	args: {
		record: {
			display_name: 'test',
			user_email: 'test@test.com',
			id: '1',
			user_avatar_url: 'https://picsum.photos/200/300',
		},
		onClick: undefined,
		hideImage: true,
	},
}

export const Custom: Story = {
	name: '自定義顯示',
	args: {
		record: {
			display_name: 'test',
			user_email: 'test@test.com',
			id: '1',
			user_avatar_url: 'https://picsum.photos/200/300',
		},
		onClick: undefined,
		renderTitle: (
			<p className="at-mb-1 at-mt-0">
				<span className="at-mr-2 at-px-2 at-bg-primary at-text-white at-rounded-lg at-text-xs">
					Life Hacker
				</span>
				test
				<span className="at-ml-1 at-text-gray-400 at-text-xs">#23 - 講師</span>
			</p>
		),
		renderBelowTitle: (
			<span className="at-ml-1 at-text-gray-400 at-text-xs">
				Life is short, play more !
			</span>
		),
	},
}

export const LongTitle: Story = {
	name: '超長用戶名稱，容器寬度 200px',
	args: {
		record: {
			display_name: '勃起天尊30cm小牙籤手槍上帝亞洲統神',
			user_email: 'test@test.com',
			id: '1',
			user_avatar_url: 'https://picsum.photos/200/300',
		},
	},
	decorators: [
		(Story) => (
			<div className="at-w-[200px]">
				<Story />
			</div>
		),
	],
}
