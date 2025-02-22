import { memo, useState } from 'react'
import { Select, Button, Space, DatePicker, message, SelectProps } from 'antd'
import { Dayjs } from 'dayjs'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	HttpError,
	UseSelectProps,
	BaseRecord,
	UseInvalidateProp,
} from '@refinedev/core'
import { UseCustomMutationParams } from '@/refine/types'
import { useItemSelect } from '@/wp'

/**
 * 授予項目權限的 Props
 * @interface TGrantUsersProps
 * @property {string[]} user_ids - 要授予權限的用戶 ID 陣列
 * @property {SelectProps} [selectProps] - Select 元件 props
 * @property {UseSelectProps<T, HttpError, T>} useSelectProps - 選擇資源的 API useSelectProps
 * @property {string} [url] - 授權 API 的 url，預設為 `${apiUrl}/courses/add-students`
 * @property {UseCustomMutationParams} [useCustomMutationParams] - API 參數
 * @property {string} [label] - 資源名稱
 * @property {boolean} [hideLabel] - 是否隱藏 label
 * @property {UseInvalidateProp} [useInvalidateProp] - invalidate 參數
 */
type TGrantUsersProps<T> = {
	user_ids: string[] // 要綁在哪些商品上
	selectProps?: SelectProps // 選擇資源的 select props
	useSelectProps: UseSelectProps<T, HttpError, T> // 選擇資源的 API useSelectProps
	url?: string // 綁定 API 的 url 預設為 `${apiUrl}/products/bind-items`
	useCustomMutationParams?: UseCustomMutationParams // 綁定 API，如果要改寫 values 或 headers 可以用
	label?: string // 資源名稱
	hideLabel?: boolean // 是否隱藏 label
	useInvalidateProp?: UseInvalidateProp // invalidate 參數
}

const GrantUsersComponent = <
	T extends BaseRecord & { name: string; id: string },
>({
	user_ids,
	selectProps,
	useSelectProps,
	url,
	useCustomMutationParams,
	label = '',
	hideLabel = false,
	useInvalidateProp,
}: TGrantUsersProps<T>) => {
	const { selectProps: selectResourceProps, itemIds: item_ids } =
		useItemSelect<T>({
			selectProps,
			useSelectProps,
		})

	const [time, setTime] = useState<Dayjs | undefined>(undefined)

	const { mutate, isLoading } = useCustomMutation()
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	const handleClick = () => {
		mutate(
			{
				url: url || `${apiUrl}/limit/grant-users`,
				method: 'post',
				values: {
					user_ids,
					item_ids,
					expire_date: time ? time.unix() : 0,
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
						content: `新增用戶成功！`,
						key: 'add-users',
					})
					invalidate({
						resource: 'users',
						invalidates: ['list'],
						...useInvalidateProp,
					})
				},
				onError: () => {
					message.error({
						content: '新增用戶失敗！',
						key: 'add-users',
					})
				},
			},
		)
	}

	return (
		<>
			{!hideLabel && <label className="tw-block mb-2">{label}</label>}
			<Space.Compact className="w-full">
				<Select {...selectResourceProps} />
				<DatePicker
					placeholder="留空為無期限"
					value={time}
					showTime
					format="YYYY-MM-DD HH:mm"
					onChange={(value: Dayjs) => {
						setTime(value)
					}}
				/>
				<Button
					type="primary"
					loading={isLoading}
					disabled={!user_ids.length || !item_ids.length}
					onClick={handleClick}
				>
					{label}
				</Button>
			</Space.Compact>
		</>
	)
}

export const GrantUsers = memo(
	GrantUsersComponent,
) as typeof GrantUsersComponent
