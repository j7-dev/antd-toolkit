import {
	useCustomMutation,
	UseCustomMutationReturnType,
	UseLoadingOvertimeReturnType,
	BaseRecord,
	HttpError,
	useApiUrl,
} from '@refinedev/core'
import { FormInstance, message } from 'antd'

type TUseSaveParams = {
	form: FormInstance
	url?: string // 覆寫 API 路徑，預設為 `${apiUrl}/options`
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
export const useSave = ({ form, url }: TUseSaveParams): TUseSaveReturn => {
	const apiUrl = useApiUrl()
	const mutation = useCustomMutation()
	const { mutate } = mutation

	const handleSave = () => {
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
					url: url || `${apiUrl}/options`, // 預設 API 路徑
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
						const confirmReload = window.confirm(
							'\n儲存成功，需要重新整理頁面後才能使用\n\n按【確認】重新整理頁面',
						)
						if (confirmReload) {
							window.location.reload()
						}
					},
				},
			)
		})
	}

	return {
		handleSave,
		mutation,
	}
}
