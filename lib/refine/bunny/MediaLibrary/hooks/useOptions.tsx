import React, { useEffect } from 'react'
import {
	useCustom,
	UseCustomProps,
	HttpError,
	BaseRecord,
} from '@refinedev/core'
import { FormInstance } from 'antd'
import { useEnv } from '@/main'

/**
 * API 回應的基本型別定義
 */
type TOptionResponse = {
	/** 回應狀態碼 */
	code: string
	/** 回應資料 */
	data: {
		[key: string]: any
	}
	/** 回應訊息 */
	message: string
}

/**
 * useOptions hook 的參數型別定義
 */
type TUseOptionsParams<TQueryFnData, TError, TQuery, TPayload, TData> = {
	/** antd Form 實例 */
	form: FormInstance
	/** useCustom hook 的自定義參數 */
	useCustomParams?: UseCustomProps<
		TQueryFnData,
		TError,
		TQuery,
		TPayload,
		TData
	>
}

/**
 * 用於獲取和設置選項的自定義 Hook
 * @template TQueryFnData - API 回應資料的型別，預設為 TOptionResponse
 * @template TError - 錯誤型別，預設為 HttpError
 * @template TQuery - 查詢參數型別
 * @template TPayload - 請求負載型別
 * @template TData - 轉換後的資料型別
 *
 * @param {TUseOptionsParams} params - Hook 參數
 * @param {FormInstance} params.form - antd Form 實例，用於設置表單值
 * @param {UseCustomProps} [params.useCustomParams] - useCustom hook 的自定義參數
 *
 * @returns {UseCustomReturnType} - 返回 useCustom hook 的結果
 */
export const useOptions = <
	TQueryFnData extends BaseRecord = TOptionResponse,
	TError extends HttpError = HttpError,
	TQuery = unknown,
	TPayload = unknown,
	TData extends BaseRecord = TQueryFnData,
>({
	form,
	useCustomParams,
}: TUseOptionsParams<TQueryFnData, TError, TQuery, TPayload, TData>) => {
	const { SITE_URL } = useEnv()

	// 使用 useCustom hook 發送請求
	const result = useCustom<TQueryFnData, TError, TQuery, TPayload, TData>({
		url: `${SITE_URL}/wp-json/v2/powerhouse/options`, // 預設 API 路徑
		method: 'get',
		...useCustomParams,
	})

	const { isFetching } = result

	// 當資料獲取完成時，更新表單值
	useEffect(() => {
		if (!isFetching) {
			const values = result.data?.data?.data
			form.setFieldsValue(values)
		}
	}, [isFetching])

	return result
}
