import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { FaPhotoVideo } from 'react-icons/fa'
import { TMediaLibraryButton } from './Button'
import Button from './Button'
import Render from './Render'

export const bunnyVideoMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
	key: 'bunnyVideo',
	title: 'Bunny Video', // 選單中文
	subtext: '可放置 Bunny 影片檔', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: 'bunnyVideo',
		})
	},
	aliases: ['bunny'],
	group: 'Bunny',
	icon: <FaPhotoVideo className="at-size-[1.125rem]" />,
})

const bunnyVideoBlockConfig: CustomBlockConfig = {
	type: 'bunnyVideo',
	propSchema: {
		widthValue: {
			default: 100,
		},
		widthUnit: {
			default: '%',
		},
		align: {
			values: ['start', 'center', 'end'],
			default: 'start',
		},
		aspectRatio: {
			default: 1.7778, // 16/9
		},
		vId: {
			default: '',
		},
	},
	content: 'none',
}

export const BunnyVideo = createReactBlockSpec(bunnyVideoBlockConfig, {
	render: (props) => {
		return <Button {...(props as unknown as TMediaLibraryButton)} />
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	parse: undefined,
	toExternalHTML: ({ block, editor, contentRef }) => (
		// @ts-ignore
		<Render block={block} editor={editor} contentRef={contentRef} />
	),
})
