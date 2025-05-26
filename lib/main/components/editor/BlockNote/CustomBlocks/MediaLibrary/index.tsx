import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import Button from './Button'
import { FaPhotoVideo } from 'react-icons/fa'
import { PropsContext } from './hooks'
import Render from './Render'
import { isLegacy, toFlexAlign } from '@/main/components/editor/BlockNote/utils'

const CONFIG: CustomBlockConfig = {
	type: 'mediaLibrary',
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
		url: {
			default: '',
		},
		link: {
			default: '',
		},
		target: {
			values: ['_blank', '_self'],
			default: '_self',
		},
		alt: {
			default: '',
		},
		title: {
			default: '',
		},
		caption: {
			default: '',
		},
		fileType: {
			values: ['image', 'audio', 'video', 'other'],
			default: 'image',
		},
	},
	content: 'none',
}

export const mediaLibraryMenuItem = (
	editor: typeof schema.BlockNoteEditor,
) => ({
	key: CONFIG.type,
	title: '媒體庫', // 選單中文
	subtext: 'WordPress 媒體庫', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: CONFIG.type,
		})
	},
	aliases: ['media', '媒體庫'],
	group: 'Media',
	icon: <FaPhotoVideo className="at-size-[1.125rem]" />,
})

export const MediaLibrary = createReactBlockSpec(CONFIG, {
	render: (props) => {
		return (
			<>
				{/* @ts-ignore */}
				<PropsContext.Provider value={props}>
					<Button />
				</PropsContext.Provider>
			</>
		)
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
			url: element.getAttribute('data-url') || '',
			link: element.getAttribute('data-link') || '',
			target: element.getAttribute('data-target') || '_self',
			alt: element.getAttribute('data-alt') || '',
			title: element.getAttribute('data-title') || '',
			caption: element.getAttribute('data-caption') || '',
			fileType: element.getAttribute('data-file-type') || 'image',
		}
	},
	toExternalHTML: ({ block, editor, contentRef }) => (
		// @ts-ignore
		<Render block={block} editor={editor} contentRef={contentRef} />
	),
})

function parseLegacy(element: HTMLElement) {
	const contentType = element.getAttribute('data-content-type')
	if ('image' === contentType) {
		const wrapperNode = element.querySelector('.bn-file-block-content-wrapper')
		const imgNode = wrapperNode?.querySelector('img')
		const style = wrapperNode?.getAttribute('style')
		const widthValue = Number(style?.match(/width: (\d+)px/)?.[1]) || 100

		return {
			widthValue,
			widthUnit: 'px',
			align: toFlexAlign(
				element.getAttribute('data-text-alignment') as
					| 'center'
					| 'start'
					| 'left'
					| 'right'
					| ''
					| undefined
					| null,
			),
			url: element.getAttribute('data-url') || '',
			alt: imgNode?.getAttribute('alt') || '',
			title: imgNode?.getAttribute('title') || '',
			caption: element.getAttribute('data-caption') || '',
			fileType: 'image',
		}
	}

	if ('file' === contentType) {
		const url = element.getAttribute('data-url') || ''

		return {
			url,
			title: element.getAttribute('data-name') || '',
			fileType: 'other',
		}
	}
}
