import { useContext, createContext } from 'react'
import { TMediaLibraryProps } from '@/wp/components/general/MediaLibrary/types'
import { MimeTypeValidator } from '@/wp/components/general/MediaLibrary/Utils'

export const MediaLibraryContext = createContext<TMediaLibraryProps | null>(
	null,
)

const DEFAULT: TMediaLibraryProps = {
	selectedItems: [], // 已選擇的影片
	setSelectedItems: (_prev) => {}, // 已選擇的影片 setter
	limit: 1, // 能選擇的影片數量
	uploadProps: {}, // 上傳影片的屬性
}

export const useProps = (): TMediaLibraryProps & {
	mime: MimeTypeValidator
} => {
	const context = useContext(MediaLibraryContext)
	const accept = context?.uploadProps?.accept || undefined
	const mime = new MimeTypeValidator(accept)

	return {
		...DEFAULT,
		...context,
		mime,
	}
}
