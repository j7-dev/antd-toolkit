import { FC, useState, useEffect } from 'react'
import Filter from './Filter'
import { useInfiniteList } from '@refinedev/core'
import { Button, Empty, Result, Alert } from 'antd'
import { TBunnyVideo } from '@/refine/bunny/types'
import VideoInfo from './VideoInfo'
import VideoItem from './VideoItem'
import { LoadingCard } from '@/main/components'
import { useBunny } from '@/refine'
import { useProps } from '@/refine/bunny/MediaLibrary/hooks'

const PAGE_SIZE = 50

const VideoList: FC = () => {
	const { selectedItems } = useProps()
	const { bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname } =
		useBunny()
	const [search, setSearch] = useState('')

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
		queryOptions: {
			enabled:
				!!bunny_library_id && !!bunny_stream_api_key && !!bunny_cdn_hostname,
		},
	})

	const allItems = ([] as TBunnyVideo[]).concat(
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
				className="at-mb-8"
			/>

			<Filter
				setSearch={setSearch}
				disabled={isFetching}
				loading={isSearchFetching}
			/>
			<div className="at-flex">
				<div className="at-flex-1">
					<div className="at-flex at-px-2 at-flex-wrap at-gap-4">
						{!isSearchFetching &&
							allItems.map((item, index) => (
								<VideoItem
									key={item.guid}
									item={item}
									index={index}
									allItems={allItems}
								/>
							))}

						{(isFetching || isFetchingNextPage) &&
							new Array(PAGE_SIZE).fill(0).map((_, index) => (
								<div key={index} className="at-w-36">
									<LoadingCard />
									<LoadingCard className="at-h-3 !at-p-0 at-rounded-sm">
										&nbsp;
									</LoadingCard>
								</div>
							))}
					</div>

					{!allItems?.length && !isFetching && (
						<Empty className="at-my-24" description="找不到影片資料" />
					)}

					{hasNextPage && (
						<div className="at-text-center at-mt-8">
							<Button
								type="link"
								onClick={() => fetchNextPage()}
								disabled={isFetching}
								loading={isFetchingNextPage}
							>
								顯示更多
							</Button>
						</div>
					)}
				</div>
				<div className="at-w-[28rem]">
					{selectedItems?.length > 0 && (
						<VideoInfo item={selectedItems.slice(-1)[0]} />
					)}
				</div>
			</div>
		</>
	)
}

export default VideoList
