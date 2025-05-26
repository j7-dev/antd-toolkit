import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { FaPhotoVideo } from 'react-icons/fa'
import { TMediaLibraryButton } from './Button'
import Button from './Button'
import Render from './Render'
import { isLegacy } from '@/main/components/editor/BlockNote/utils'

const CONFIG: CustomBlockConfig = {
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
		player: {
			values: ['video', 'audio'],
			default: 'video',
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

export const bunnyVideoMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
	key: CONFIG.type,
	title: 'Bunny 媒體庫', // 選單中文
	subtext: '可放置 Bunny 影片、音訊檔案', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: CONFIG.type,
		})
	},
	aliases: ['bunny'],
	group: 'Advanced',
	icon: <FaPhotoVideo className="at-size-[1.125rem]" />,
})

export const BunnyVideo = createReactBlockSpec(CONFIG, {
	render: (props) => {
		return <Button {...(props as unknown as TMediaLibraryButton)} />
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	// @ts-ignore
	parse: (element: HTMLElement) => {
		if (isLegacy(element)) {
			return parseLegacy(element)
		}
		// 取得節點上的 data-block-key
		const blockType = element.getAttribute('data-block-key')
		if (CONFIG.type !== blockType) return

		return {
			widthValue: element.getAttribute('data-width-value') || 100,
			widthUnit: element.getAttribute('data-width-unit') || '%',
			align: element.getAttribute('data-align') || 'start',
			player: element.getAttribute('data-player') || 'video',
			aspectRatio: element.getAttribute('data-aspect-ratio') || 1.7778,
			vId: element.getAttribute('data-v-id') || '',
		}
	},
	toExternalHTML: ({ block, editor, contentRef }) => (
		// @ts-ignore
		<Render block={block} editor={editor} contentRef={contentRef} />
	),
})

function parseLegacy(element: HTMLElement) {
	const contentType = element.getAttribute('data-content-type')
	if (![CONFIG.type, 'bunnyAudio'].includes(contentType || '')) return

	const player = 'bunnyAudio' === contentType ? 'audio' : 'video'

	return {
		widthValue: 100,
		widthUnit: '%',
		player,
		aspectRatio: 1.7778,
		vId: element.getAttribute('data-v-id') || '',
	}
}
