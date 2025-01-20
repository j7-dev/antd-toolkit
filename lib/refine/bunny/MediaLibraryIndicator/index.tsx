import React, { useState, useEffect, memo } from 'react'
import { filesInQueueAtom, useListVideo } from '@/refine'
import { useAtom } from 'jotai'
import { Progress, Tooltip, Alert } from 'antd'
import {
	CodeOutlined,
	CloudUploadOutlined,
	LoadingOutlined,
	UpOutlined,
	DownOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons'
import { getEstimateUploadTimeInSeconds } from '@/main/utils'

const REFETCH_INTERVAL = 30000 // 30 秒

const MediaLibraryIndicatorComponent = () => {
	const [isExpanded, setIsExpanded] = useState(false)

	const [filesInQueue, setFilesInQueue] = useAtom(filesInQueueAtom)
	const enabled =
		filesInQueue.some((fileInQueue) => fileInQueue.isEncoding) &&
		filesInQueue.every((fileInQueue) => fileInQueue.encodeProgress !== 100) &&
		!!filesInQueue.length

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

	useEffect(() => {
		if (!isFetching) {
			setFilesInQueue((prev) => {
				return prev
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
			})
		}
	}, [isFetching])

	if (!filesInQueue.length) {
		return null
	}

	return (
		<div className="tw-fixed w-[20rem] bottom-0 right-8 bg-white rounded-t-md px-6 pt-3 pb-2 shadow-md text-gray-800 text-sm cursor-pointer z-[1001]">
			<div
				className="flex items-center justify-between"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div>
					<LoadingOutlined className="mr-2 text-primary" /> 目前有{' '}
					{filesInQueue.length} 個檔案正在上傳中...
				</div>
				{isExpanded ? <DownOutlined /> : <UpOutlined />}
			</div>
			<div
				className={` mt-2 border-t border-gray-200 -mx-6 ${
					isExpanded ? 'block' : 'tw-hidden'
				}`}
			>
				<Alert
					className="text-xs text-center"
					banner
					message={
						<>
							<ExclamationCircleFilled className="mr-2 text-[#faad14]" />
							請不要重新整理頁面
						</>
					}
					type="warning"
					showIcon={false}
				/>
				<div className="px-6 pt-2">
					{filesInQueue.map(
						({ key, encodeProgress, file, uploadProgress, isEncoding }) => (
							<div className="flex items-center mb-1" key={key}>
								<Tooltip
									title={isEncoding ? 'Bunny 編碼中' : '檔案上傳中'}
									className="w-32 line-clamp-1 mr-2 text-xs flex items-center gap-2"
								>
									{isEncoding ? <CodeOutlined /> : <CloudUploadOutlined />}
									{file?.name}
								</Tooltip>
								<Progress
									className="w-32"
									percent={isEncoding ? encodeProgress : uploadProgress}
									size="small"
								/>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	)
}

export const MediaLibraryIndicator = memo(MediaLibraryIndicatorComponent)
