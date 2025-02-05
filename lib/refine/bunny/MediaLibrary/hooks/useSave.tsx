import {
	useCustomMutation,
	useApiUrl,
	UseCustomMutationReturnType,
	UseLoadingOvertimeReturnType,
	BaseRecord,
	HttpError,
} from '@refinedev/core'
import { FormInstance, message } from 'antd'
import { useCallback } from 'react'
import { PluginProvider } from '@/main'

type TUseSaveParams = {
	/** Antd Form 實例 */
	form: FormInstance
}

type TUseSaveReturn = {
	/** 處理儲存表單的函數 */
	handleSave: () => void
	/** useCustomMutation 的回傳值，包含 mutation 狀態和方法 */
	mutation: UseCustomMutationReturnType<BaseRecord, HttpError, {}> &
		UseLoadingOvertimeReturnType
}

/**
 * 用於處理表單儲存的自定義 Hook
 * @param props - Hook 的參數
 * @param props.form - Antd Form 實例，用於獲取和驗證表單數據
 * @returns 包含儲存處理函數和 mutation 狀態的物件
 */
export const useSave = ({ form }: TUseSaveParams): TUseSaveReturn => {
	const apiUrl = useApiUrl()
	const mutation = useCustomMutation()
	const { SITE_URL } = PluginProvider.usePlugin()
	const { mutate } = mutation

	const handleSave = useCallback(() => {
		// 顯示儲存中的 loading 訊息
		message.loading({
			content: '儲存中...',
			duration: 0,
			key: 'save',
		})

		// 驗證表單欄位
		form.validateFields().then((values) => {
			mutate(
				{
					url: `${SITE_URL}/wp-json/powerhouse/v2/options`, // 預設 API 路徑
					method: 'post',
					values,
				},
				{
					onSuccess: () => {
						// 顯示儲存成功訊息
						message.success({
							content: '儲存成功',
							key: 'save',
						})

						// 刷新頁面
						window.location.reload()

						// 使所有的 query cache 失效
						// invalidate({
						// 	invalidates: ['all'],
						// })
					},
				},
			)
		})
	}, [form, mutate, apiUrl])

	return {
		handleSave,
		mutation,
	}
}
