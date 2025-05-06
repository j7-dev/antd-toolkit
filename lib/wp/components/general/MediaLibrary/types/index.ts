import { ButtonProps, UploadProps, UploadFile } from 'antd'
import { useSetAtom } from 'jotai'

export type TAttachment = {
	id: string
	status: string
	slug: string
	title: string
	filename: string
	url: string
	img_url: string
	_wp_attachment_image_alt: string
	description: string
	short_description: string
	type: string
	mime: string
	subtype: string
	edit_link: string
	filesize_human_readable: string
	height: number
	width: number
	date_created: string
	date_modified: string
	author: {
		id: string
		name: string
	}
}


/**
 * WordPress 媒體庫元件的屬性介面
 * @interface TMediaLibraryProps
 * @template T - 媒體項目類型，必須包含 id 和 url 屬性，預設為 TAttachment
 * @property {T[]} selectedItems - 已選擇的媒體項目陣列
 * @property {React.Dispatch<React.SetStateAction<T[]>> | typeof useSetAtom} setSelectedItems - 設置已選擇媒體項目的函數
 * @property {number} [limit] - 可選擇的媒體項目數量上限
 * @property {ButtonProps} [selectButtonProps] - "選取檔案"按鈕的屬性，可自定義點擊行為
 * @property {UploadProps} [uploadProps] - 上傳媒體項目的屬性設定
 * @property {UploadFile[]} [filesInQueue] - 等待上傳的檔案佇列
 * @property {React.Dispatch<React.SetStateAction<UploadFile[]>> | typeof useSetAtom} [setFilesInQueue] - 設置上傳佇列的函數
 */
export type TMediaLibraryProps<T extends {
	id: string
	url: string
} = TAttachment> = {
	selectedItems: T[] // 已選擇的影片
	setSelectedItems: React.Dispatch<React.SetStateAction<T[]>> | typeof useSetAtom // 已選擇的影片 setter
	limit?: number // 能選擇的影片數量
	selectButtonProps?: ButtonProps // "選取影片"按鈕的屬性，可以設定 onClick 後的動作
	uploadProps?: UploadProps // 上傳影片的屬性
	filesInQueue?: UploadFile[]
	setFilesInQueue?:React.Dispatch<React.SetStateAction<UploadFile[]>> | typeof useSetAtom
}
