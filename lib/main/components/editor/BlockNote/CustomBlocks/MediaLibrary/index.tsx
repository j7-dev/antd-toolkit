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
		console.log('⭐ block:', block)
		return (
			<div
				data-block-key={type}
				data-url={url}
				data-width-value={widthValue}
				data-align={align}
				data-width-unit={widthUnit}
				data-link={link}
				className="at-flex at-w-full"
				style={{
					justifyContent: align,
				}}
			>
				{link ? (
					<a href={link} rel="noopener noreferrer" className="at-contents">
						<img
							style={{
								width: `${widthValue}${widthUnit}`,
							}}
							src={url}
						/>
					</a>
				) : (
					<img
						style={{
							width: `${widthValue}${widthUnit}`,
						}}
						src={url}
					/>
				)}
			</div>
		)
	},
})
