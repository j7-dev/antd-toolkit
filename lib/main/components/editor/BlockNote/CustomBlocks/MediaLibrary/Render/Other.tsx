import React, { FC } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'
import { getFileExtension } from '@/main/utils'
import { ExtIcon } from '@/main/components'

export const Other: FC<
	ReactCustomBlockRenderProps<
		CustomBlockConfig,
		InlineContentSchema,
		StyleSchema
	>
> = ({ block, editor, contentRef }) => {
	const url = block?.props?.url || ''
	const ext = getFileExtension(url)
	const target = block?.props?.target || '_self'
	const title = block?.props?.title || ''

	return (
		<div className="at-flex at-items-center at-gap-x-2">
			<ExtIcon ext={ext} />
			<a
				href={url}
				target={target}
				rel="noopener noreferrer"
				className="at-contents at-text-sm"
			>
				{title}
			</a>
		</div>
	)
}
