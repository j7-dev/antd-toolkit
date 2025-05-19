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
			default: 'start',
		},
		url: {
			default: '',
		},
	},
	content: 'none',
}

export const MediaLibrary = createReactBlockSpec(mediaLibraryBlockConfig, {
	render: (props) => {
		// ❗contentRef 有個屬性 name ，如果不能編輯是 ""，可以編輯是 "nodeViewContentRef"
		const editable = !(props.contentRef.name === '')
		console.log('⭐ props:', props)

		if (!editable) {
			return <>456</>
		}

		return (
			<PropsContext.Provider value={props}>
				<Button />
			</PropsContext.Provider>
		)
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	parse: undefined,
})
