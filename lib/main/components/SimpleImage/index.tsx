import { memo, FC, HTMLAttributes, ReactNode } from 'react'
import { cn, defaultImage } from '@/main/utils'

type SimpleImageProps = {
	render?: ReactNode
	src: string
	className?: string
	ratio?: string
	loadingClassName?: string
} & HTMLAttributes<HTMLDivElement>

const SimpleImageComponent: FC<SimpleImageProps> = ({
	render,
	className = 'w-full',
	ratio = 'aspect-video',
	src = defaultImage,
	loadingClassName = 'text-xl text-gray-500 font-bold',
	...rest
}) => {
	return (
		<div className={cn('at-relative', className, ratio)} {...rest}>
			{render ? (
				render
			) : (
				<img
					src={src}
					loading="lazy"
					className={`at-relative at-z-20 at-w-full ${ratio} at-object-cover`}
				/>
			)}
			<div
				className={`at-absolute at-z-10 at-top-0 at-left-0 at-w-full ${ratio} at-bg-gray-200 at-animate-pulse at-flex at-items-center at-justify-center ${loadingClassName}`}
			>
				LOADING...
			</div>
		</div>
	)
}

export const SimpleImage = memo(SimpleImageComponent)
