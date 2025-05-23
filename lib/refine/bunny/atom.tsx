import { atom } from 'jotai'
import { ModalProps, FormInstance } from 'antd'
import { TMediaLibraryProps, TBunnyVideo } from '@/refine'

/**
 * @deprecated
 */
export const mediaLibraryAtom = atom<{
	form?: FormInstance
	name?: string[]
	onSelect?: () => void
	modalProps: ModalProps
	mediaLibraryProps: Omit<TMediaLibraryProps, 'setSelectedVideos'>
	confirmedSelectedVideos: TBunnyVideo[] // 已按下"選擇影片"按鈕後確認選擇的影片
	key: string
}>({
	form: undefined,
	name: undefined,
	modalProps: {
		title: 'Bunny 媒體庫',
		open: false,
		width: 1600,
		footer: null,
		centered: true,
		zIndex: 2000,
		className: 'pc-media-library',

		// destroyOnClose: true,
	},
	mediaLibraryProps: {
		limit: 1,
		selectedVideos: [],
	},
	confirmedSelectedVideos: [], // 已按下"選擇影片"按鈕後確認選擇的影片
	key: '',
})
