import { FC } from 'react'
import type { ReactCustomBlockRenderProps } from '@blocknote/react'
import type { CustomBlockConfig } from '@blocknote/core'
import { getFileExtension } from '@/main/utils'
import { ExtIcon } from '@/main/components'

export const Other: FC<ReactCustomBlockRenderProps<CustomBlockConfig>> = ({
	block,
}) => {
	const url = block?.props?.url || ''
	const ext = getFileExtension(url)
	const target = block?.props?.target || '_self'
	const title = block?.props?.title || ''

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				columnGap: '0.5rem',
			}}
		>
			<ExtIcon ext={ext} style={{ width: '1.5rem', height: '1.5rem' }} />
			<a
				href={url}
				target={target}
				rel="noopener noreferrer"
				style={{
					display: 'contents',
					fontSize: '0.875rem',
				}}
			>
				{title}
			</a>
		</div>
	)
}
