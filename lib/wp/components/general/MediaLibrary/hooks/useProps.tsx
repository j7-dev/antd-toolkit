import { useContext, createContext } from 'react'
import { TMediaLibraryProps } from '@/wp/components/general/MediaLibrary/types'

export const MediaLibraryContext = createContext<TMediaLibraryProps | null>(
	null,
)

export const useProps = (): TMediaLibraryProps => {
	const context = useContext(MediaLibraryContext)
	return (
		context || {
			selectedItems: [], // 已選擇的影片
			setSelectedItems: () => {}, // 已選擇的影片 setter
			limit: 1, // 能選擇的影片數量
			selectButtonProps: {}, // "選取影片"按鈕的屬性，可以設定 onClick 後的動作
			uploadProps: {}, // 上傳影片的屬性
			filesInQueue: [],
			setFilesInQueue: () => {},
		}
	)
}
