import { useContext, createContext } from 'react'
import { TMediaLibraryProps } from '@/wp/components/general/MediaLibrary/types'

export const MediaLibraryContext = createContext<TMediaLibraryProps | null>(
	null,
)

const DEFAULT: TMediaLibraryProps = {
	selectedItems: [], // 已選擇的影片
	setSelectedItems: (_prev) => {}, // 已選擇的影片 setter
	limit: 1, // 能選擇的影片數量
	uploadProps: {}, // 上傳影片的屬性
}

export const useProps = (): TMediaLibraryProps => {
	const context = useContext(MediaLibraryContext)
	return {
		...DEFAULT,
		...context,
	}
}
