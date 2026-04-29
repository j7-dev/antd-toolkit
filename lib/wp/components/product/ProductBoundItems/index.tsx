import { memo, FC } from 'react'
import { Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { TLimit, cn, NameId } from '@/main'
import { useLocale } from '@/main/components/LocaleProvider'
import type { TLocale } from '@/main/locales/types'

export type TBoundItemData = TLimit & { id: string; name: string }

/**
 * 顯示此商品已綁定項目的 props
 * @interface TProductBoundItemsProps
 * @property {TBoundItemData[]} items - 綁定項目的資料陣列
 * @property {string}                                     [className]   - 自訂 CSS class
 * @property {boolean}                                    [hideName]    - 是否隱藏名稱
 */
export type TProductBoundItemsProps = {
	items: TBoundItemData[]
	className?: string
	hideName?: boolean
}

const ProductBoundItemsComponent: FC<TProductBoundItemsProps> = ({
	items,
	className,
	hideName = false,
}) => {
	const t = useLocale('ProductBoundItems')

	return items.map(({ id, name, limit_type, limit_value, limit_unit }) => {
		return (
			<div
				key={id}
				className={cn(
					'at-grid at-grid-cols-[12rem_8rem] at-gap-1 at-my-1',
					className,
				)}
			>
				<div>
					{hideName && (
						<Tooltip title={name || t.unknownName}>
							<span className="at-text-gray-400 at-text-xs">#{id}</span>
						</Tooltip>
					)}
					{!hideName && (
						<NameId name={name || t.unknownName} id={id} tooltipProps={{}} />
					)}
				</div>

				<div>
					<Tag>{getLimitLabel(limit_type, limit_value, limit_unit, t)}</Tag>
				</div>
			</div>
		)
	})
}

export const ProductBoundItems = memo(ProductBoundItemsComponent)

function getLimitLabel(
	limit_type: TLimit['limit_type'],
	limit_value: TLimit['limit_value'],
	limit_unit: TLimit['limit_unit'],
	t: TLocale['ProductBoundItems'],
) {
	const LIMIT_UNIT_LABEL = {
		day: t.day,
		month: t.month,
		year: t.year,
	}

	switch (limit_type) {
		case 'unlimited':
			return t.unlimited
		case 'follow_subscription':
			return t.followSubscription
		case 'fixed':
			return `${t.afterOrderComplete} ${limit_value} ${LIMIT_UNIT_LABEL?.[limit_unit as keyof typeof LIMIT_UNIT_LABEL] || ''}`
		case 'assigned':
			return `${t.until} ${dayjs.unix(limit_value as number).format('YYYY/MM/DD HH:mm')}`
	}
}
