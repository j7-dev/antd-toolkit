import { FC } from 'react'

export const SecondToStr: FC<{
	className?: string
	second: number
}> = ({ className = 'text-gray-400 text-xs', second }) => {
	if (!second) return <div className={className}>-- 時 -- 分 -- 秒</div>

	const hours = Math.floor(second / 60 / 60)
	const minutes = Math.floor((second / 60) % 60)
	const seconds = Math.floor(second % 60)

	return (
		<div className={className}>
			{`${hours > 99 ? hours : hours.toString().padStart(2, '0')} 時 ${minutes.toString().padStart(2, '0')} 分 ${seconds.toString().padStart(2, '0')} 秒`}
		</div>
	)
}
