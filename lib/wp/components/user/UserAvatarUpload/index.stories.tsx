import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fakeImage } from '@/main/utils'
import { UserAvatarUpload } from './index'
import { Refine } from '@refinedev/core'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof UserAvatarUpload> & {
	argTypes: any
} = {
	title: 'WordPress/user/UserAvatarUpload',
	component: UserAvatarUpload,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
上傳用戶頭像

TODO: 寫得更通用方便
				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		endPoint: {
			description: 'API 端點',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
		nonce: {
			description: 'WordPress nonce',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
		name: {
			description: '表單欄位名稱',
			table: {
				type: {
					summary: 'string | number | (string | number)[]',
				},
			},
		},
	},
	decorators: [
		(Story) => (
			<Refine
				dataProvider={{
					// @ts-ignore
					default: {
						getApiUrl: () => {
							return 'https://www.example.com'
						},
					},
				}}
			>
				<Story />
			</Refine>
		),
	],
}

export default meta
type Story = StoryObj<typeof UserAvatarUpload>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		endPoint: 'https://www.example.com',
		nonce: 'test%nonce',
		name: 'test',
	},
}
