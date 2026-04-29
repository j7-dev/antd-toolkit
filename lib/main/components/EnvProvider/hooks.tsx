import { useContext } from 'react'
import { EnvContext, TEnv } from './index'
import axios, { AxiosInstance } from 'axios'
import { useLocale } from '@/main/components/LocaleProvider'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 * axiosInstance 可以用來發 api & 給 refine 使用
 * @returns {TEnv} 包含 axiosInstance 的環境變數
 */
export function useEnv<T extends TEnv = TEnv>(): T {
	const { STORYBOOK_USERNAME, STORYBOOK_PASSWORD } = import.meta.env

	const context = useContext(EnvContext)
	const { NONCE } = context
	const t = useLocale('EnvProvider')

	const headers = NONCE
		? {
				'X-WP-Nonce': NONCE,
			}
		: {
				Authorization:
					'Basic ' + btoa(STORYBOOK_USERNAME + ':' + STORYBOOK_PASSWORD),
			}

	const axiosInstance: AxiosInstance = axios.create({
		timeout: 30000,
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
	})

	// 添加 response 攔截器，不發通知，統一由 notificationProvider 發送
	axiosInstance.interceptors?.response?.use(
		// 成功處理
		(response) => {
			return response
		},

		// 錯誤處理
		(error) => {
			if (error.response) {
				// 伺服器有響應但狀態碼表示錯誤
				switch (error.response.status) {
					case 403:
						const confirm = window.confirm(t.cookieExpired)
						if (confirm) {
							window.location.reload()
						}
						break
					default:
						console.error(t.requestFailed, error.response.data.message)
				}
			} else if (error.request) {
				// 請求已發送但沒有收到響應
				console.error(t.noResponse)
			} else {
				// 設定請求時發生錯誤
				console.error(t.requestConfigError, error.message)
			}

			// 返回錯誤
			return Promise.reject(error) // 會被捕獲然後發送通知
		},
	)

	return {
		...context,
		AXIOS_INSTANCE: axiosInstance as AxiosInstance,
	} as T & { AXIOS_INSTANCE: AxiosInstance }
}
