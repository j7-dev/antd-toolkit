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
} from '@refinedev/core'
import { UseCustomMutationParams } from '@/refine/types'
import { useItemSelect } from '@/wp'

/**
 * 授予項目權限的 Props
 * @interface TGrantItemAccessProps
 * @property {string[]} user_ids - 要授予權限的用戶 ID 陣列
 * @property {string} meta_key - 授權 API 的 meta_key
 * @property {SelectProps} [selectProps] - Select 元件 props
 * @property {UseSelectProps<T, HttpError, T>} useSelectProps - 選擇資源的 API useSelectProps
 * @property {string} [url] - 授權 API 的 url，預設為 `${apiUrl}/courses/add-students`
 * @property {UseCustomMutationParams} [useCustomMutationParams] - API 參數
 * @property {string} [label] - 資源名稱
 */
type TGrantItemAccessProps<T> = {
	user_ids: string[] // 要綁在哪些商品上
	meta_key: string // 綁定 API 的 meta_key
	selectProps?: SelectProps // 選擇資源的 select props
	useSelectProps: UseSelectProps<T, HttpError, T> // 選擇資源的 API useSelectProps
	url?: string // 綁定 API 的 url 預設為 `${apiUrl}/products/bind-items`
	useCustomMutationParams?: UseCustomMutationParams // 綁定 API，如果要改寫 values 或 headers 可以用
	label?: string // 資源名稱
}

const GrantItemAccessComponent = <
	T extends BaseRecord & { name: string; id: string },
>({
	user_ids,
	meta_key,
	selectProps,
	useSelectProps,
	url,
	useCustomMutationParams,
	label = '',
}: TGrantItemAccessProps<T>) => {
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
				url: url || `${apiUrl}/courses/add-students`,
				method: 'post',
				values: {
					user_ids,
					item_ids,
					meta_key,
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
			{label && <label className="tw-block mb-2">{label}</label>}
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
					添加其他{label}
				</Button>
			</Space.Compact>
		</>
	)
}

export const GrantItemAccess = memo(
	GrantItemAccessComponent,
) as typeof GrantItemAccessComponent
