import { FC } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteViewProps } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { MediaLibrary as BunnyMediaLibrary } from '@/refine/bunny/MediaLibrary'

import {
	BunnyMediaLibraryModalContext,
	useBunnyMediaLibraryModal,
} from '@/main/components/editor/BlockNote/CustomBlocks/BunnyVideo/hooks'
import { schema } from './useBlockNote'
import './index.scss'
import { SimpleModal } from '@/main/components/SimpleModal'

export * from '@/main/components/editor/BlockNote/useBlockNote'
export { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'

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
	const bunnyMediaLibraryModalProps = useBunnyMediaLibraryModal()
	const {
		modalProps: bunnyModalProps,
		mediaLibraryProps: bunnyMediaLibraryProps,
	} = bunnyMediaLibraryModalProps

	return (
		<BunnyMediaLibraryModalContext.Provider value={bunnyMediaLibraryModalProps}>
			<BlockNoteView {...blockNoteViewProps} />

			<SimpleModal {...bunnyModalProps}>
				<BunnyMediaLibrary {...bunnyMediaLibraryProps} />
			</SimpleModal>
		</BunnyMediaLibraryModalContext.Provider>
	)
}
