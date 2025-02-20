import { HashRouter } from 'react-router-dom'
import { Refine } from '@refinedev/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import { EnvProvider } from '@/main'
import { BunnyProvider, bunnyStreamDataProvider, dataProvider } from '@/refine'
import axios from 'axios'
import { useEffect } from 'react'
import { Form } from 'antd'

const { Item } = Form

const {
	STORYBOOK_SITE_URL,
	STORYBOOK_AJAX_URL,
	STORYBOOK_API_URL,
	STORYBOOK_APP_NAME,
	STORYBOOK_KEBAB,
	STORYBOOK_SNAKE,
	STORYBOOK_BUNNY_LIBRARY_ID = '',
	STORYBOOK_BUNNY_CDN_HOSTNAME = '',
	STORYBOOK_BUNNY_STREAM_API_KEY = '',
	STORYBOOK_UPLOAD_API,
	STORYBOOK_BUNNY_API,
	STORYBOOK_USERNAME,
	STORYBOOK_PASSWORD,
} = import.meta.env

console.log('ENV', import.meta.env)

// StoryBook 用的環境變數
export const ENV = {
	SITE_URL: STORYBOOK_SITE_URL,
	AJAX_URL: STORYBOOK_AJAX_URL,
	API_URL: STORYBOOK_API_URL,
	CURRENT_USER_ID: 1,
	CURRENT_POST_ID: '1',
	PERMALINK: 'https://www.example.com/post/1',
	APP_NAME: STORYBOOK_APP_NAME,
	KEBAB: STORYBOOK_KEBAB,
	SNAKE: STORYBOOK_SNAKE,
	NONCE: '1234567890',
	BUNNY_LIBRARY_ID: STORYBOOK_BUNNY_LIBRARY_ID,
	BUNNY_CDN_HOSTNAME: STORYBOOK_BUNNY_CDN_HOSTNAME,
	BUNNY_STREAM_API_KEY: STORYBOOK_BUNNY_STREAM_API_KEY,
	//----
	UPLOAD_API: STORYBOOK_UPLOAD_API,
	BUNNY_API: STORYBOOK_BUNNY_API,
	USERNAME: STORYBOOK_USERNAME,
	PASSWORD: STORYBOOK_PASSWORD,
}

export const BUNNY_CONFIG = {
	bunny_library_id: STORYBOOK_BUNNY_LIBRARY_ID,
	bunny_stream_api_key: STORYBOOK_BUNNY_STREAM_API_KEY,
	bunny_cdn_hostname: STORYBOOK_BUNNY_CDN_HOSTNAME,
}

// Refine 用 decorators
export const refineDecorator = (Story: any) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 0,
			},
		},
	})

	const bunnyStreamAxios = axios.create({
		baseURL: ENV.BUNNY_API,
		headers: {
			AccessKey: BUNNY_CONFIG.bunny_stream_api_key,
		},
	})

	useEffect(() => {
		// @ts-ignore
		window.my_plugin_data = {
			env: {
				APP_NAME: ENV.APP_NAME,
				SITE_URL: ENV.SITE_URL,
			},
		}
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<StyleProvider hashPriority="low">
				<HashRouter>
					<EnvProvider env={ENV}>
						<BunnyProvider {...BUNNY_CONFIG}>
							<Refine
								dataProvider={{
									default: dataProvider(ENV.API_URL),
									'bunny-stream': bunnyStreamDataProvider(
										ENV.BUNNY_API,
										bunnyStreamAxios,
									),
								}}
							>
								<div className="at-w-[900px]">
									<Form layout="vertical">
										<Story />
										<Item name={['id']} initialValue={1} />
									</Form>
								</div>
							</Refine>
						</BunnyProvider>
					</EnvProvider>
				</HashRouter>
			</StyleProvider>
		</QueryClientProvider>
	)
}
