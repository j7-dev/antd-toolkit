import { TBunnyVideo } from '@/refine/bunny/types'
import { UploadProps, TabsProps } from 'antd'

/**
 * Bunny 媒體庫
 * @interface TMediaLibraryProps
 *
 * @property {TBunnyVideo[]} selectedItems - 已選擇的媒體項目陣列
 * @property {React.Dispatch<React.SetStateAction<TBunnyVideo[]>> | typeof useSetAtom} setSelectedItems - 設置已選擇媒體項目的函數
 * @property {number} [limit] - 可選擇的媒體項目數量上限
 * @property {UploadProps} [uploadProps] - 可選的上傳元件屬性
 * @property {TabsProps} [tabsProps] - 可選的標籤頁元件屬性
 */
export type TMediaLibraryProps = {
	selectedItems: TBunnyVideo[]
	setSelectedItems:React.Dispatch<React.SetStateAction<TBunnyVideo[]>>
	limit?: number
	uploadProps?: UploadProps
	tabsProps?: TabsProps
}


/**
 * 檔案上傳佇列中的檔案狀態
 * @interface TFileStatus
 * @property {string} key - 檔案唯一識別碼
 * @property {File} file - 檔案物件
 * @property {'active' | 'done' | 'error'} status - 檔案上傳狀態
 * @property {string} videoId - Bunny Stream 影片 ID
 * @property {boolean} isEncoding - 是否正在編碼中
 * @property {number} encodeProgress - 編碼進度 (0-100)
 * @property {number} uploadProgress - 上傳進度 (0-100)
 * @property {string} preview - 預覽圖片的 URL
 */
export type TFileStatus = {
	key: string
	file: File
	status: 'active' | 'done' | 'error'
	videoId: string
	isEncoding: boolean
	encodeProgress: number
	uploadProgress: number
	preview: string
}