import { HashRouter } from 'react-router-dom'
import { Refine } from '@refinedev/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import { PluginProvider } from '@/main'
import { BunnyProvider, bunnyStreamDataProvider, dataProvider } from '@/refine'
import axios from 'axios'
import { useEffect } from 'react'

// StoryBook 用的環境變數
export const ENV = {
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
					<PluginProvider app_domain="my_plugin_data">
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
								<div className="w-[900px]">
									<Story />
								</div>
							</Refine>
						</BunnyProvider>
					</PluginProvider>
				</HashRouter>
			</StyleProvider>
		</QueryClientProvider>
	)
}
