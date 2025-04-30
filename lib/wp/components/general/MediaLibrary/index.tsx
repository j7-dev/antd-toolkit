import { FC, memo } from 'react'
import List from '@/wp/components/general/MediaLibrary/List'
import { TMediaLibraryProps } from '@/wp/components/general/MediaLibrary/types'
import { MediaLibraryContext } from '@/wp/components/general/MediaLibrary/hooks/useProps'

const MediaLibraryComponent: FC<TMediaLibraryProps> = (props) => {
	return (
		<MediaLibraryContext.Provider value={props}>
			<List />
		</MediaLibraryContext.Provider>
	)
}

/**
 * WordPress 媒體庫元件
 * 提供影片上傳、管理和設定功能
 * @component
 * @param {TMediaLibraryProps} props - 元件屬性
 * @returns {JSX.Element} MediaLibrary 元件
 */
export const MediaLibrary = memo(MediaLibraryComponent)
