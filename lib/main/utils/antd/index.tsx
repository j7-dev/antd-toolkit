import { TGetColumnFilterProps } from '@/main/types'
import { PaginationProps } from 'antd'
import { TTerm } from '@/wp/types'

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

export const termToOptions = (terms: TTerm[]) => {
	return terms?.map((term) => ({
		value: term.id,
		label: term.name,
	}))
}
