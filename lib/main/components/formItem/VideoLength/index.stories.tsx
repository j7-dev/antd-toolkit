import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VideoLength } from './index'
import { Form } from 'antd'

const meta: Meta<typeof VideoLength> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/VideoLength',
	component: VideoLength,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
手動填入 VideoLength 影片長度 (因為多種影片源，不易統計每個影片長度)

取得的 value 為秒數

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof VideoLength>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {
		name: 'feature_video_length',
	},
	decorators: [
		(Story) => (
			<Form>
				<div className="at-w-[20rem]">
					<Story />
				</div>
			</Form>
		),
	],
}
