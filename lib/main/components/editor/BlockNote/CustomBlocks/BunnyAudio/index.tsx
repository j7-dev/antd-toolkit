import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { MdOutlineAudioFile } from 'react-icons/md'
import MediaLibraryButton, { TMediaLibraryButton } from './MediaLibraryButton'
import { bunnyStore, bunnyAtom } from '@/refine'

export const bunnyAudioMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
	key: 'bunnyAudio',
	title: 'Bunny Audio', // 選單中文
	subtext: '可放置 Bunny .mp3 錄音檔，請勿選擇影片檔，會無法播放', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: 'bunnyAudio',
		})
	},
	aliases: ['bunny'],
	group: 'Bunny',
	icon: <MdOutlineAudioFile className="w-[1.125rem] h-[1.125rem]" />,
})

const bunnyAudioBlockConfig: CustomBlockConfig = {
	type: 'bunnyAudio',
	propSchema: {
		vId: {
			default: '',
		},
	},
	content: 'none',
}

export const BunnyAudio = createReactBlockSpec(bunnyAudioBlockConfig, {
	render: (props) => {
		// 取得 bunny 的 library_id
		const bunny_cdn_hostname = bunnyStore?.get(bunnyAtom)?.bunny_cdn_hostname

		const vId = props.block.props.vId
		const audioUrl = `https://${bunny_cdn_hostname}/${vId}/playlist.m3u8`

		// ❗contentRef 有個屬性 name ，如果不能編輯是 ""，可以編輯是 "nodeViewContentRef"
		const editable = !(props.contentRef.name === '')

		if (!editable) {
			return <audio id="audioPlayer" data-src={audioUrl} controls></audio>
		}

		return <MediaLibraryButton {...(props as unknown as TMediaLibraryButton)} />
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	parse: undefined,

	// ❗toExternalHTML 是例如，將區塊複製到剪貼簿到外部時，會複製的 內容，如果沒有定義就使用 render
	toExternalHTML: (props) => {
		// 取得 bunny 的 library_id
		const bunny_cdn_hostname = bunnyStore?.get(bunnyAtom)?.bunny_cdn_hostname

		const vId = props.block.props.vId
		const audioUrl = `https://${bunny_cdn_hostname}/${vId}/playlist.m3u8`
		return <audio id="audioPlayer" data-src={audioUrl} controls></audio>
	},
})
