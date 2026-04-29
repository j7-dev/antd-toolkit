import { memo } from 'react'
import { Badge, Tooltip } from 'antd'
import { useLocale } from '@/main/components/LocaleProvider'
import type { TLocale } from '@/main/locales/types'

const COLOR_GRADE = {
	'tier-5': '#ffccc7',
	'tier-4': '#ffa39e',
	'tier-3': '#ff7875',
	'tier-2': '#ff4d4f',
	'tier-1': '#f5222d',
}

type TBaseRecord = {
	total_sales: number
}

type TProductTotalSalesProps<T extends TBaseRecord> = {
	record: T
	max_sales: number
}

const ProductTotalSalesComponent = <T extends TBaseRecord>({
	record,
	max_sales,
}: TProductTotalSalesProps<T>) => {
	const t = useLocale('ProductTotalSales')
	const { total_sales } = record
	if (total_sales === undefined) return null
	const { color, label } = get_tier(total_sales, max_sales, t)

	return (
		<Tooltip zIndex={1000000 + 20} title={label}>
			<Badge count={total_sales} color={color} showZero />
		</Tooltip>
	)
}

export const ProductTotalSales = memo(
	ProductTotalSalesComponent,
) as typeof ProductTotalSalesComponent

function get_tier(
	total_sales: number,
	max_sales: number,
	t: TLocale['ProductTotalSales'],
) {
	if (total_sales > max_sales * 0.8 || max_sales === 0) {
		return {
			color: COLOR_GRADE['tier-1'],
			tier: 'tier-1',
			label: t.top20,
		}
	} else if (total_sales > max_sales * 0.6) {
		return {
			color: COLOR_GRADE['tier-2'],
			tier: 'tier-2',
			label: t.top40,
		}
	} else if (total_sales > max_sales * 0.4) {
		return {
			color: COLOR_GRADE['tier-3'],
			tier: 'tier-3',
			label: t.top60,
		}
	} else if (total_sales > max_sales * 0.2) {
		return {
			color: COLOR_GRADE['tier-4'],
			tier: 'tier-4',
			label: t.top80,
		}
	}
	return {
		color: COLOR_GRADE['tier-5'],
		tier: 'tier-5',
		label: t.top100,
	}
}
