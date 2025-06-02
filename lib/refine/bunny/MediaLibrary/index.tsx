import { FC, memo, useRef, useEffect, useState } from 'react'
import { Tabs, TabsProps, Upload } from 'antd'
import { FaPhotoVideo } from 'react-icons/fa'
import { CloudUploadOutlined, SettingOutlined } from '@ant-design/icons'
import VideoList from './VideoList'
import { useBunny } from '@/refine/bunny'
import { Button } from 'antd'
import Settings from './Settings'
import { useMediaUpload } from '@/refine/bunny/MediaLibrary/hooks'
import UploadVideo from './UploadVideo'
import { TMediaLibraryProps } from '@/refine/bunny/MediaLibrary/types'
import { MediaLibraryContext } from '@/refine/bunny/MediaLibrary/hooks'

export * from '@/refine/bunny/MediaLibrary/types'

const MediaLibraryComponent: FC<TMediaLibraryProps> = (props) => {
	const { uploadProps, tabsProps } = props
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
			children: <VideoList />,
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
		<MediaLibraryContext.Provider value={props}>
			<div className="at-relative">
				<div ref={dropZoneRef} className="at-relative">
					<div
						className={`at-absolute at-top-0 at-left-0 at-size-full ${isDragging ? 'at-opacity-100 at-z-50' : 'at-opacity-0 -at-z-50'}`}
					>
						<UploadVideo uploadProps={bunnyUploadProps} />
					</div>
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
		</MediaLibraryContext.Provider>
	)
}

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
export const MediaLibrary = memo(
	MediaLibraryComponent,
) as typeof MediaLibraryComponent
