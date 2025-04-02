import { memo } from 'react'
import { TProductStockStatus } from '@/wp/types'
import { Tag } from 'antd'
import {
	FieldTimeOutlined,
	QuestionCircleOutlined,
	WarningOutlined,
	CloseCircleFilled,
	CheckCircleFilled,
} from '@ant-design/icons'

type TBaseRecord = {
	stock_status: TProductStockStatus
	stock_quantity: number | null
	low_stock_amount: number | null
}

type TProductStockProps<T extends TBaseRecord> = {
	record: T
	type?: 'text' | 'tag'
}

const ProductStockComponent = <T extends TBaseRecord>({
	record,
	type = 'text',
}: TProductStockProps<T>) => {
	const { stock_status, stock_quantity, low_stock_amount = 0 } = record

	if (!stock_status) return null

	const { label, color, Icon } = getTagProps(
		stock_status,
		stock_quantity,
		low_stock_amount,
	)

	if (type === 'tag') {
		return (
			<Tag bordered={false} className={`at-m-0 ${color}`} icon={<Icon />}>
				{label}
				{Number.isInteger(stock_quantity) && <> ({stock_quantity})</>}
			</Tag>
		)
	}

	return (
		<p className="at-m-0 at-text-gray-500 at-text-xs">
			<Icon className={`at-mr-2 ${color}`} />
			{label}
			{Number.isInteger(stock_quantity) && <> ({stock_quantity})</>}
		</p>
	)
}

export const ProductStock = memo(
	ProductStockComponent,
) as typeof ProductStockComponent

function getTagProps(
	stock_status: TProductStockStatus,
	stock_quantity: number | null,
	low_stock_amount: number | null,
) {
	switch (stock_status) {
		case 'instock':
			if (stock_quantity === null || low_stock_amount === null) {
				return {
					label: '尚有庫存',
					color: 'text-green-500',
					Icon: ({ ...props }) => <CheckCircleFilled {...props} />,
				}
			}
			return stock_quantity > low_stock_amount
				? {
						label: '庫存充足',
						color: 'text-green-500',
						Icon: ({ ...props }) => <CheckCircleFilled {...props} />,
					}
				: {
						label: '低庫存',
						color: 'text-orange-500',
						Icon: ({ ...props }) => <WarningOutlined {...props} />,
					}
		case 'outofstock':
			return {
				label: '缺貨中',
				color: 'text-red-500',
				Icon: ({ ...props }) => <CloseCircleFilled {...props} />,
			}
		case 'onbackorder':
			return {
				label: '延期交貨(預購)',
				color: 'text-purple-500',
				Icon: ({ ...props }) => <FieldTimeOutlined {...props} />,
			}
		default:
			return {
				label: '庫存狀態未知',
				color: 'text-gray-500',
				Icon: ({ ...props }) => <QuestionCircleOutlined {...props} />,
			}
	}
}
