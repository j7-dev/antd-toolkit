import { memo, FC } from 'react'
import {
	Form,
	Radio,
	Space,
	InputNumber,
	Select,
	RadioGroupProps,
	FormItemProps,
} from 'antd'
import { DatePicker } from '@/main/components/formItem'
import { TLimitType } from '@/main/types'
import { NamePath } from 'antd/es/form/interface'
import { useLocale } from '@/main/components/LocaleProvider'

const { Item } = Form

const LimitComponent: FC<{
	formItemProps?: Omit<FormItemProps, 'name'>
	radioGroupProps?: RadioGroupProps
	limitTypeName?: NamePath<string>
	limitValueName?: NamePath<string>
	limitUnitName?: NamePath<string>
}> = ({
	formItemProps,
	radioGroupProps,
	limitTypeName: LIMIT_TYPE = ['limit_type'],
	limitValueName: LIMIT_VALUE = ['limit_value'],
	limitUnitName: LIMIT_UNIT = ['limit_unit'],
}) => {
	const form = Form.useFormInstance()
	const watchLimitType: TLimitType = Form.useWatch(LIMIT_TYPE, form)
	const t = useLocale('Limit')

	const handleReset = (value: string) => {
		if ('unlimited' === value) {
			form.setFieldValue(LIMIT_VALUE, '')
			form.setFieldValue(LIMIT_UNIT, '')
		}
		if ('fixed' === value) {
			form.setFieldValue(LIMIT_VALUE, 1)
			form.setFieldValue(LIMIT_UNIT, 'day')
		}
		if ('assigned' === value) {
			form.setFieldValue(LIMIT_VALUE, undefined)
			form.setFieldValue(LIMIT_UNIT, 'timestamp')
		}

		if ('follow_subscription' === value) {
			form.setFieldValue(LIMIT_VALUE, '')
			form.setFieldValue(LIMIT_UNIT, '')
		}
	}

	return (
		<div style={{ contain: 'layout paint style' }}>
			<Item
				label={t.label}
				initialValue={'unlimited'}
				{...formItemProps}
				name={LIMIT_TYPE}
			>
				<Radio.Group
					className="at-w-full w-avg"
					options={[
						{ label: t.unlimited, value: 'unlimited' },
						{ label: t.fixedDays, value: 'fixed' },
						{ label: t.specifiedTime, value: 'assigned' },
						{
							label: t.followSubscription,
							value: 'follow_subscription',
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
					<Item name={LIMIT_VALUE} initialValue="" hidden />
					<Item name={LIMIT_UNIT} initialValue="" hidden />
				</>
			)}
			{'fixed' === watchLimitType && (
				<Space.Compact block>
					<Item name={LIMIT_VALUE} initialValue={1} className="at-w-full">
						<InputNumber className="at-w-full" min={1} />
					</Item>

					<Item name={LIMIT_UNIT} initialValue="day">
						<Select
							options={[
								{ label: t.day, value: 'day' },
								{ label: t.month, value: 'month' },
								{ label: t.year, value: 'year' },
							]}
							className="at-w-16"
						/>
					</Item>
				</Space.Compact>
			)}
			{'assigned' === watchLimitType && (
				<>
					<DatePicker
						formItemProps={{
							name: LIMIT_VALUE,
							className: 'at-mb-0',
							rules: [
								{
									required: true,
									message: t.specifiedTimeRequired,
								},
							],
						}}
					/>
					<Item name={LIMIT_UNIT} initialValue="timestamp" hidden />
				</>
			)}
			{'follow_subscription' === watchLimitType && (
				<>
					<Item name={LIMIT_VALUE} initialValue="" hidden />
					<Item name={LIMIT_UNIT} initialValue="" hidden />
				</>
			)}
		</div>
	)
}

export const Limit = memo(LimitComponent)
