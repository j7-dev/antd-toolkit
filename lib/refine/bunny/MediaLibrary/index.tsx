import { FC, memo, useRef, useEffect, useState } from 'react'
import { Tabs, TabsProps, Upload, UploadProps } from 'antd'
import { FaPhotoVideo } from 'react-icons/fa'
import { CloudUploadOutlined, SettingOutlined } from '@ant-design/icons'
import VideoList from './VideoList'
import { atom } from 'jotai'
import { TFileInQueue, TMediaLibraryProps, useBunny } from '@/refine'
import { Button } from 'antd'
import Settings from './Settings'
import { useMediaUpload } from '@/refine/bunny/MediaLibrary/hooks'
import UploadVideo from './UploadVideo'

/**
 * MediaLibrary 元件的屬性介面
 * @interface TMediaLibraryCompoundProps
 * @property {TMediaLibraryProps} mediaLibraryProps - 媒體庫的基本屬性
 * @property {UploadProps} [uploadProps] - 可選的上傳元件屬性
 * @property {TabsProps} [tabsProps] - 可選的標籤頁元件屬性
 */
type TMediaLibraryCompoundProps = {
	mediaLibraryProps: TMediaLibraryProps
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

/**
 * Bunny Stream 媒體庫元件
 * 提供影片上傳、管理和設定功能
 * @component
 * @param {TMediaLibraryCompoundProps} props - 元件屬性
 * @returns {JSX.Element} MediaLibrary 元件
 */
const MediaLibraryComponent: FC<TMediaLibraryCompoundProps> = ({
	mediaLibraryProps,
	uploadProps,
	tabsProps,
}) => {
	const dropZoneRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)

	const { uploadProps: bunnyUploadProps } = useMediaUpload(uploadProps)

	useEffect(() => {
		if (dropZoneRef.current) {
			const handleDragEnter = (e: DragEvent) => {
				e.preventDefault()
				e.stopPropagation()
				const relatedTarget = e.relatedTarget as Node
				if (!dropZoneRef.current?.contains(relatedTarget)) {
					setIsDragging(true)
				}
			}

			const handleDragLeave = (e: DragEvent) => {
				e.preventDefault()
				e.stopPropagation()
				const relatedTarget = e.relatedTarget as Node
				if (!dropZoneRef.current?.contains(relatedTarget)) {
					setIsDragging(false)
				}
			}

			const handleDrop = (e: DragEvent) => {
				e.preventDefault()
				e.stopPropagation()
				setIsDragging(false)
			}

			dropZoneRef.current.addEventListener('dragenter', handleDragEnter)
			dropZoneRef.current.addEventListener('dragleave', handleDragLeave)
			dropZoneRef.current.addEventListener('drop', handleDrop)

			return () => {
				dropZoneRef.current?.removeEventListener('dragenter', handleDragEnter)
				dropZoneRef.current?.removeEventListener('dragleave', handleDragLeave)
				dropZoneRef.current?.removeEventListener('drop', handleDrop)
			}
		}
	}, [])

	const { bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname } =
		useBunny()

	const disabledBunny =
		!bunny_library_id || !bunny_stream_api_key || !bunny_cdn_hostname

	const items: TabsProps['items'] = [
		{
			key: 'bunny-media-library',
			label: 'Bunny 媒體庫',
			children: <VideoList {...mediaLibraryProps} />,
			icon: <FaPhotoVideo />,
			disabled: disabledBunny,
		},
		{
			key: 'bunny-settings',
			label: 'Bunny 設定',
			children: <Settings />,
			icon: <SettingOutlined />,
		},
	]

	return (
		<div className="at-relative">
			<div ref={dropZoneRef} className="at-relative">
				{/* <div
					className={`at-absolute at-top-0 at-left-0 at-size-full ${isDragging ? 'at-opacity-100 at-z-50' : 'at-opacity-0 -at-z-50'}`}
				> */}
				<div className="at-mb-4">
					<UploadVideo uploadProps={bunnyUploadProps} />
				</div>
				{/* </div> */}
				<Tabs
					className={isDragging ? 'at-opacity-0' : 'at-opacity-100'}
					tabBarExtraContent={
						<Upload {...bunnyUploadProps}>
							<Button disabled={disabledBunny} icon={<CloudUploadOutlined />}>
								上傳影片
							</Button>
						</Upload>
					}
					defaultActiveKey={
						disabledBunny ? 'bunny-settings' : 'bunny-media-library'
					}
					items={items}
					type="card"
					{...tabsProps}
				/>
			</div>
		</div>
	)
}

export const MediaLibrary = memo(MediaLibraryComponent)

/**
 * 上傳佇列的全域狀態
 * 使用 jotai 管理上傳中的檔案狀態
 */
export const filesInQueueAtom = atom<TFileInQueue[]>([])

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
		preview: 'blob:http://test.local/c6e97785-1d4c-491a-a7c1-ed49d50ce788',
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
		preview: 'blob:http://test.local/8b5b989a-4679-4355-a5d6-5178bbfe6241',
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
		preview: 'blob:http://test.local/9add96bf-377f-4213-b3e2-8d2c624450b8',
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
// 		"preview": "blob:http://test.local/c6e97785-1d4c-491a-a7c1-ed49d50ce788"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-8",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "fd38f6d8-1fb1-4c63-b8b2-d1383af97120",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://test.local/8b5b989a-4679-4355-a5d6-5178bbfe6241"
// 	},
// 	{
// 		"key": "rc-upload-1723542720209-9",
// 		"file": {},
// 		"status": "active",
// 		"videoId": "bb72f4db-0758-48c0-b5c6-70f2954f109f",
// 		"isEncoding": true,
// 		"encodeProgress": 0,
// 		"preview": "blob:http://test.local/9add96bf-377f-4213-b3e2-8d2c624450b8"
// 	}
// ]
