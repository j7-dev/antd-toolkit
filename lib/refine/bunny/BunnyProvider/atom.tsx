import { atom, createStore } from 'jotai'
import axios, { AxiosInstance } from 'axios'

export const bunnyStore = createStore()

export const bunnyAtom = atom<{
	bunny_library_id: string
	bunny_stream_api_key: string
	bunny_cdn_hostname: string
	bunny_stream_axios: AxiosInstance
	bunny_data_provider_result: any
}>({
	bunny_library_id: '',
	bunny_stream_api_key: '',
	bunny_cdn_hostname: '',
	bunny_stream_axios: axios,
	bunny_data_provider_result: {},
})
