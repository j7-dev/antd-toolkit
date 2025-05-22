import React, { FC } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'

export const Video: FC<
	ReactCustomBlockRenderProps<
		CustomBlockConfig,
		InlineContentSchema,
		StyleSchema
	>
> = ({ block, editor, contentRef }) => {
	const url = block?.props?.url
	const widthValue = block?.props?.widthValue
	const widthUnit = block?.props?.widthUnit
	const link = block?.props?.link || ''
	const target = block?.props?.target || '_self'
	const alt = block?.props?.alt || ''
	const title = block?.props?.title || ''
	const caption = block?.props?.caption || ''

	return (
		<>
			{!!link && (
				<a
					href={link}
					target={target}
					rel="noopener noreferrer"
					className="at-contents"
				>
					<img
						alt={alt}
						title={title}
						style={{
							width: `${widthValue}${widthUnit}`,
						}}
						src={url}
					/>
				</a>
			)}
			{!link && (
				<img
					alt={alt}
					title={title}
					style={{
						width: `${widthValue}${widthUnit}`,
					}}
					src={url}
				/>
			)}

			{caption && (
				<div className="at-mt-1 at-text-xs at-text-gray-400">▲ {caption}</div>
			)}
		</>
	)
}
