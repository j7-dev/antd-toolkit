import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { TBunnyVideo } from '../types'
import { Refine } from '@refinedev/core'
import { bunnyStreamDataProvider, dataProvider } from '../../dataProvider'
import { BunnyProvider } from '../BunnyProvider'
import { HashRouter } from 'react-router-dom'
import axios from 'axios'
import { MediaLibraryIndicator } from '../MediaLibraryIndicator'
import { PluginProvider } from '../../../main/components/PluginProvider'
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
// 載入環境變數
const bunnyConfig = {
	bunny_library_id: import.meta.env?.STORYBOOK_BUNNY_LIBRARY_ID || '1234567890',
	bunny_cdn_hostname:
		import.meta.env?.STORYBOOK_BUNNY_CDN_HOSTNAME || '1234567890',
	bunny_stream_api_key:
		import.meta.env?.STORYBOOK_BUNNY_STREAM_API_KEY || '1234567890',
}

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
