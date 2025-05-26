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
	const { bunny_library_id = '', bunny_cdn_hostname = '' } = useBunny()

	if (!bunny_library_id || !bunny_cdn_hostname) {
		console.error('bunny_library_id or bunny_cdn_hostname is not set', {
			bunny_library_id,
			bunny_cdn_hostname,
		})
		return null
	}

	const vId = block?.props?.vId

	const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${vId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`
	const audioUrl = `https://${bunny_cdn_hostname}/${vId}/playlist.m3u8`

	const widthValue = block?.props?.widthValue || 100
	const widthUnit = block?.props?.widthUnit || '%'
	const align = block?.props?.align || 'start'
	const aspectRatio = block?.props?.aspectRatio || 1.7778 // 16/9
	const player = block?.props?.player || 'video'

	const divDataProps = {
		'data-block-key': block?.type,
		'data-width-value': widthValue,
		'data-width-unit': widthUnit,
		'data-align': align,
		'data-player': player,
		'data-aspect-ratio': aspectRatio,
		'data-v-id': vId,
	}

	return (
		<div
			{...divDataProps}
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: align || 'start',
			}}
		>
			{'video' === player && (
				<iframe
					style={{
						border: 'none',
						outline: 'none',
						borderRadius: '0.75rem',
						width: `${widthValue}${widthUnit}`,
						maxWidth: '100%',
						aspectRatio,
					}}
					src={videoUrl}
					loading="lazy"
					allow="encrypted-media;picture-in-picture;"
					allowFullScreen={true}
				></iframe>
			)}

			{'audio' === player && (
				<audio
					preload="metadata"
					style={{
						width: `${widthValue}${widthUnit}`,
						maxWidth: '100%',
					}}
					src={audioUrl}
					controls
				></audio>
			)}
		</div>
	)
}

export default index
