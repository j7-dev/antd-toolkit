import { FC } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteViewProps } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { MediaLibraryModal } from '@/wp/components/general/MediaLibraryModal'
import {
	modalPropsAtom,
	selectedItemsAtom,
} from '@/main/components/editor/BlockNote/CustomBlocks/MediaLibrary/hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { schema } from './useBlockNote'
import './index.scss'
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
	const modalProps = useAtomValue(modalPropsAtom)
	const selectedItems = useAtomValue(selectedItemsAtom)
	const setSelectedItems = useSetAtom(selectedItemsAtom)
	return (
		<>
			<BlockNoteView {...blockNoteViewProps} />
			<MediaLibraryModal
				modalProps={modalProps}
				mediaLibraryProps={{
					selectedItems,
					setSelectedItems,
					limit: 1,
				}}
			/>
		</>
	)
}
