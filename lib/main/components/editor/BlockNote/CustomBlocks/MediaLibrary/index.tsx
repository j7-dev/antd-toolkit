import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import Button from './Button'
import { FaPhotoVideo } from 'react-icons/fa'
import { PropsContext } from './hooks'

export const mediaLibraryMenuItem = (
	editor: typeof schema.BlockNoteEditor,
) => ({
	key: 'mediaLibrary',
	title: '媒體庫', // 選單中文
	subtext: 'WordPress 媒體庫', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: 'mediaLibrary',
		})
	},
	aliases: ['mediaLibrary'],
	group: 'Media',
	icon: <FaPhotoVideo className="at-size-[1.125rem]" />,
})

const mediaLibraryBlockConfig: CustomBlockConfig = {
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
	},
	content: 'none',
}

export const MediaLibrary = createReactBlockSpec(mediaLibraryBlockConfig, {
	render: (props) => {
		return (
			// @ts-ignore
			<PropsContext.Provider value={props}>
				<Button />
			</PropsContext.Provider>
		)
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	parse: (element: HTMLElement) => {
		// 取得節點上的 data-block-key
		const blockKey = element.getAttribute('data-block-key')
		if ('mediaLibrary' !== blockKey) return

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
		}
	},
	toExternalHTML: ({ block, editor, contentRef }) => {
		const url = block?.props?.url
		if (!url) return null

		const type = block?.type
		const widthValue = block?.props?.widthValue
		const widthUnit = block?.props?.widthUnit
		const align = block?.props?.align || 'start'
		const link = block?.props?.link || ''
		const target = block?.props?.target || '_self'
		const alt = block?.props?.alt || ''
		const title = block?.props?.title || ''
		const caption = block?.props?.caption || ''
		return (
			<div
				data-block-key={type}
				data-url={url}
				data-width-value={widthValue}
				data-align={align}
				data-width-unit={widthUnit}
				data-link={link}
				data-target={target}
				data-alt={alt}
				data-title={title}
				data-caption={caption}
				className="at-flex at-w-full at-flex-col at-justify-center"
				style={{
					alignItems: align,
				}}
			>
				{link ? (
					<a
						href={link}
						target={target}
						rel="noopener noreferrer"
						className="at-contents"
					>
						<img
							alt={alt}
							title={title}
							style={{
								width: `${widthValue}${widthUnit}`,
							}}
							src={url}
						/>
					</a>
				) : (
					<img
						alt={alt}
						title={title}
						style={{
							width: `${widthValue}${widthUnit}`,
						}}
						src={url}
					/>
				)}

				{caption && (
					<div className="at-mt-1 at-text-xs at-text-gray-400">▲ {caption}</div>
				)}
			</div>
		)
	},
})
