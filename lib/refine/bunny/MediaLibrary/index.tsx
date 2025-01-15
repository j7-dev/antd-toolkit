import React, { FC, useState } from 'react'
import { Tabs, TabsProps, ButtonProps } from 'antd'
import { FaPhotoVideo } from 'react-icons/fa'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Heading } from '@/components/general'
import VideoList from './VideoList'
import UploadVideo from './UploadVideo'
import { atom } from 'jotai'
import { RcFile } from 'antd/lib/upload/interface'
import { TBunnyVideo } from '@/refine/bunny/types'
import {
  bunny_library_id,
  bunny_stream_api_key,
  bunny_cdn_hostname,
} from '@/utils'
import NoLibraryId from '@/components/formItem/VideoInput/NoLibraryId'

export type TMediaLibraryProps = {
  selectedVideos: TBunnyVideo[]
  setSelectedVideos:
    | React.Dispatch<React.SetStateAction<TBunnyVideo[]>>
    | ((
        _videosOrFunction:
          | TBunnyVideo[]
          | ((_videos: TBunnyVideo[]) => TBunnyVideo[]),
      ) => void)
  limit?: number
  selectButtonProps?: ButtonProps
}

export const MediaLibrary: FC<TMediaLibraryProps> = (props) => {
  const [activeKey, setActiveKey] = useState('bunny-media-library')

  if (!bunny_library_id || !bunny_stream_api_key || !bunny_cdn_hostname) {
    return (
      <NoLibraryId
        bunny_library_id={bunny_library_id}
        bunny_stream_api_key={bunny_stream_api_key}
        bunny_cdn_hostname={bunny_cdn_hostname}
      />
    )
  }

  const items: TabsProps['items'] = [
    {
      key: 'upload-video',
      label: '上傳影片到 Bunny',
      children: <UploadVideo setActiveKey={setActiveKey} />,
      icon: <CloudUploadOutlined />,
    },
    {
      key: 'bunny-media-library',
      label: 'Bunny 媒體庫',
      children: <VideoList {...props} />,
      icon: <FaPhotoVideo />,
    },
  ]

  return (
    <>
      <Heading>選擇或上傳影片</Heading>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
        type="card"
        className="pc-media-library__tabs"
      />
    </>
  )
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
  status?: TUploadStatus
  videoId: string
  isEncoding: boolean
  encodeProgress: number
  uploadProgress: number
  preview?: string
}

// 上傳中
const FAKES = [
  {
    key: 'rc-upload-1723542720209-7',
    file: {
      lastModified: 1719828868246,
      name: 'feature.mp4',
      size: 119071062,
      type: 'video/mp4',
      uid: 'rc-upload-1723542720209-14',
      webkitRelativePath: '',
    },
    status: 'active',
    videoId: '9428d90f-8e12-4909-924c-b3fef42e8829',
    isEncoding: false,
    encodeProgress: 0,
    uploadProgress: 0,
    preview: 'blob:http://ltest.test:8080/c6e97785-1d4c-491a-a7c1-ed49d50ce788',
  },
  {
    key: 'rc-upload-1723542720209-8',
    file: {
      lastModified: 17198280868246,
      name: 'feature.mp4',
      size: 31907162,
      type: 'video/mp4',
      uid: 'rc-upload-1723542720209-14',
      webkitRelativePath: '',
    },
    status: 'active',
    videoId: '',
    isEncoding: false,
    encodeProgress: 0,
    uploadProgress: 0,
    preview: 'blob:http://ltest.test:8080/8b5b989a-4679-4355-a5d6-5178bbfe6241',
  },
  {
    key: 'rc-upload-1723542720209-9',
    file: {
      lastModified: 17198288068246,
      name: 'feature.mp4',
      size: 18907162,
      type: 'video/mp4',
      uid: 'rc-upload-1723542720209-14',
      webkitRelativePath: '',
    },
    status: 'active',
    videoId: '',
    isEncoding: true,
    encodeProgress: 0,
    uploadProgress: 0,
    preview: 'blob:http://ltest.test:8080/9add96bf-377f-4213-b3e2-8d2c624450b8',
  },
] as TFileInQueue[]

// 編碼中
// filesInQueue = [
// 	{
// 		"key": "rc-upload-1723542720209-7",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "9428d90f-8e12-4909-924c-b3fef42e8829",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://ltest.test:8080/c6e97785-1d4c-491a-a7c1-ed49d50ce788"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-8",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "fd38f6d8-1fb1-4c63-b8b2-d1383af97120",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://ltest.test:8080/8b5b989a-4679-4355-a5d6-5178bbfe6241"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-9",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "bb72f4db-0758-48c0-b5c6-70f2954f109f",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://ltest.test:8080/9add96bf-377f-4213-b3e2-8d2c624450b8"
// 	}
// ]

export const filesInQueueAtom = atom<TFileInQueue[]>([])
