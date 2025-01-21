import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNoteDrawer } from './index'
import { PluginProvider } from '@/main'
import { Refine } from '@refinedev/core'
import {
	bunnyStreamDataProvider,
	dataProvider,
} from '../../../../refine/dataProvider'
import { BunnyProvider } from '../../../../refine/bunny'
import axios from 'axios'
import { BUNNY_CONFIG, ENV } from '../../../../stories'
import { Form } from 'antd'

const meta: Meta<typeof BlockNoteDrawer> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/BlockNoteDrawer',
	component: BlockNoteDrawer,
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
type Story = StoryObj<typeof BlockNoteDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {
		useBlockNoteParams: {
			apiConfig: {
				apiEndpoint: ENV.UPLOAD_API,
				headers: new Headers({
					Authorization: 'Basic ' + btoa(ENV.USERNAME + ':' + ENV.PASSWORD),
				}),
			},
		},
	},

	decorators: [
		(Story) => {
			const bunnyStreamAxios = axios.create({
				baseURL: ENV.BUNNY_API,
				headers: {
					AccessKey: BUNNY_CONFIG.bunny_stream_api_key,
				},
			})

			return (
				<PluginProvider app_domain="test">
					<BunnyProvider {...BUNNY_CONFIG}>
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
							<div className="w-[40rem]">
								<Form>
									<Story />
								</Form>
							</div>
						</Refine>
					</BunnyProvider>
				</PluginProvider>
			)
		},
	],
}
