import React, { FC } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'
import { useBunny } from '@/refine'

const index: FC<
	ReactCustomBlockRenderProps<
		CustomBlockConfig,
		InlineContentSchema,
		StyleSchema
	>
> = ({ block, editor, contentRef }) => {
	// 取得 bunny 的 library_id
	const { bunny_library_id = '' } = useBunny()

	if (!bunny_library_id) {
		console.error('bunny_library_id is not set')
		return null
	}

	const vId = block.props.vId
	const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${vId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`
	const widthValue = block?.props?.widthValue || 100
	const widthUnit = block?.props?.widthUnit || '%'
	const align = block?.props?.align || 'start'
	const aspectRatio = block?.props?.aspectRatio || 1.7778 // 16/9

	const divDataProps = {
		'data-block-key': block?.type,
		'data-width-value': widthValue,
		'data-width-unit': widthUnit,
		'data-align': align,
	}

	return (
		<div
			{...divDataProps}
			className="at-flex at-w-full at-flex-col at-justify-center"
			style={{
				alignItems: align || 'start',
			}}
		>
			<iframe
				className="at-border-0 at-rounded-xl at-aspect-video"
				style={{
					width: `${widthValue}${widthUnit}`,
					maxWidth: '100%',
					aspectRatio,
				}}
				src={videoUrl}
				loading="lazy"
				allow="encrypted-media;picture-in-picture;"
				allowFullScreen={true}
			></iframe>
		</div>
	)
}

export default index
