import { memo } from 'react'
import { PopconfirmDelete } from '@/main'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	UseInvalidateProp,
} from '@refinedev/core'
import { message } from 'antd'
import { UseCustomMutationParams } from '@/refine/types'

/**
 * 解除綁定項目的 Props
 * @interface TUnbindItemsProps
 * @property {string[]} product_ids   - 要解除綁定的商品 ID 陣列
 * @property {string[]} item_ids      - 要解除綁定的項目 ID 陣列
 * @property {string}   meta_key      - 解除綁定 API 的 meta_key
 * @property {Function} onSettled     - 解除綁定成功後的回調函數
 * @property {string}   [url]        - 解除綁定 API 的 url，預設為 `${apiUrl}/products/unbind-items`
 * @property {UseCustomMutationParams}                   useCustomMutationParams       -  API 參數
 * @property {string}   [label]       - 資源名稱
 * @property {Partial<UseInvalidateProp>}                       useInvalidateProp             - invalidate 參數
 */
type TUnbindItemsProps = {
	product_ids: string[] // 要綁在哪些商品上
	item_ids: string[] // 要解除綁定的項目 id
	meta_key: string // 綁定 API 的 meta_key
	onSettled?: () => void // 解除綁定成功後的 callback
	url?: string // 綁定 API 的 url 預設為 `${apiUrl}/products/unbind-items`
	useCustomMutationParams?: UseCustomMutationParams // 綁定 API，如果要改寫 values 或 headers 可以用
	label?: string // 資源名稱
	useInvalidateProp?: Partial<UseInvalidateProp> // invalidate 參數
}

const UnbindItemsComponent = ({
	url,
	product_ids,
	item_ids,
	meta_key,
	onSettled,
	useCustomMutationParams,
	label = '',
	useInvalidateProp,
}: TUnbindItemsProps) => {
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	// remove student mutation
	const { mutate, isLoading } = useCustomMutation()

	const handleRemove = () => {
		mutate(
			{
				url: url || `${apiUrl}/products/unbind-items`,
				method: 'post',
				values: {
					product_ids,
					item_ids,
					meta_key,
				},
				config: {
					headers: {
						'Content-Type': 'multipart/form-data;',
					},
				},
				...(useCustomMutationParams as any),
			},
			{
				onSuccess: () => {
					message.success({
						content: '解除綁定成功！',
						key: 'unbind-items',
					})
					invalidate({
						resource: 'products',
						invalidates: ['list'],
						...useInvalidateProp,
					})
				},
				onError: () => {
					message.error({
						content: '解除綁定失敗！',
						key: 'unbind-items',
					})
				},
				onSettled: () => {
					onSettled?.()
				},
			},
		)
	}

	return (
		<PopconfirmDelete
			type="button"
			popconfirmProps={{
				title: `確認解除這些商品的${label}綁定嗎?`,
				onConfirm: handleRemove,
			}}
			buttonProps={{
				children: '解除綁定',
				disabled: !product_ids.length || !item_ids.length,
				loading: isLoading,
			}}
		/>
	)
}

export const UnbindItems = memo(
	UnbindItemsComponent,
) as typeof UnbindItemsComponent
