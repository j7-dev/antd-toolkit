import { FC, memo } from 'react'
import List from '@/wp/components/general/MediaLibrary/List'
import { TMediaLibraryProps } from '@/wp/components/general/MediaLibrary/types'
import { MediaLibraryContext } from '@/wp/components/general/MediaLibrary/hooks/useProps'

export * from '@/wp/components/general/MediaLibrary/types'

const MediaLibraryComponent: FC<TMediaLibraryProps> = (props) => {
	return (
		<MediaLibraryContext.Provider value={props}>
			<List />
		</MediaLibraryContext.Provider>
	)
}

/**
 * WordPress 媒體庫
 * @interface TMediaLibraryProps
 * @property {TAttachment[]} selectedItems - 已選擇的媒體項目陣列
 * @property {React.Dispatch<React.SetStateAction<TAttachment[]>> | typeof useSetAtom} setSelectedItems - 設置已選擇媒體項目的函數
 * @property {number} [limit] - 可選擇的媒體項目數量上限
 * @property {ButtonProps} [selectButtonProps] - "選取檔案"按鈕的屬性，可自定義點擊行為
 * @property {UploadProps} [uploadProps] - 上傳媒體項目的屬性設定
 * @property {UploadFile[]} [filesInQueue] - 等待上傳的檔案佇列
 * @property {React.Dispatch<React.SetStateAction<UploadFile[]>> | typeof useSetAtom} [setFilesInQueue] - 設置上傳佇列的函數
 */
export const MediaLibrary = memo(
	MediaLibraryComponent,
) as typeof MediaLibraryComponent
