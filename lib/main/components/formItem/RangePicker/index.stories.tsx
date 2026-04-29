import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangePicker } from './index'
import { Form } from 'antd'

const meta: Meta<typeof RangePicker> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/RangePicker',
	component: RangePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
\`Form.Item\` 封裝後的 RangePicker 組件

傳給後端需要自己實現

後端傳給前端皆可，可以是 10 位或 13 位

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof RangePicker>

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
