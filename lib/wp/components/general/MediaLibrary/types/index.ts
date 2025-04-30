import { ButtonProps, UploadProps, UploadFile } from 'antd'
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


export type TMediaLibraryProps = {
	selectedItems: TAttachment[] // 已選擇的影片
	setSelectedItems:
		| React.Dispatch<React.SetStateAction<TAttachment[]>>
		| ((
				_itemsOrFunction:
					| TAttachment[]
					| ((_items: TAttachment[]) => TAttachment[]),
		  ) => void) // 已選擇的影片 setter
	limit?: number // 能選擇的影片數量
	selectButtonProps?: ButtonProps // "選取影片"按鈕的屬性，可以設定 onClick 後的動作
	uploadProps?: UploadProps // 上傳影片的屬性
	filesInQueue?: UploadFile[]
	setFilesInQueue?:React.Dispatch<React.SetStateAction<UploadFile[]>>
}
