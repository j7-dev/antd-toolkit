import React from 'react'
import { Form } from 'antd'
import type { Meta, StoryObj } from '@storybook/react'
import { DescriptionDrawer } from './index'
import { refineDecorator } from '../../../../stories'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof DescriptionDrawer> & {
	argTypes: any
} = {
	title: 'MAIN/Editor/DescriptionDrawer',
	component: DescriptionDrawer,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
				會自動儲存 editor 欄位，標示使用何種編輯器
				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof DescriptionDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	render: () => {
		const [form] = Form.useForm()

		return (
			<Form layout="vertical" form={form}>
				<Form.Item label="ID" name="id" initialValue="1" hidden />
				<Form.Item
					label="編輯器"
					name="editor"
					initialValue="power-editor"
					hidden
				/>

				<DescriptionDrawer />
			</Form>
		)
	},
	decorators: [refineDecorator],
}
