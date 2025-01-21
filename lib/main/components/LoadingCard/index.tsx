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
			'aspect-video bg-gray-200 animate-pulse rounded-lg py-[21px] pl-[28px] pr-6 relative mb-[10px] text-gray-500 flex items-center justify-center',
			className,
		)}
		{...rest}
	>
		{children}
	</div>
)
