import { FC, memo } from 'react'
import { Form, DatePicker, GetProps, FormItemProps } from 'antd'
import { parseRangePickerValue } from '@/main/utils'

const { Item } = Form
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const { RangePicker: AntdRangePicker } = DatePicker

const RangePickerComponent: FC<{
	formItemProps?: FormItemProps
	rangePickerProps?: RangePickerProps
}> = ({ formItemProps, rangePickerProps }) => {
	return (
		<Item
			getValueProps={(values) => ({
				value: parseRangePickerValue(values) as unknown as Record<
					string,
					unknown
				>,
			})}
			{...formItemProps}
		>
			<AntdRangePicker
				className="at-w-full"
				allowEmpty={[true, true]}
				format="YYYY-MM-DD HH:mm"
				placeholder={['開始日期', '結束日期']}
				showTime
				{...rangePickerProps}
			/>
		</Item>
	)
}

/**
 * 日期範圍選擇器
 */
export const RangePicker = memo(RangePickerComponent)
