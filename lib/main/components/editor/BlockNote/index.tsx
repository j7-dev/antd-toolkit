import { FC, useEffect, useState } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteViewProps } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { MediaLibrary as WpMediaLibrary } from '@/wp/components/general/MediaLibrary'
import { MediaLibrary as BunnyMediaLibrary } from '@/refine/bunny/MediaLibrary'
import {
	WpMediaLibraryModalContext,
	useWpMediaLibraryModal,
} from '@/main/components/editor/BlockNote/CustomBlocks/MediaLibrary/hooks'

import {
	BunnyMediaLibraryModalContext,
	useBunnyMediaLibraryModal,
} from '@/main/components/editor/BlockNote/CustomBlocks/BunnyVideo/hooks'
import { schema } from './useBlockNote'
import './index.scss'
import Modal from './Modal'

export * from './useBlockNote'

/**
 * TODO
 * 可以設定要載入那些模組
 */
export const BlockNote: FC<
	BlockNoteViewProps<
		typeof schema.blockSchema,
		DefaultInlineContentSchema,
		DefaultStyleSchema
	>
> = (blockNoteViewProps) => {
	const wpMediaLibraryModalProps = useWpMediaLibraryModal()
	const { modalProps: wpModalProps, mediaLibraryProps: wpMediaLibraryProps } =
		wpMediaLibraryModalProps

	const bunnyMediaLibraryModalProps = useBunnyMediaLibraryModal()
	const {
		modalProps: bunnyModalProps,
		mediaLibraryProps: bunnyMediaLibraryProps,
	} = bunnyMediaLibraryModalProps

	return (
		<WpMediaLibraryModalContext.Provider value={wpMediaLibraryModalProps}>
			<BunnyMediaLibraryModalContext.Provider
				value={bunnyMediaLibraryModalProps}
			>
				<BlockNoteView {...blockNoteViewProps} />

				<Modal {...wpModalProps}>
					<WpMediaLibrary {...wpMediaLibraryProps} />
				</Modal>

				<Modal {...bunnyModalProps}>
					<BunnyMediaLibrary {...bunnyMediaLibraryProps} />
				</Modal>
			</BunnyMediaLibraryModalContext.Provider>
		</WpMediaLibraryModalContext.Provider>
	)
}
