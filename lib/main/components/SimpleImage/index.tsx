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
		<div className={cn('relative', className, ratio)} {...rest}>
			{render ? (
				render
			) : (
				<img
					src={src}
					loading="lazy"
					className={`relative z-20 w-full ${ratio} object-cover`}
				/>
			)}
			<div
				className={`absolute z-10 top-0 left-0 w-full ${ratio} bg-gray-200 animate-pulse flex items-center justify-center ${loadingClassName}`}
			>
				LOADING...
			</div>
		</div>
	)
}

export const SimpleImage = memo(SimpleImageComponent)
