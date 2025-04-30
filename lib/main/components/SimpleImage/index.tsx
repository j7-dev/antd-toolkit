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
	ratio = 'at-aspect-video',
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
					className={`at-relative at-z-10 at-w-full ${ratio} at-object-cover`}
				/>
			)}
			<div
				className={`at-absolute at-z-[5] at-top-0 at-left-0 at-w-full ${ratio} at-bg-gray-200 at-animate-pulse at-flex at-items-center at-justify-center ${loadingClassName}`}
			>
				LOADING...
			</div>
		</div>
	)
}

/**
 * SimpleImage 組件
 *
 * @description 一個簡單的圖片顯示組件，支持懶加載和加載中的動畫效果
 *
 * @param {ReactNode} render - 自定義渲染內容，如果提供則替代默認的圖片顯示
 * @param {string} className - 容器的 CSS 類名
 * @param {string} ratio - 圖片比例的 CSS 類名，默認為 'at-aspect-video'
 * @param {string} src - 圖片的 URL 地址，默認使用 defaultImage
 * @param {string} loadingClassName - 加載中狀態的 CSS 類名
 * @param {HTMLAttributes<HTMLDivElement>} rest - 其他 HTML div 元素屬性
 *
 * @returns {JSX.Element} 返回圖片顯示組件
 *
 * @example
 * // 基本用法
 * <SimpleImage src="https://example.com/image.jpg" />
 *
 * // 自定義比例和類名
 * <SimpleImage
 *   src="https://example.com/image.jpg"
 *   ratio="at-aspect-square"
 *   className="at-rounded-md"
 * />
 */
export const SimpleImage = memo(
	SimpleImageComponent,
) as typeof SimpleImageComponent
