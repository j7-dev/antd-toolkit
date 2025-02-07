import React, { useState } from 'react'
import { renderHTML, cn } from '@/main/utils'

export const ToggleContent: React.FC<{
	content: string
	className: string
}> = ({ content, className }) => {
	const [isExpand, setIsExpand] = useState(false)
	const html = renderHTML(content)

	const handleExpand = () => {
		setIsExpand(true)
	}

	const handleCollapsed = () => {
		setIsExpand(false)
	}

	return (
		<div
			className={cn(
				'at-relative at-w-full at-h-[20rem] at-overflow-hidden',
				className,
				{
					'at-h-full': isExpand,
				},
			)}
		>
			{html}
			{isExpand && (
				<div className="at-text-center at-w-full at-py-4 at-cursor-pointer">
					<span className="at-px-12" onClick={handleCollapsed}>
						收合全部
					</span>
				</div>
			)}
			{!isExpand && (
				<div className="at-absolute at-bottom-0 at-text-center at-w-full at-pb-4 at-pt-12 at-bg-gradient-to-t at-from-white at-to-white/0 at-cursor-pointer">
					<span className="at-px-12" onClick={handleExpand}>
						展開全部
					</span>
				</div>
			)}
		</div>
	)
}
