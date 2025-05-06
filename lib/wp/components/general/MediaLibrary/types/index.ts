import { ButtonProps, UploadProps } from 'antd'
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
 * @property {UploadProps} [uploadProps] - 上傳媒體項目的屬性設定
 */
export type TMediaLibraryProps<T extends {
	id: string
	url: string
} = TAttachment> = {
	selectedItems: T[] // 已選擇的影片
	setSelectedItems: React.Dispatch<React.SetStateAction<T[]>> | typeof useSetAtom // 已選擇的影片 setter
	limit?: number // 能選擇的影片數量
	uploadProps?: UploadProps // 上傳影片的屬性
}
