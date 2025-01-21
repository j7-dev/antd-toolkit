import { cn } from '@/main/utils'

type TBreathLightProps = {
	className?: string
}

export const BreathLight = ({
	className = 'w-3 h-3 bg-orange-400',
}: TBreathLightProps) => {
	return (
		<span className={cn('flex relative w-3 h-3', className, 'bg-transparent')}>
			<span
				className={cn(
					'animate-ping absolute inline-flex h-full w-full rounded-full opacity-50',
					className,
				)}
			></span>
			<span
				className={cn('relative inline-flex rounded-full w-3 h-3', className)}
			></span>
		</span>
	)
}
