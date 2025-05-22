import React, { FC } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'
import { getFileExtension } from '@/main/utils'

export const Audio: FC<
	ReactCustomBlockRenderProps<
		CustomBlockConfig,
		InlineContentSchema,
		StyleSchema
	>
> = ({ block, editor, contentRef }) => {
	const url = block?.props?.url || ''
	const ext = getFileExtension(url)
	const widthValue = block?.props?.widthValue || 100
	const widthUnit = block?.props?.widthUnit || '%'
	const title = block?.props?.title || ''

	return (
		<>
			{!!title && (
				<p className="at-text-sm at-text-gray-400 !at-mb-2">{title}</p>
			)}

			<audio
				controls
				preload="metadata"
				style={{ width: `${widthValue}${widthUnit}`, maxWidth: '100%' }}
			>
				<source src={url} type={`audio/${ext}`} />
				您的瀏覽器不支援音頻播放。
			</audio>
		</>
	)
}
