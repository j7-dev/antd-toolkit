import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { TBunnyVideo } from '../types'
import { Refine } from '@refinedev/core'
import { bunnyStreamDataProvider, dataProvider } from '../../dataProvider'
import { BunnyProvider } from '../BunnyProvider'
import { HashRouter } from 'react-router-dom'
import axios from 'axios'
import { MediaLibraryIndicator } from '../MediaLibraryIndicator'

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
const bunnyConfig = {
	bunny_library_id: '244459',
	bunny_cdn_hostname: 'vz-da633ab8-b36.b-cdn.net',
	bunny_stream_api_key: '192d0f46-75b7-4148-8645a8530673-9081-40fb',
}

export const General: Story = {
	name: '一般用法',
	render: () => {
		const [selectedVideos, setSelectedVideos] = useState<TBunnyVideo[]>([])

		return (
			<MediaLibrary
				mediaLibraryProps={{
					selectedVideos,
					setSelectedVideos,
				}}
			/>
		)
	},
	decorators: [
		(Story) => {
			const bunnyStreamAxios = axios.create({
				baseURL: 'https://video.bunnycdn.com/library',
				headers: {
					AccessKey: bunnyConfig.bunny_stream_api_key,
				},
			})

			return (
				<HashRouter>
					<BunnyProvider {...bunnyConfig}>
						<Refine
							dataProvider={{
								default: dataProvider(
									'https://www.example.com/wp-json/my-plugin',
								),
								'bunny-stream': bunnyStreamDataProvider(
									'https://video.bunnycdn.com/library',
									bunnyStreamAxios,
								),
							}}
						>
							<div className="w-[900px]">
								<Story />
								<MediaLibraryIndicator />
							</div>
						</Refine>
					</BunnyProvider>
				</HashRouter>
			)
		},
	],
}
