import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibraryIndicator } from './index'
import { Refine } from '@refinedev/core'
import { bunnyStreamDataProvider, dataProvider } from '../../dataProvider'
import { BunnyProvider } from '../BunnyProvider'
import axios from 'axios'

const meta: Meta<typeof MediaLibraryIndicator> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/MediaLibraryIndicator',
	component: MediaLibraryIndicator,
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
type Story = StoryObj<typeof MediaLibraryIndicator>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		return <MediaLibraryIndicator />
	},
	decorators: [
		(Story) => {
			const bunnyConfig = {
				bunny_library_id: '1234567890',
				bunny_stream_api_key: '1234567890',
				bunny_cdn_hostname: '1234567890',
			}
			const bunnyStreamAxios = axios.create({
				baseURL: 'https://video.bunnycdn.com/library',
				headers: {
					AccessKey: bunnyConfig.bunny_stream_api_key,
				},
			})

			return (
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
						<Story />
					</Refine>
				</BunnyProvider>
			)
		},
	],
}
