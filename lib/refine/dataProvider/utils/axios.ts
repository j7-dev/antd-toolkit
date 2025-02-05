import { HttpError } from '@refinedev/core'
import axios, { AxiosInstance } from 'axios'
import { pluginAtom, pluginStore } from '@/main'

const { NONCE } = pluginStore.get(pluginAtom)
const axiosInstance: AxiosInstance = axios.create({
	timeout: 30000,
	headers: {
		// @ts-ignore
		'X-WP-Nonce': NONCE || '',
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		const customError: HttpError = {
			...error,
			message: error.response?.data?.message,
			statusCode: error.response?.status,
		}

		return Promise.reject(customError)
	},
)

export { axiosInstance }
