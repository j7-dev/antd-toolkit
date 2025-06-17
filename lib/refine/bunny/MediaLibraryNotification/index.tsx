import { useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import FileUploadProgress from '@/refine/bunny/MediaLibraryNotification/FileUploadProgress'
import { atom, useAtom } from 'jotai'
import { TFileInQueue, useBunny, useListVideo } from '@/refine/bunny'
import { useInvalidate } from '@refinedev/core'
import { useColor } from '@/main'
import { getEstimateUploadTimeInSeconds } from '@/main/utils'

/**
 * 上傳佇列的全域狀態
 * 使用 jotai 管理上傳中的檔案狀態
 */
export const filesInQueueAtom = atom<TFileInQueue[]>([])

// 每 30 秒去問 BUNNY 上傳 & 編碼進度
const REFETCH_INTERVAL = 30000 // 30 秒

export const MediaLibraryNotification = () => {
	const { colorPrimary } = useColor()
	const { bunny_library_id } = useBunny()
	const invalidate = useInvalidate()
	const [filesInQueue, setFilesInQueue] = useAtom(filesInQueueAtom)

	const enabled =
		filesInQueue.some((fileInQueue) => fileInQueue.isEncoding) &&
		filesInQueue.every((fileInQueue) => fileInQueue.encodeProgress !== 100) &&
		!!filesInQueue.length

	console.log('🐛 enabled', enabled)
	console.log('🐛 filesInQueue', filesInQueue)

	const { data, isFetching } = useListVideo({
		queryOptions: {
			enabled,
			refetchInterval: REFETCH_INTERVAL,
		},
	})

	const items = data?.data || []

	useEffect(() => {
		// 把 100% 從佇列中移除

		const allUploaded = filesInQueue.every(
			(fileInQueue) => fileInQueue.isEncoding,
		)
		let timer: any = null
		if (allUploaded) {
			return () => {
				clearInterval(timer)
			}
		}

		// 用來模擬上傳進度
		// 設定定時器新的百分比
		timer = setInterval(() => {
			setFilesInQueue((prev) => {
				return prev.map((fileInQueue) => {
					const { file } = fileInQueue

					// 估計上傳時間
					const estimatedTimeInSeconds = getEstimateUploadTimeInSeconds(
						file?.size || 11907162,
					)

					// 每 3 秒增加 XX %
					const step = (100 / estimatedTimeInSeconds) * 3

					// 新的百分比
					const newPercent = fileInQueue.uploadProgress + step

					// 如果新的百分比 >= 100 則返回
					if (newPercent < 100) {
						return {
							...fileInQueue,
							uploadProgress: Number(newPercent.toFixed(1)),
						}
					}
					return fileInQueue
				})
			})
		}, 3000)

		// 清除定時器
		return () => {
			clearInterval(timer)
		}
	}, [filesInQueue])

	// upload indicator
	useEffect(() => {
		if (filesInQueue?.length) {
			notification.open({
				key: 'bunny-files-uploading',
				icon: <CloudUploadOutlined style={{ color: colorPrimary }} />,
				message: '檔案上傳中',
				description: (
					<>
						{filesInQueue?.map((fileInQueue) => (
							<FileUploadProgress
								key={`${fileInQueue?.key}-${new Date().getTime()}`}
								fileInQueue={fileInQueue}
							/>
						))}
					</>
				),
				duration: null,
				onClose: () => {
					if (!setFilesInQueue) return
					// @ts-ignore
					setFilesInQueue([])
				},
			})
		} else {
			notification.destroy('bunny-files-uploading')
		}
	}, [filesInQueue])

	useEffect(() => {
		if (!isFetching) {
			setFilesInQueue((prev) => {
				const newFilesInQueue = prev
					.map((fileInQueue) => {
						const item = items.find(
							(video) => video.guid === fileInQueue.videoId,
						)
						if (!item) {
							return fileInQueue
						}
						return {
							...fileInQueue,
							encodeProgress: item.encodeProgress,
						}
					})
					.filter((fileInQueue) => fileInQueue.encodeProgress !== 100)

				// 如果已經有編碼 100% 的 invalidate
				if (newFilesInQueue.length < prev.length) {
					invalidate({
						dataProviderName: 'bunny-stream',
						resource: `${bunny_library_id}/videos`,
						invalidates: ['list'],
					})
				}

				return newFilesInQueue
			})
		}
	}, [isFetching])

	return <></>
}
