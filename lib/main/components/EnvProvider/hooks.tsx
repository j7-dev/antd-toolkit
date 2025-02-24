import { useContext } from 'react'
import { EnvContext } from './index'
import { notification } from 'antd'
import axios, { AxiosInstance } from 'axios'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 * axiosInstance 可以用來發 api & 給 refine 使用
 */
export const useEnv = () => {
	const context = useContext(EnvContext)
	const { NONCE } = context

	const axiosInstance: AxiosInstance = axios.create({
		timeout: 30000,
		headers: {
			// @ts-ignore
			'X-WP-Nonce': NONCE,
			'Content-Type': 'application/json',
		},
	})

	// 添加 response 攔截器
	axiosInstance.interceptors?.response?.use(
		// 成功處理
		(response) => {
			const method = response?.config?.method || 'get'
			const restResponse = response?.data

			if (200 === response?.status) {
				if (method !== 'get') {
					notification.success({
						message: (
							<span style={{ color: '#52c41a' }}>{restResponse?.message}</span>
						),
						showProgress: true,
						pauseOnHover: true,
						icon: (
							<CheckCircleTwoTone
								twoToneColor="#52c41a"
								style={{ transform: 'scale(0.75)' }}
							/>
						),
					})
				}
			} else {
				notification.error({
					message: (
						<span style={{ color: '#ff4d4f' }}>{restResponse?.message}</span>
					),
					showProgress: true,
					pauseOnHover: true,
					icon: (
						<CloseCircleTwoTone
							twoToneColor="#ff4d4f"
							style={{ transform: 'scale(0.75)' }}
						/>
					),
				})
				console.error(restResponse)
			}
			return response
		},

		// 錯誤處理
		(error) => {
			if (error.response) {
				const restResponse = error?.response?.data
				notification.error({
					message: (
						<span style={{ color: '#ff4d4f' }}>{restResponse?.message}</span>
					),
					showProgress: true,
					pauseOnHover: true,
					icon: (
						<CloseCircleTwoTone
							twoToneColor="#ff4d4f"
							style={{ transform: 'scale(0.75)' }}
						/>
					),
				})
				console.error(restResponse)
				return
			}

			return Promise.reject(error) // 會被捕獲然後發送通知
		},
	)

	return {
		...context,
		AXIOS_INSTANCE: axiosInstance,
	}
}
