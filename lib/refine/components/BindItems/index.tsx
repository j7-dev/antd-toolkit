import { memo } from 'react'
import { Select, Button, Space, message, Form, SelectProps } from 'antd'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	UseSelectProps,
	HttpError,
	BaseRecord,
	UseInvalidateProp,
} from '@refinedev/core'
import { useItemSelect } from '@/wp'
import { TLimit } from '@/main'
import { UseCustomMutationParams } from '@/refine/types'

/**
 * 通用的綁定項目元件
 * 可以把項目的使用期限綁定在商品上
 * @interface TBindItemsProps
 * @property {string[]}                                                  product_ids                   - 要綁定的商品 ID 陣列
 * @property {string}                                                    meta_key                      - 綁定 API 的 meta_key
 * @property {UseSelectProps<TDocBaseRecord, HttpError, TDocBaseRecord>} useSelectProps                - 選擇資源 API props
 * @property {string}                                                    url                           - 綁定 API 的 url 預設為 `${apiUrl}/products/bind-items`
 * @property {SelectProps}                                               [selectProps]                 - Select 元件 props
 * @property {UseCustomMutationParams}                   useCustomMutationParams       - 綁定 API 參數
 * @property {string}                                                    [label]                       - 資源名稱
 * @property {UseInvalidateProp}                       useInvalidateProp             - invalidate 參數
 */
type TBindItemsProps<T> = {
	product_ids: string[] // 要綁在哪些商品上
	meta_key: string // 綁定 API 的 meta_key
	useSelectProps: UseSelectProps<T, HttpError, T> // 選擇資源的 API useSelectProps
	url?: string // 綁定 API 的 url 預設為 `${apiUrl}/products/bind-items`
	selectProps?: SelectProps // 選擇資源的 select props
	useCustomMutationParams?: UseCustomMutationParams // 綁定 API，如果要改寫 values 或 headers 可以用
	label?: string // 資源名稱
	useInvalidateProp?: UseInvalidateProp // invalidate 參數
}

const BindItemsComponent = <
	T extends BaseRecord & { name: string; id: string },
>({
	product_ids,
	meta_key,
	useSelectProps,
	selectProps,
	url,
	useCustomMutationParams,
	label = '',
	useInvalidateProp,
}: TBindItemsProps<T>) => {
	const { selectProps: selectResourceProps, itemIds: item_ids } =
		useItemSelect<T>({
			selectProps,
			useSelectProps,
		})

	const { mutate, isLoading } = useCustomMutation()
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()
	const form = Form.useFormInstance<TLimit>()
	const resource = useSelectProps.resource

	const handleClick = () => {
		const { limit_type, limit_value, limit_unit } = form.getFieldsValue()
		mutate(
			{
				url: url || `${apiUrl}/products/bind-items`,
				method: 'post',
				values: {
					product_ids,
					item_ids,
					meta_key,
					limit_type,
					limit_value,
					limit_unit,
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
						content: `綁定${label}成功！`,
						key: `bind-${resource}`,
					})
					invalidate({
						resource: 'products',
						invalidates: ['list'],
						...useInvalidateProp,
					})
				},
				onError: () => {
					message.error({
						content: `綁定${label}失敗！`,
						key: `bind-${resource}`,
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
				<Button
					type="primary"
					loading={isLoading}
					disabled={!product_ids.length || !item_ids.length}
					onClick={handleClick}
				>
					綁定其他{label}
				</Button>
			</Space.Compact>
		</>
	)
}

export const BindItems = memo(BindItemsComponent) as typeof BindItemsComponent
