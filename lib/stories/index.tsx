import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
import { EnvProvider } from '@/main'
import { BunnyProvider } from '@/refine'
import { useEffect } from 'react'
import { App } from './App'

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
	STORYBOOK_NONCE,
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
	NONCE: STORYBOOK_NONCE,
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
				staleTime: 1000 * 60 * 10,
				cacheTime: 1000 * 60 * 10,
			},
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
							<App story={Story} />
						</BunnyProvider>
					</EnvProvider>
				</HashRouter>
			</StyleProvider>
		</QueryClientProvider>
	)
}
