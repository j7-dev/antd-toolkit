import React, { HTMLAttributes } from 'react'
import { cn } from '@/main/utils'

type LoadingCardProps = HTMLAttributes<HTMLDivElement>

export const LoadingCard: React.FC<LoadingCardProps> = ({
	children = 'LOADING...',
	className,
	...rest
}) => (
	<div
		className={cn(
			'at-aspect-video at-w-full at-bg-gray-200 at-animate-pulse at-rounded-lg at-relative at-mb-[10px] at-text-gray-500 at-flex at-items-center at-justify-center',
			className,
		)}
		{...rest}
	>
		{children}
	</div>
)
