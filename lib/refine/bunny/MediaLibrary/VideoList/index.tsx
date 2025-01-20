import React, { FC, useState } from 'react'
import Filter from './Filter'
import { useInfiniteList } from '@refinedev/core'
import { Button, Empty, Result, Alert } from 'antd'
import { TBunnyVideo } from '@/refine/bunny/types'
import { useAtomValue } from 'jotai'
import VideoInfo from './VideoInfo'
import VideoItem from './VideoItem'
import { LoadingCard } from 'antd-toolkit'
import FileEncodeProgress from './FileEncodeProgress'
import FileUploadProgress from './FileUploadProgress'
import { useBunny, filesInQueueAtom, TMediaLibraryProps } from '@/refine'

const PAGE_SIZE = 50

const VideoList: FC<TMediaLibraryProps> = ({
	selectedVideos,
	setSelectedVideos,
	selectButtonProps,
	limit,
}) => {
	const { bunny_library_id } = useBunny()
	const [search, setSearch] = useState('')
	const filesInQueue = useAtomValue(filesInQueueAtom)
	const {
		data,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isFetching,
	} = useInfiniteList<TBunnyVideo>({
		dataProviderName: 'bunny-stream',
		resource: `${bunny_library_id}/videos`,
		pagination: {
			pageSize: PAGE_SIZE,
		},
		filters: [
			{
				field: 'search',
				operator: 'eq',
				value: search,
			},
		],
	})

	const allVideos = ([] as TBunnyVideo[]).concat(
		...(data?.pages ?? []).map((page) => page?.data || []),
	)

	const isSearchFetching = isFetching && !isFetchingNextPage

	if (isError) {
		return (
			<Result
				status="error"
				title="獲取影片失敗"
				subTitle="Bunny Stream API 回應錯誤，請聯繫網站管理人員或稍候再嘗試"
			/>
		)
	}

	return (
		<>
			<Alert
				message="影片上傳中可以離開此頁，但不要「重新整理」頁面，「重新整理」會導致上傳中斷"
				banner
				className="mb-8"
			/>
			<Filter
				selectedVideos={selectedVideos}
				setSelectedVideos={setSelectedVideos}
				setSearch={setSearch}
				disabled={isFetching}
				loading={isSearchFetching}
				selectButtonProps={selectButtonProps}
			/>
			<div className="flex">
				<div className="flex-1">
					<div className="flex flex-wrap gap-4">
						{filesInQueue.map((fileInQueue) =>
							fileInQueue?.isEncoding ? (
								<div
									key={fileInQueue?.key}
									className="w-36 aspect-video bg-gray-200 rounded-md px-4 py-2 flex flex-col justify-center items-center"
								>
									<FileEncodeProgress fileInQueue={fileInQueue} />
								</div>
							) : (
								<div
									key={fileInQueue?.key}
									className="w-36 aspect-video bg-gray-200 rounded-md px-4 py-2 flex flex-col justify-center items-center"
								>
									<FileUploadProgress
										key={fileInQueue?.key}
										fileInQueue={fileInQueue}
									/>
								</div>
							),
						)}

						{!isSearchFetching &&
							allVideos.map((video, index) => (
								<VideoItem
									key={video.guid}
									video={video}
									index={index}
									allVideos={allVideos}
									selectedVideos={selectedVideos}
									limit={limit}
									setSelectedVideos={setSelectedVideos}
								/>
							))}

						{isFetching &&
							new Array(PAGE_SIZE).fill(0).map((_, index) => (
								<div key={index} className="w-36">
									<LoadingCard ratio="aspect-video" />
									<LoadingCard ratio="h-3 !p-0 rounded-sm">&nbsp;</LoadingCard>
								</div>
							))}
					</div>

					{!allVideos?.length && !isFetching && (
						<Empty className="my-24" description="找不到影片資料" />
					)}

					{hasNextPage && (
						<div className="text-center mt-8">
							<Button
								type="link"
								onClick={() => fetchNextPage()}
								disabled={isFetching}
							>
								顯示更多
							</Button>
						</div>
					)}
				</div>
				<div className="w-[28rem]">
					{selectedVideos?.length > 0 && (
						<VideoInfo video={selectedVideos.slice(-1)[0]} />
					)}
				</div>
			</div>
		</>
	)
}

export default VideoList
