import React, { FC, useLayoutEffect } from 'react'
import { Provider } from 'jotai'
import axios from 'axios'
import { bunnyStore, bunnyAtom } from './atom'
import { useBunny } from './hooks'

const BunnyProviderComponent: FC<{
	children: React.ReactNode
	bunny_library_id: string
	bunny_stream_api_key: string
	bunny_cdn_hostname: string
}> & {
	useBunny: typeof useBunny
} = ({
	children,
	bunny_library_id,
	bunny_stream_api_key,
	bunny_cdn_hostname,
}) => {
	useLayoutEffect(() => {
		const bunny_stream_axios = axios.create({
			baseURL: 'https://video.bunnycdn.com/library',
			headers: {
				AccessKey: bunny_stream_api_key,
			},
		})

		bunnyStore.set(bunnyAtom, {
			bunny_library_id,
			bunny_stream_api_key,
			bunny_cdn_hostname,
			bunny_stream_axios,
		})
	}, [bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname])
	return <Provider store={bunnyStore}>{children}</Provider>
}

BunnyProviderComponent.useBunny = useBunny

export const BunnyProvider = BunnyProviderComponent
export * from './atom'
