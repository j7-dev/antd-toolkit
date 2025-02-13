import React from 'react'
import { Tooltip, TooltipProps } from 'antd'
import { cn } from '@/main/utils'

export const BooleanIndicator: React.FC<{
	enabled: boolean
	className?: string
	tooltipProps?: TooltipProps & { enabled: boolean }
}> = ({ enabled, className, tooltipProps }) => {
	if (tooltipProps?.enabled) {
		return (
			<Tooltip {...tooltipProps}>
				<div
					className={cn(
						'at-size-3 at-rounded-full at-inline-block',
						{
							'at-bg-teal-500': enabled,
							'at-bg-rose-500': !enabled,
						},
						className,
					)}
				/>
			</Tooltip>
		)
	}

	return (
		<div
			className={cn(
				'at-size-3 at-rounded-full',
				{
					'at-bg-teal-500': enabled,
					'at-bg-rose-500': !enabled,
				},
				className,
			)}
		/>
	)
}
