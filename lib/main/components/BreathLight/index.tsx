import { cn } from '@/main/utils'

type TBreathLightProps = {
	className?: string
}

export const BreathLight = ({
	className = 'at-bg-orange-400',
}: TBreathLightProps) => {
	return (
		<span
			className={cn(
				'at-flex at-relative at-size-3',
				className,
				'at-bg-transparent',
			)}
		>
			<span
				className={cn(
					'at-animate-ping at-absolute at-inline-flex at-rounded-full at-opacity-50 at-size-3',
					className,
				)}
			></span>
			<span
				className={cn(
					'at-relative at-inline-flex at-rounded-full at-size-3',
					className,
				)}
			></span>
		</span>
	)
}
