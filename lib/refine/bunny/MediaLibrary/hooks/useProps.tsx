import { useContext, createContext } from 'react'
import { TMediaLibraryProps } from '@/refine/bunny/MediaLibrary/types'

export const MediaLibraryContext = createContext<TMediaLibraryProps | null>(
	null,
)

const DEFAULT: TMediaLibraryProps = {
	initialIds: [], // 初始選擇的媒體項目 ID 陣列
	selectedItems: [], // 已選擇的影片
	setSelectedItems: (_prev) => {}, // 已選擇的影片 setter
	limit: 1, // 能選擇的影片數量
	uploadProps: {}, // 上傳影片的屬性
	tabsProps: {}, // 標籤頁的屬性
}

export const useProps = (): TMediaLibraryProps => {
	const context = useContext(MediaLibraryContext)
	return {
		...DEFAULT,
		...context,
	}
}
