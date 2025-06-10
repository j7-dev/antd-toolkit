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
	return (
		<BlockNoteView {...blockNoteViewProps}>
			<FormattingToolbarController
				formattingToolbar={() => (
					<FormattingToolbar>
						<BlockTypeSelect key={'blockTypeSelect'} />

						{/* Extra button to toggle blue text & background */}
						{/* <BlueButton key={'customButton'} /> */}

						<FileCaptionButton key={'fileCaptionButton'} />
						<FileReplaceButton key={'replaceFileButton'} />

						<BasicTextStyleButton
							basicTextStyle={'bold'}
							key={'boldStyleButton'}
						/>
						<BasicTextStyleButton
							basicTextStyle={'italic'}
							key={'italicStyleButton'}
						/>
						<BasicTextStyleButton
							basicTextStyle={'underline'}
							key={'underlineStyleButton'}
						/>
						<BasicTextStyleButton
							basicTextStyle={'strike'}
							key={'strikeStyleButton'}
						/>
						{/* Extra button to toggle code styles */}
						<BasicTextStyleButton
							key={'codeStyleButton'}
							basicTextStyle={'code'}
						/>

						<TextAlignButton
							textAlignment={'left'}
							key={'textAlignLeftButton'}
						/>
						<TextAlignButton
							textAlignment={'center'}
							key={'textAlignCenterButton'}
						/>
						<TextAlignButton
							textAlignment={'right'}
							key={'textAlignRightButton'}
						/>

						<ColorStyleButton key={'colorStyleButton'} />

						{/* <NestBlockButton key={'nestBlockButton'} />
						<UnnestBlockButton key={'unnestBlockButton'} /> */}

						<CreateLinkButton key={'createLinkButton'} />
					</FormattingToolbar>
				)}
			/>
		</BlockNoteView>
	)
}
