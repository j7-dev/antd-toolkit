import { useState } from 'react'
import { UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
import { useAtom } from 'jotai'
import { getVideoUrl } from '@/main/utils'
import {
	useBunny,
	TUploadStatus,
	TBunnyVideo,
	TUploadVideoResponse,
	filesInQueueAtom,
} from '@/refine/bunny'
import { useInvalidate } from '@refinedev/core'

/**
 * 用於處理媒體上傳的 Hook
 * @see https://ant.design/components/upload-cn#api
 * 在 beforeUpload 返回 false 时，会返回 File 对象。在下个大版本我们会统一返回 { originFileObj: File } 对象。当前版本已经兼容所有场景下 info.file.originFileObj 获取原 File 写法。你可以提前切换。
 * @param uploadProps UploadProps - 上傳配置參數
 * @returns 返回上傳所需的配置和狀態
 */
export const useMediaUpload = (uploadProps?: UploadProps) => {
	const { bunny_library_id, bunny_stream_axios } = useBunny()
	const [filesInQueue, setFilesInQueue] = useAtom(filesInQueueAtom)

	// 這個是想做多檔同時上傳，但目前應該是比較不會用到
	const [fileList, setFileList] = useState<
		(UploadFile & {
			videoId?: string
		})[]
	>([])

	const mergedUploadProps: UploadProps = {
		customRequest: async (options) => {
			const file = options?.file as RcFile
			const preview = getVideoUrl(file) // 用瀏覽器轉換為預覽的 URL

			// 添加到佇列
			setFilesInQueue((prev) => [
				...prev,
				{
					key: file?.uid,
					file: file as RcFile,
					status: 'active' as
						| 'active'
						| 'normal'
						| 'exception'
						| 'success'
						| undefined,
					videoId: '',
					isEncoding: false,
					encodeProgress: 0,
					uploadProgress: 0,
					preview,
				},
			])

			try {
				// 創建影片 API
				const createVideoResult = await bunny_stream_axios.post<TBunnyVideo>(
					`/${bunny_library_id}/videos`,
					{
						title: (file as RcFile)?.name || 'unknown name',
					},
				)

				// 取得 bunny 影片 ID
				const vId = createVideoResult?.data?.guid || 'unknown id'

				// 把 vid, preview URL 更新到全局佇列狀態
				setFilesInQueue((prev) => {
					return prev.map((fileInQueue) => {
						if (fileInQueue?.key === file?.uid) {
							return {
								...fileInQueue,
								videoId: vId,
							}
						}

						return fileInQueue
					})
				})

				// 上傳影片 API
				const uploadVideo = await bunny_stream_axios.put<TUploadVideoResponse>(
					`/${bunny_library_id}/videos/${vId}?enabledResolutions=720p%2C1080p`,
					file,
					{
						headers: {
							'Content-Type': 'video/*',
						},
					},
				)

				if (uploadVideo?.data?.success) {
					// 設定為 100% 並顯示成功
					setFilesInQueue((prev) => {
						return prev.map((fileInQueue) => {
							if (fileInQueue.key === file?.uid) {
								return {
									...fileInQueue,
									uploadProgress: 100,
									isEncoding: true,
								}
							}

							return fileInQueue
						})
					})
				} else {
					// 顯示失敗
					setFilesInQueue((prev) => {
						return prev.map((fileInQueue) => {
							if (fileInQueue.key === file?.uid) {
								return {
									...fileInQueue,
									status: 'exception' as TUploadStatus,
								}
							}

							return fileInQueue
						})
					})
				}
			} catch (error) {
				// 顯示失敗
				setFilesInQueue((prev) => {
					return prev.map((fileInQueue) => {
						if (fileInQueue.key === file?.uid) {
							return {
								...fileInQueue,
								status: 'exception' as TUploadStatus,
							}
						}

						return fileInQueue
					})
				})
			}
		},
		onRemove: (file) => {
			setFileList(fileList.filter((fileItem) => fileItem.uid !== file.uid))
		},
		listType: 'text',
		itemRender: () => <></>,
		fileList,
		accept: 'video/*',
		multiple: true, // 是否支持多選文件，ie10+ 支持。按住 ctrl 多選文件
		// maxCount: 1, // 最大檔案數
		...uploadProps,
	}

	return { uploadProps: mergedUploadProps, fileList, setFileList }
}
