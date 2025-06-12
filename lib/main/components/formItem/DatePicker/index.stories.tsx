import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './index'
import { Form } from 'antd'

const meta: Meta<typeof DatePicker> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
\`Form.Item\` 封裝後的 DatePicker 組件

預設傳給後端 unix timestamp (10位)

後端傳給前端皆可，可以是 10 位或 13 位

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof DatePicker>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	decorators: [
		(Story) => (
			<Form>
				<Story />
			</Form>
		),
	],
}
