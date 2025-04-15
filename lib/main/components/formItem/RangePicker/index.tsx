import { FC, memo } from 'react'
import { Form, DatePicker, GetProps, FormItemProps } from 'antd'
import { parseRangePickerValue } from '@/main/utils'

const { Item } = Form
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const { RangePicker: AntdRangePicker } = DatePicker

/**
 * 日期範圍選擇器元件
 * 預設為後端傳入 [timestamp, timestamp] 格式，前端接收 [Dayjs, Dayjs] 格式
 * 此元件封裝了 Ant Design 的 RangePicker，提供日期範圍選擇功能
 *
 * @component
 * @param {Object} props - 元件屬性
 * @param {FormItemProps} [props.formItemProps] - Form.Item 的屬性
 * @param {RangePickerProps} [props.rangePickerProps] - DatePicker.RangePicker 的屬性
 * @returns {JSX.Element} 日期範圍選擇器表單項
 *
 * @example
 * // 基本用法
 * <RangePicker
 *   formItemProps={{ name: 'sale_date_range', label: '期間' }}
 *   rangePickerProps={{ size: 'small', }}
 * />
 */

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
