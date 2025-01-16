import { HttpError } from '@refinedev/core'
import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
	timeout: 30000,
	headers: {
		// @ts-ignore
		'X-WP-Nonce': window?.wpApiSettings?.nonce || '',
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
