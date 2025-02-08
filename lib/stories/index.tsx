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

// StoryBook 用的環境變數
export const ENV = {
	SITE_URL: 'https://www.example.com',
	AJAX_URL: 'https://www.example.com/wp-json/my-plugin',
	CURRENT_USER_ID: 1,
	CURRENT_POST_ID: '1',
	PERMALINK: 'https://www.example.com/post/1',
	APP_NAME: 'my_plugin',
	KEBAB: 'my-plugin',
	SNAKE: 'my_plugin',
	NONCE: '1234567890',
	//----
	UPLOAD_API: 'http://test.local/wp-json/power-course/upload',
	BUNNY_API: 'https://video.bunnycdn.com/library',
	USERNAME: 'j7',
	PASSWORD: 'gRJ0 14kC n9ye kQft k2Iz 5BAP',
}

export const BUNNY_CONFIG = {
	bunny_library_id: '1234567890',
	bunny_stream_api_key: '1234567890',
	bunny_cdn_hostname: '1234567890',
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
		baseURL: 'https://video.bunnycdn.com/library',
		headers: {
			AccessKey: BUNNY_CONFIG.bunny_stream_api_key,
		},
	})

	useEffect(() => {
		// @ts-ignore
		window.my_plugin_data = {
			env: {
				APP_NAME: 'my_plugin',
				SITE_URL: 'https://www.example.com',
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
									default: dataProvider(
										'https://www.example.com/wp-json/my-plugin',
									),
									'bunny-stream': bunnyStreamDataProvider(
										'https://video.bunnycdn.com/library',
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
