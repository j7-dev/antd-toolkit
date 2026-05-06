import { FC } from 'react'
import type { ReactCustomBlockRenderProps } from '@blocknote/react'
import type { CustomBlockConfig } from '@blocknote/core'
import { getFileExtension } from '@/main/utils'

export const Video: FC<ReactCustomBlockRenderProps<CustomBlockConfig>> = ({
	block,
}) => {
	const url = block?.props?.url || ''
	const ext = getFileExtension(url)
	const widthValue = block?.props?.widthValue || 100
	const widthUnit = block?.props?.widthUnit || '%'
	const title = block?.props?.title || ''

	return (
		<>
			{!!title && (
				<p
					style={{
						fontSize: '0.875rem',
						color: '#9ca3af',
						marginBottom: '0.5rem',
					}}
				>
					{title}
				</p>
			)}
			<video
				controls
				preload="metadata"
				style={{ width: `${widthValue}${widthUnit}`, maxWidth: '100%' }}
				playsInline
			>
				<source src={url} type={`video/${ext}`} />
				您的瀏覽器不支援影片播放。
			</video>
		</>
	)
}
