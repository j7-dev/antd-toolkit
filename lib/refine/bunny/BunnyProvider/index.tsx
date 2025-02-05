import React, { FC, useContext, useMemo, createContext } from 'react'
import axios from 'axios'
import { dataProvider } from './dataProvider'
import { AxiosInstance } from 'axios'

const BUNNY_API_URL = 'https://video.bunnycdn.com/library'

type TBunnyContext = {
	bunny_library_id: string
	bunny_stream_api_key: string
	bunny_cdn_hostname: string
	bunny_stream_axios: AxiosInstance
	bunny_data_provider_result: any
}

export const BunnyContext = createContext<TBunnyContext>({
	bunny_library_id: '',
	bunny_stream_api_key: '',
	bunny_cdn_hostname: '',
	bunny_stream_axios: axios,
	bunny_data_provider_result: {},
})

export const BunnyProvider: FC<
	TBunnyContext & { children: React.ReactNode }
> = ({
	children,
	bunny_library_id,
	bunny_stream_api_key,
	bunny_cdn_hostname,
}) => {
	const parentContext = useContext(BunnyContext)

	const context = useMemo(() => {
		const bunny_stream_axios = axios.create({
			baseURL: BUNNY_API_URL,
			headers: {
				AccessKey: bunny_stream_api_key,
			},
		})

		return {
			...parentContext,
			bunny_library_id,
			bunny_stream_api_key,
			bunny_cdn_hostname,
			bunny_stream_axios,
			bunny_data_provider_result: dataProvider(
				BUNNY_API_URL,
				bunny_stream_axios,
			),
		}
	}, [
		bunny_library_id,
		bunny_stream_api_key,
		bunny_cdn_hostname,
		parentContext,
	])

	return (
		<BunnyContext.Provider value={context}>{children}</BunnyContext.Provider>
	)
}

export * from './hooks'
