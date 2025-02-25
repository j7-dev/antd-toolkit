import React, { memo } from 'react'
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
 * 移除項目權限的 Props
 * @interface TRevokeUsersProps
 * @property {React.Key[]} user_ids - 要移除權限的用戶 ID 陣列
 * @property {string[]} item_ids - 要移除權限的項目 ID 陣列
 * @property {Function} onSettled - 移除成功後的回調函數
 * @property {string} [url] - API 的 url，預設為 `${apiUrl}/courses/remove-users`
 * @property {UseCustomMutationParams} [useCustomMutationParams] - API 參數
 * @property {string} [label] - 資源名稱
 * @property {Partial<UseInvalidateProp>} [useInvalidateProp] - invalidate 參數
 */
type TRevokeUsersProps = {
	user_ids: React.Key[]
	item_ids: string[]
	onSettled?: () => void
	url?: string
	useCustomMutationParams?: UseCustomMutationParams
	label?: string
	useInvalidateProp?: Partial<UseInvalidateProp>
}

const RevokeUsersComponent = ({
	user_ids,
	item_ids,
	onSettled,
	url,
	useCustomMutationParams,
	label = '',
	useInvalidateProp,
}: TRevokeUsersProps) => {
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	// remove student mutation
	const { mutate, isLoading } = useCustomMutation()

	const handleRemove = () => {
		mutate(
			{
				url: url || `${apiUrl}/limit/revoke-users`,
				method: 'post',
				values: {
					user_ids,
					item_ids,
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
						content: '撤銷用戶成功！',
						key: 'remove-users',
					})
					invalidate({
						resource: 'users',
						invalidates: ['list'],
						...useInvalidateProp,
					})
				},
				onError: () => {
					message.error({
						content: '撤銷用戶失敗！',
						key: 'remove-users',
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
				title: `確認移除這些用戶的${label}權限嗎?`,
				onConfirm: handleRemove,
			}}
			buttonProps={{
				children: `移除${label}`,
				disabled: !user_ids.length || !item_ids.length,
				loading: isLoading,
			}}
		/>
	)
}

export const RevokeUsers = memo(
	RevokeUsersComponent,
) as typeof RevokeUsersComponent
