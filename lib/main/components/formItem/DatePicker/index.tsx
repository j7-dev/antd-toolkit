import { FC, memo } from 'react'
import {
	Form,
	DatePicker as AntdDatePicker,
	DatePickerProps,
	FormItemProps,
} from 'antd'
import { parseDatePickerValue } from '@/main/utils'
import dayjs from 'dayjs'

const { Item } = Form

const DatePickerComponent: FC<{
	formItemProps?: FormItemProps
	datePickerProps?: DatePickerProps
}> = ({ formItemProps, datePickerProps }) => {
	return (
		<Item
			getValueProps={(value) => ({
				value: parseDatePickerValue(value) as unknown as Record<
					string,
					unknown
				>,
			})}
			normalize={(value) => value?.unix()}
			{...formItemProps}
		>
			<AntdDatePicker
				placeholder="選擇日期"
				className="w-full"
				showTime={{ defaultValue: dayjs() }}
				format="YYYY-MM-DD HH:mm"
				{...datePickerProps}
			/>
		</Item>
	)
}

/**
 * 日期選擇器
 */
export const DatePicker = memo(DatePickerComponent)
