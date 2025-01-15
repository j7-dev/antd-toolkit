import { UploadProps } from 'antd'

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
