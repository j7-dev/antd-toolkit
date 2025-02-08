import React, { memo, FC } from 'react'
import { Typography, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { TLimit, cn } from '@/main'

const { Text } = Typography

const LIMIT_UNIT_LABEL = {
	day: '日',
	month: '月',
	year: '年',
}

export type TBindItemsData = TLimit & { id: string; name: string }

/**
 * 顯示此商品已綁定項目的 props
 * @interface TProductBoundItemsProps
 * @property {TBindItemsData[]} bindItemsData - 綁定項目的資料陣列
 * @property {string}                                     [className]   - 自訂 CSS class
 * @property {boolean}                                    [hideName]    - 是否隱藏名稱
 */
export type TProductBoundItemsProps = {
	bindItemsData: TBindItemsData[]
	className?: string
	hideName?: boolean
}

const ProductBoundItemsComponent: FC<TProductBoundItemsProps> = ({
	bindItemsData,
	className,
	hideName = false,
}) => {
	return bindItemsData.map(
		({ id, name, limit_type, limit_value, limit_unit }) => {
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
							<Tooltip title={name || '未知的名稱'}>
								<span className="at-text-gray-400 at-text-xs">#{id}</span>
							</Tooltip>
						)}
						{!hideName && (
							<Text
								ellipsis={{
									tooltip: name || '未知的名稱',
								}}
							>
								<span className="at-text-gray-400 at-text-xs">#{id}</span>{' '}
								{name || '未知的名稱'}
							</Text>
						)}
					</div>

					<div>
						<Tag>{getLimitLabel(limit_type, limit_value, limit_unit)}</Tag>
					</div>
				</div>
			)
		},
	)
}

export const ProductBoundItems = memo(ProductBoundItemsComponent)

function getLimitLabel(
	limit_type: TLimit['limit_type'],
	limit_value: TLimit['limit_value'],
	limit_unit: TLimit['limit_unit'],
) {
	switch (limit_type) {
		case 'unlimited':
			return '無期限'
		case 'follow_subscription':
			return '跟隨訂閱'
		case 'fixed':
			return `訂單完成後 ${limit_value} ${LIMIT_UNIT_LABEL?.[limit_unit as keyof typeof LIMIT_UNIT_LABEL] || ''}`
		case 'assigned':
			return `至 ${dayjs.unix(limit_value as number).format('YYYY/MM/DD HH:mm')}`
	}
}
