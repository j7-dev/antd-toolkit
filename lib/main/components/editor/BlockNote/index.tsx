import { FC } from 'react'
import '@blocknote/core/fonts/inter.css'
import {
	BlockNoteViewProps,
	BasicTextStyleButton,
	BlockTypeSelect,
	ColorStyleButton,
	CreateLinkButton,
	FileCaptionButton,
	FileReplaceButton,
	FormattingToolbar,
	FormattingToolbarController,
	NestBlockButton,
	TextAlignButton,
	UnnestBlockButton,
} from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { schema } from './useBlockNote'
import './index.scss'

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
	return <BlockNoteView {...blockNoteViewProps} />
}
