import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { TBunnyVideo } from '../types'
import { MediaLibraryIndicator } from '../MediaLibraryIndicator'
import { refineDecorator } from '../../../stories'

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
		const [selectedVideos, setSelectedVideos] = useState<TBunnyVideo[]>([])

		return (
			<>
				<MediaLibrary
					mediaLibraryProps={{
						selectedVideos,
						setSelectedVideos,
					}}
				/>
				<MediaLibraryIndicator />
			</>
		)
	},
	decorators: [refineDecorator],
}
