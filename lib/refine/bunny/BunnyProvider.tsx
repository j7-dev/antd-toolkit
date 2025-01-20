import React, { FC, useLayoutEffect } from 'react'
import { atom, Provider, useAtomValue, createStore } from 'jotai'
import axios, { AxiosInstance } from 'axios'

export const bunnyStore = createStore()

export const bunnyAtom = atom<{
	bunny_library_id: string
	bunny_stream_api_key: string
	bunny_cdn_hostname: string
	bunny_stream_axios: AxiosInstance
}>({
	bunny_library_id: '',
	bunny_stream_api_key: '',
	bunny_cdn_hostname: '',
	bunny_stream_axios: axios,
})

export const BunnyProvider: FC<{
	children: React.ReactNode
	bunny_library_id: string
	bunny_stream_api_key: string
	bunny_cdn_hostname: string
}> = ({
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

export const useBunny = () => {
	const bunnyAtomValue = useAtomValue(bunnyAtom)
	return bunnyAtomValue
}
