import { TGetColumnFilterProps } from '@/main/types'
import { PaginationProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

export * from './constants'

export const getColumnFilterProps = <
	DataType extends {
		[key: string]: string | number | boolean | null
	},
>({
	dataSource,
	dataIndex,
	dataFrom = 'local',
	exactMatch = false,
}: TGetColumnFilterProps<DataType>) => {
	const filters =
		dataFrom === 'local'
			? dataSource.map((d) => ({
					text: d.label,
					value: (d?.value || '').toString(),
				}))
			: dataSource.map((d) => ({
					text: (d as DataType)?.[dataIndex] || '',
					value: ((d as DataType)?.[dataIndex] || '').toString(),
				}))
	const onFilter = (value: string | number | boolean, record: DataType) => {
		switch (typeof record[dataIndex]) {
			case 'string':
				return exactMatch
					? ((record?.[dataIndex] || '') as string) === (value as string)
					: ((record?.[dataIndex] || '') as string).indexOf(value as string) ===
							0
			case 'number':
				return exactMatch
					? (record?.[dataIndex] || '').toString() === (value as string)
					: (record?.[dataIndex] || '').toString().indexOf(value as string) ===
							0
			case 'boolean':
				return (record?.[dataIndex] || '').toString() === value

			default:
				return false
		}
	}

	return {
		filters,
		onFilter,
	}
}

export const getDefaultPaginationProps = ({
	label = '商品',
}: {
	label?: string
}): PaginationProps & {
	position: [
		| 'topLeft'
		| 'topCenter'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomCenter'
		| 'bottomRight',
	]
} => ({
	position: ['bottomCenter'],
	size: 'default',
	showSizeChanger: true,
	showQuickJumper: true,
	showTitle: true,
	showTotal: (total: number, range: [number, number]) =>
		`目前顯示第 ${range?.[0]} ~ ${range?.[1]} 個 ${label}，總共有 ${total} 個 ${label}`,
})

/**
 * 處理日期欄位 sale_date_range
 * 將表單中的 date Range
 * 轉換成個別的 開始、結束 property
 * 例如
 * 表單中的 sale_date_range 是 [null, null]
 * 轉換成 { date_on_sale_from: null, date_on_sale_to: null }
 * @param values
 * @param fromProperty
 * @param toProperty

 * @return
 */
export const formatDateRangeData = (
	values: {
		[key: string]: any
	},
	fromProperty: string,
	toProperty: [string, string],
) => {
	const sale_date_range = values?.[fromProperty] || [null, null]

	// 處理日期欄位 sale_date_range

	const date_on_sale_from = dayjs.isDayjs(sale_date_range[0])
		? (sale_date_range[0] as Dayjs).unix()
		: sale_date_range[0]
	const date_on_sale_to = dayjs.isDayjs(sale_date_range[1])
		? (sale_date_range[1] as Dayjs).unix()
		: sale_date_range[1]

	const toPropertyFrom = toProperty[0]
	const toPropertyTo = toProperty[1]

	const formattedValues = {
		...values,
		[toPropertyFrom]: date_on_sale_from,
		[toPropertyTo]: date_on_sale_to,
		sale_date_range: undefined,
	}

	return formattedValues
}
