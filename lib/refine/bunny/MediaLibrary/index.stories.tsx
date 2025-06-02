import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { TBunnyVideo, TFileInQueue } from '../types'
import {
	MediaLibraryNotification,
	filesInQueueAtom,
} from '../MediaLibraryNotification'
import { refineDecorator } from '../../../stories'
import { useSetAtom } from 'jotai'

// 上傳中
const MOCK_FILES = [
	{
		key: 'rc-upload-1723542720209-7',
		file: {
			lastModified: 1719828868246,
			name: 'feature.mp4',
			size: 119071062,
			type: 'video/mp4',
			uid: 'rc-upload-1723542720209-14',
			webkitRelativePath: '',
		},
		status: 'active',
		videoId: '9428d90f-8e12-4909-924c-b3fef42e8829',
		isEncoding: false,
		encodeProgress: 0,
		uploadProgress: 0,
		preview: 'blob:http://test.local/c6e97785-1d4c-491a-a7c1-ed49d50ce788',
	},
	{
		key: 'rc-upload-1723542720209-8',
		file: {
			lastModified: 17198280868246,
			name: 'feature.mp4',
			size: 31907162,
			type: 'video/mp4',
			uid: 'rc-upload-1723542720209-14',
			webkitRelativePath: '',
		},
		status: 'active',
		videoId: '',
		isEncoding: false,
		encodeProgress: 0,
		uploadProgress: 0,
		preview: 'blob:http://test.local/8b5b989a-4679-4355-a5d6-5178bbfe6241',
	},
	{
		key: 'rc-upload-1723542720209-9',
		file: {
			lastModified: 17198288068246,
			name: 'feature.mp4',
			size: 18907162,
			type: 'video/mp4',
			uid: 'rc-upload-1723542720209-14',
			webkitRelativePath: '',
		},
		status: 'active',
		videoId: '',
		isEncoding: true,
		encodeProgress: 0,
		uploadProgress: 0,
		preview: 'blob:http://test.local/9add96bf-377f-4213-b3e2-8d2c624450b8',
	},
] as TFileInQueue[]

// 編碼中
// filesInQueue = [
// 	{
// 		"key": "rc-upload-1723542720209-7",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "9428d90f-8e12-4909-924c-b3fef42e8829",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://test.local/c6e97785-1d4c-491a-a7c1-ed49d50ce788"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-8",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "fd38f6d8-1fb1-4c63-b8b2-d1383af97120",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://test.local/8b5b989a-4679-4355-a5d6-5178bbfe6241"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-9",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "bb72f4db-0758-48c0-b5c6-70f2954f109f",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://test.local/9add96bf-377f-4213-b3e2-8d2c624450b8"
// 	}
// ]

const meta: Meta<typeof MediaLibrary> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/MediaLibrary',
	component: MediaLibrary,
	parameters: {
		status: {
			type: 'dev',
		},
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
		const [selectedItems, setSelectedItems] = useState<TBunnyVideo[]>([])
		const setFilesInQueue = useSetAtom(filesInQueueAtom)

		useEffect(() => {
			setFilesInQueue(MOCK_FILES)
		}, [])

		return (
			<>
				<MediaLibrary
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
				/>
				<MediaLibraryNotification />
			</>
		)
	},
	decorators: [refineDecorator],
}
