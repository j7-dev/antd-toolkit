import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Segmented } from './index'
import { Form } from 'antd'

const meta: Meta<typeof Segmented> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/Segmented',
	component: Segmented,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
\`Form.Item\` 封裝後的 Segmented 組件

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof Segmented>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	decorators: [
		(Story) => (
			<Form>
				<div className="at-w-80">
					<Story />
				</div>
			</Form>
		),
	],
}
