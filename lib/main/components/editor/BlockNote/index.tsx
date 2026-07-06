import { FC } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteViewProps } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { schema } from './useBlockNote'
import { ErrorBoundary } from './ErrorBoundary'
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
	return (
		<ErrorBoundary>
			{/* translate="no" + notranslate 擋 Google／沉浸式翻譯改動 contenteditable DOM 導致白屏 */}
			<div translate="no" className="notranslate">
				<BlockNoteView {...blockNoteViewProps} />
			</div>
		</ErrorBoundary>
	)
}
