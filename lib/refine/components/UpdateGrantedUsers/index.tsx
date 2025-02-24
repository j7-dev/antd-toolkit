import { useState, memo } from 'react'
import { Space, DatePicker, Button, message } from 'antd'
import { Dayjs } from 'dayjs'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	UseInvalidateProp,
} from '@refinedev/core'
import { UseCustomMutationParams } from '@/refine/types'

/**
 * 修改項目到期日期的 Props
 * @interface TUpdateGrantedUsersProps
 * @property {string[]} user_ids - 要修改的用戶 ID 陣列
 * @property {string[]} item_ids - 要修改的項目 ID 陣列
 * @property {Function} onSettled - 修改成功後的回調函數
 * @property {string} [url] - API 的 url，預設為 `${apiUrl}/courses/update-students`
 * @property {UseCustomMutationParams} [useCustomMutationParams] - API 參數
 * @property {Partial<UseInvalidateProp>} [useInvalidateProp] - invalidate 參數
 */
type TUpdateGrantedUsersProps = {
	user_ids: string[]
	item_ids: string[]
	onSettled?: () => void
	url?: string
	useCustomMutationParams?: UseCustomMutationParams
	useInvalidateProp?: Partial<UseInvalidateProp>
}

const UpdateGrantedUsersComponent = ({
	user_ids,
	item_ids,
	onSettled,
	url,
	useCustomMutationParams,
	useInvalidateProp,
}: TUpdateGrantedUsersProps) => {
	const [time, setTime] = useState<Dayjs | undefined>(undefined)
	const { mutate, isLoading } = useCustomMutation()
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	const handleUpdate = () => () => {
		mutate(
			{
				url: url || `${apiUrl}/limit/update-users`,
				method: 'post',
				values: {
					user_ids,
					item_ids,
					timestamp: time ? time?.unix() : 0,
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
						content: '批量修改觀看期限成功！',
						key: 'update-granted-users',
					})

					invalidate({
						resource: 'users',
						invalidates: ['list'],
						...useInvalidateProp,
					})
					setTime(undefined)
				},
				onError: () => {
					message.error({
						content: '批量修改觀看期限失敗！',
						key: 'update-granted-users',
					})
				},
				onSettled: () => {
					onSettled?.()
				},
			},
		)
	}

	return (
		<Space.Compact>
			<DatePicker
				value={time}
				showTime
				placeholder="留空為無期限"
				format="YYYY-MM-DD HH:mm"
				onChange={(value: Dayjs) => {
					setTime(value)
				}}
				disabled={isLoading}
			/>
			<Button
				type="primary"
				disabled={!user_ids.length || !item_ids.length}
				onClick={handleUpdate()}
				ghost
				loading={isLoading}
			>
				修改觀看期限
			</Button>
		</Space.Compact>
	)
}

export const UpdateGrantedUsers = memo(
	UpdateGrantedUsersComponent,
) as typeof UpdateGrantedUsersComponent
