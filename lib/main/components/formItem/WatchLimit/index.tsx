import React, { useEffect, memo, FC } from 'react'
import {
	Form,
	Radio,
	Space,
	InputNumber,
	Select,
	Input,
	Alert,
	RadioGroupProps,
	FormItemProps,
} from 'antd'
import { DatePicker } from '@/main/components/formItem'
import { useLink } from '@refinedev/core'
import { TLimitType } from '@/main/types'

const { Item } = Form

const WatchLimitComponent: FC<{
	formItemProps?: FormItemProps
	radioGroupProps?: RadioGroupProps
}> = ({ formItemProps, radioGroupProps }) => {
	const form = Form.useFormInstance()
	const watchLimitType: TLimitType = Form.useWatch(['limit_type'], form)

	const handleReset = (value: string) => {
		if ('unlimited' === value) {
			form.setFieldsValue({ limit_value: '', limit_unit: '' })
		}
		if ('fixed' === value) {
			form.setFieldsValue({ limit_value: 1, limit_unit: 'day' })
		}
		if ('assigned' === value) {
			form.setFieldsValue({
				limit_value: undefined,
				limit_unit: 'timestamp',
			})
		}
		if ('follow_subscription' === value) {
			form.setFieldsValue({ limit_value: '', limit_unit: '' })
		}
	}

	const watchProductType = Form.useWatch(['type'], form)

	useEffect(() => {
		if (
			watchProductType === 'simple' &&
			watchLimitType === 'follow_subscription'
		) {
			form.setFieldValue(['limit_type'], 'unlimited')
		}
	}, [watchProductType])

	const Link = useLink()
	return (
		<div>
			<Item
				label="觀看期限"
				name={['limit_type']}
				initialValue={'unlimited'}
				{...formItemProps}
			>
				<Radio.Group
					className="w-full w-avg"
					options={[
						{ label: '無期限', value: 'unlimited' },
						{ label: '固定天數', value: 'fixed' },
						{ label: '指定時間', value: 'assigned' },
						{
							label: '跟隨訂閱',
							value: 'follow_subscription',
							disabled: watchProductType === 'simple',
						},
					]}
					optionType="button"
					buttonStyle="solid"
					onChange={(e) => {
						const value = e?.target?.value || ''
						handleReset(value)
					}}
					{...radioGroupProps}
				/>
			</Item>
			{'unlimited' === watchLimitType && (
				<>
					<Item name={['limit_value']} initialValue="" hidden />
					<Item name={['limit_unit']} initialValue="" hidden />
				</>
			)}
			{'fixed' === watchLimitType && (
				<Space.Compact block>
					<Item name={['limit_value']} initialValue={1} className="w-full">
						<InputNumber className="w-full" min={1} />
					</Item>
					<Item name={['limit_unit']} initialValue="day">
						<Select
							options={[
								{ label: '日', value: 'day' },
								{ label: '月', value: 'month' },
								{ label: '年', value: 'year' },
							]}
							className="w-16"
						/>
					</Item>
				</Space.Compact>
			)}
			{'assigned' === watchLimitType && (
				<>
					<DatePicker
						formItemProps={{
							name: ['limit_value'],
							className: 'mb-0',
							rules: [
								{
									required: true,
									message: '請填寫指定時間',
								},
							],
						}}
					/>
					<Item name={['limit_unit']} initialValue="timestamp" hidden>
						<Input />
					</Item>
				</>
			)}
			{'follow_subscription' === watchLimitType && (
				<>
					<Alert
						className="my-4"
						message="注意事項"
						description={
							<ol className="pl-4">
								<li>選擇跟隨訂閱，課程就必須是訂閱商品</li>
								<li>
									你也可以選擇不跟隨訂閱，讓課程維持簡單商品，使用銷售方案創建定期定額銷售方案，再去
									<Link to="/products"> 課程權限綁定 </Link>
									調整課程觀看期限為跟隨訂閱
								</li>
							</ol>
						}
						type="warning"
						showIcon
					/>
					<Item name={['limit_value']} initialValue="" hidden />
					<Item name={['limit_unit']} initialValue="" hidden />
				</>
			)}
		</div>
	)
}

export const WatchLimit = memo(WatchLimitComponent)
