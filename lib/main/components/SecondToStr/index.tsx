import { FC } from 'react'
import { useLocale } from '@/main/components/LocaleProvider'

// TODO 提供 format 參數，自動轉換並自動格式化
export const SecondToStr: FC<{
	className?: string
	second: number
}> = ({ className = 'at-text-gray-400 at-text-xs', second }) => {
	const t = useLocale('SecondToStr')

	if (!second) return <div className={className}>{t.empty}</div>

	const hours = Math.floor(second / 60 / 60)
	const minutes = Math.floor((second / 60) % 60)
	const seconds = Math.floor(second % 60)

	return (
		<div className={className}>
			{`${hours > 99 ? hours : hours.toString().padStart(2, '0')} ${t.hour} ${minutes.toString().padStart(2, '0')} ${t.minute} ${seconds.toString().padStart(2, '0')} ${t.second}`}
		</div>
	)
}
