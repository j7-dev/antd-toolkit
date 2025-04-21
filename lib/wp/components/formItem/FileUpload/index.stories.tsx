import React, { useState } from 'react'
import type { UploadFile } from 'antd'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// @ts-ignore
const meta: Meta<typeof FileUpload> & {
	argTypes: any
} = {
	title: 'WordPress/組件/FileUpload',
	component: FileUpload,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof FileUpload>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	render: () => {
		const [fileList, setFileList] = useState<UploadFile[]>([])

		return (
			<>
				<FileUpload fileList={fileList} setFileList={setFileList} />
			</>
		)
	},
}
