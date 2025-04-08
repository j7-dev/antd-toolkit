import { memo } from 'react'
import { Tooltip, TooltipProps } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { round } from 'lodash-es'

const TrendIndicatorComponent = ({
	tooltipProps,
	value,
	compareValue,
}: {
	tooltipProps: TooltipProps
	value: number
	compareValue: number
}) => {
	const isGreater = value >= compareValue
	const percentage = compareValue
		? round(((value - compareValue) / compareValue) * 100, 2)
		: '∞'

	return (
		<Tooltip {...tooltipProps}>
			<span
				className={`at-inline-flex at-items-center at-mr-2 at-gap-x-1 ${isGreater ? 'at-text-red-500' : 'at-text-green-500'}`}
			>
				{isGreater ? <CaretUpOutlined /> : <CaretDownOutlined />}
				{percentage}%
			</span>
		</Tooltip>
	)
}

export const TrendIndicator = memo(TrendIndicatorComponent)
