import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { FaPhotoVideo } from 'react-icons/fa'
import MediaLibraryButton, { TMediaLibraryButton } from './MediaLibraryButton'
import { useBunny } from '@/refine'

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
	icon: <FaPhotoVideo className="at-w-[1.125rem] at-h-[1.125rem]" />,
})

const bunnyVideoBlockConfig: CustomBlockConfig = {
	type: 'bunnyVideo',
	propSchema: {
		vId: {
			default: '',
		},
	},
	content: 'none',
}

export const BunnyVideo = createReactBlockSpec(bunnyVideoBlockConfig, {
	render: (props) => {
		// 取得 bunny 的 library_id
		const { bunny_library_id = '' } = useBunny()

		const vId = props.block.props.vId
		const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${vId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`

		// ❗contentRef 有個屬性 name ，如果不能編輯是 ""，可以編輯是 "nodeViewContentRef"
		const editable = !(props.contentRef.name === '')

		if (!editable) {
			return (
				<iframe
					className="at-border-0 at-w-full at-aspect-video at-rounded-xl"
					src={videoUrl}
					loading="lazy"
					allow="encrypted-media;picture-in-picture;"
					allowFullScreen={true}
				></iframe>
			)
		}

		return <MediaLibraryButton {...(props as unknown as TMediaLibraryButton)} />
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	parse: undefined,

	// ❗toExternalHTML 是例如，將區塊複製到剪貼簿到外部時，會複製的 內容，如果沒有定義就使用 render
	toExternalHTML: (props) => {
		// 取得 bunny 的 library_id
		const { bunny_library_id = '' } = useBunny()

		const vId = props.block.props.vId
		const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${vId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`
		return (
			<iframe
				className="at-border-0 at-absolute at-top-0 at-left-0 at-w-full at-h-full at-rounded-xl"
				src={videoUrl}
				loading="lazy"
				allow="encrypted-media;picture-in-picture;"
				allowFullScreen={true}
			></iframe>
		)
	},
})
