import { memo } from 'react'
import { Button, message, Form } from 'antd'
import { useCustomMutation, useApiUrl, useInvalidate } from '@refinedev/core'
import { TLimit } from '@/main'

/**
 * 批量修改綁定項目的 Props
 * @interface TUpdateBoundItemsProps
 * @property {string}   [url]        - 修改綁定 API 的 url，預設為 `${apiUrl}/products/update-bound-items`
 * @property {string[]} product_ids   - 要修改的商品 ID 陣列
 * @property {string[]} item_ids      - 要修改的項目 ID 陣列
 * @property {Function} onSettled     - 修改成功後的回調函數
 * @property {string}   [label]       - 資源名稱
 */
type TUpdateBoundItemsProps = {
	url?: string // 綁定 API 的 url 預設為 `${apiUrl}/products/update-bound-items`
	product_ids: string[] // 要綁在哪些商品上
	item_ids: string[] // 要綁定的項目 id
	onSettled: () => void // 綁定成功後的 callback
	label?: string // 資源名稱
}

const UpdateBoundItemsComponent = ({
	url,
	product_ids,
	item_ids,
	onSettled,
}: TUpdateBoundItemsProps) => {
	const { mutate, isLoading } = useCustomMutation()
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()
	const form = Form.useFormInstance()

	const handleUpdate = () => () => {
		const values: TLimit = form.getFieldsValue()
		mutate(
			{
				url: url || `${apiUrl}/products/update-bound-items`,
				method: 'post',
				values: {
					product_ids,
					item_ids,
					...values,
				},
				config: {
					headers: {
						'Content-Type': 'multipart/form-data;',
					},
				},
			},
			{
				onSuccess: () => {
					message.success({
						content: '批量修改觀看期限成功！',
						key: 'update-bound-items',
					})
					invalidate({
						resource: 'products',
						invalidates: ['list'],
					})
				},
				onError: () => {
					message.error({
						content: '批量修改觀看期限失敗！',
						key: 'update-bound-items',
					})
				},
				onSettled: () => {
					onSettled()
				},
			},
		)
	}

	return (
		<Button
			type="primary"
			disabled={!product_ids.length || !item_ids.length}
			onClick={handleUpdate()}
			ghost
			loading={isLoading}
		>
			修改觀看期限
		</Button>
	)
}

export const UpdateBoundItems = memo(
	UpdateBoundItemsComponent,
) as typeof UpdateBoundItemsComponent
