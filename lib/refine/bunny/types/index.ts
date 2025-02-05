import { UploadProps, ButtonProps } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'


export type TUseUploadParams = {
	uploadProps?: UploadProps
}

export type TBunnyVideo = {
	videoLibraryId: number
	guid: string
	title: string
	dateUploaded: string
	views: number
	isPublic: boolean
	length: number
	status: number
	framerate: number
	rotation: null //TYPE
	width: number
	height: number
	availableResolutions: null //TYPE
	thumbnailCount: number
	encodeProgress: number
	storageSize: number
	captions: Array<any> //TYPE
	hasMP4Fallback: boolean
	collectionId: string
	thumbnailFileName: string
	averageWatchTime: number
	totalWatchTime: number
	category: string
	chapters: Array<any> //TYPE
	moments: Array<any> //TYPE
	metaTags: Array<any> //TYPE
	transcodingMessages: {
		timeStamp: string
		level: number
		issueCode: number
		message: string
		value: string
	}[]
}

export type TUploadVideoResponse = {
	success: boolean
	message: string
	statusCode: number
}

export type TGetVideosResponse = {
	totalItems: number
	currentPage: number
	itemsPerPage: number
	items: TBunnyVideo[]
}

export type TMediaLibraryProps = {
	selectedVideos: TBunnyVideo[] // 已選擇的影片
	setSelectedVideos:
		| React.Dispatch<React.SetStateAction<TBunnyVideo[]>>
		| ((
				_videosOrFunction:
					| TBunnyVideo[]
					| ((_videos: TBunnyVideo[]) => TBunnyVideo[]),
		  ) => void) // 已選擇的影片 setter
	limit?: number // 能選擇的影片數量
	selectButtonProps?: ButtonProps // "選取影片"按鈕的屬性，可以設定 onClick 後的動作
}

export type TUploadStatus =
	| 'active'
	| 'normal'
	| 'exception'
	| 'success'
	| undefined

export type TFileInQueue = {
	key: string
	file: RcFile
	status?: TUploadStatus // 上傳狀態
	videoId: string // 影片 ID
	isEncoding: boolean // 是否正在編碼
	encodeProgress: number // 編碼進度
	uploadProgress: number // 上傳進度
	preview?: string // 預覽圖片
}
