import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { refineDecorator } from '../../../../stories'
import { TAttachment } from './types'
import { UploadFile } from 'antd'

const meta: Meta<typeof MediaLibrary> & {
	argTypes: any
} = {
	title: 'WordPress/組件/MediaLibrary',
	component: MediaLibrary,
	parameters: {
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
type Story = StoryObj<typeof MediaLibrary>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		const [selectedItems, setSelectedItems] = useState<TAttachment[]>([])
		const [filesInQueue, setFilesInQueue] = useState<UploadFile[]>([
			// DELETE
			{
				uid: 'rc-upload-1745987120068-9',
				lastModified: 1745320457007,
				lastModifiedDate: new Date('2025-04-22T11:14:17.007Z'),
				name: 'parrot6.gif',
				size: 2375442,
				type: 'image/gif',
				percent: 0,
				originFileObj: {
					uid: 'rc-upload-1745987120068-9',
				},
				status: 'uploading',
			},
		])
		return (
			<>
				<MediaLibrary
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
					filesInQueue={filesInQueue}
					setFilesInQueue={setFilesInQueue}
				/>
			</>
		)
	},
	decorators: [refineDecorator],
}
