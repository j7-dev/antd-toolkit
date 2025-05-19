import { FC, lazy, Suspense } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteViewProps } from '@blocknote/react'
import { DefaultStyleSchema, DefaultInlineContentSchema } from '@blocknote/core'
import '@blocknote/mantine/style.css'
import { schema } from './useBlockNote'
import './index.scss'
import { Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export * from './useBlockNote'

const BlockNoteView = lazy(() =>
	import('@blocknote/mantine').then((module) => ({
		default: module.BlockNoteView,
	})),
)

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
		<Suspense
			fallback={
				<Button type="text" icon={<LoadingOutlined />}>
					Loading...
				</Button>
			}
		>
			{/* @ts-ignore */}
			<BlockNoteView {...blockNoteViewProps} />
		</Suspense>
	)
}
