import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fakeImage } from '@/utils'
import { UserFilter } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof UserFilter> & {
	argTypes: any
} = {
	title: 'WordPress/user/UserFilter',
	component: UserFilter,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
基礎的用戶篩選器

TODO
1. 已買過指定商品的用戶
2. 沒買過 OO 商品的用戶

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		formProps: {
			description: '從 `refine` `useTable` 拿出來的 `searchFormProps`',
			type: { name: 'object', required: true },
			table: {
				type: { summary: 'FormProps' },
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof UserFilter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		hideInclude: true,
	},
}
