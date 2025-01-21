import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WatchLimit } from './index'
import { Form } from 'antd'

const meta: Meta<typeof WatchLimit> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/WatchLimit',
	component: WatchLimit,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
影片觀看期限

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof WatchLimit>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	decorators: [
		(Story) => (
			<Form layout="vertical">
				<div className="w-[20rem]">
					<Story />
				</div>
			</Form>
		),
	],
}
