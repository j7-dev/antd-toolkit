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
import { useLocale } from '@/main/components/LocaleProvider'

type TBaseRecord = {
	stock_status: TProductStockStatus
	stock_quantity: number | null
	low_stock_amount: number | null
}

type TProductStockProps<T extends TBaseRecord> = {
	record: T
	type?: 'text' | 'tag'
}

type TStockLabels = {
	inStock: string
	stockSufficient: string
	lowStock: string
	outOfStock: string
	onBackorder: string
	unknownStatus: string
}

const ProductStockComponent = <T extends TBaseRecord>({
	record,
	type = 'text',
}: TProductStockProps<T>) => {
	const t = useLocale('ProductStock')
	const { stock_status, stock_quantity, low_stock_amount = 0 } = record

	if (!stock_status) return null

	const { label, color, Icon } = getTagProps(
		stock_status,
		stock_quantity,
		low_stock_amount,
		t,
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
	t: TStockLabels,
) {
	switch (stock_status) {
		case 'instock':
			if (stock_quantity === null || low_stock_amount === null) {
				return {
					label: t.inStock,
					color: 'text-green-500',
					Icon: ({ ...props }) => <CheckCircleFilled {...props} />,
				}
			}
			return stock_quantity > low_stock_amount
				? {
						label: t.stockSufficient,
						color: 'text-green-500',
						Icon: ({ ...props }) => <CheckCircleFilled {...props} />,
					}
				: {
						label: t.lowStock,
						color: 'text-orange-500',
						Icon: ({ ...props }) => <WarningOutlined {...props} />,
					}
		case 'outofstock':
			return {
				label: t.outOfStock,
				color: 'text-red-500',
				Icon: ({ ...props }) => <CloseCircleFilled {...props} />,
			}
		case 'onbackorder':
			return {
				label: t.onBackorder,
				color: 'text-purple-500',
				Icon: ({ ...props }) => <FieldTimeOutlined {...props} />,
			}
		default:
			return {
				label: t.unknownStatus,
				color: 'text-gray-500',
				Icon: ({ ...props }) => <QuestionCircleOutlined {...props} />,
			}
	}
}
