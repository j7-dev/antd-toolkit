import React, { FC } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'
import { Image } from './Image'
import { Audio } from './Audio'
import { Video } from './Video'
import { Other } from './Other'

const index: FC<
	ReactCustomBlockRenderProps<
		CustomBlockConfig,
		InlineContentSchema,
		StyleSchema
	>
> = ({ block, editor, contentRef }) => {
	const url = block?.props?.url
	if (!url) return null

	const fileType = block?.props?.fileType || 'image'

	const divDataProps = {
		'data-block-key': block?.type,
		'data-url': url,
		'data-width-value': block?.props?.widthValue,
		'data-width-unit': block?.props?.widthUnit,
		'data-align': block?.props?.align || 'start',
		'data-link': block?.props?.link || '',
		'data-target': block?.props?.target || '_self',
		'data-alt': block?.props?.alt || '',
		'data-title': block?.props?.title || '',
		'data-caption': block?.props?.caption || '',
		'data-file-type': block?.props?.fileType || 'image',
	}
	return (
		<div
			{...divDataProps}
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: block?.props?.align || 'start',
			}}
		>
			{'image' === fileType && (
				// @ts-ignore
				<Image block={block} editor={editor} contentRef={contentRef} />
			)}
			{'audio' === fileType && (
				// @ts-ignore
				<Audio block={block} editor={editor} contentRef={contentRef} />
			)}
			{'video' === fileType && (
				// @ts-ignore
				<Video block={block} editor={editor} contentRef={contentRef} />
			)}
			{'other' === fileType && (
				// @ts-ignore
				<Other block={block} editor={editor} contentRef={contentRef} />
			)}
		</div>
	)
}

export default index
