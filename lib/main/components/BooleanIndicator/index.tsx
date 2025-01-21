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
						'w-3 h-3 rounded-full inline-block',
						{
							'bg-teal-500': enabled,
							'bg-rose-500': !enabled,
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
				'w-3 h-3 rounded-full',
				{
					'bg-teal-500': enabled,
					'bg-rose-500': !enabled,
				},
				className,
			)}
		/>
	)
}
