import { useState, useRef, useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import Filter from './Filter'
import { useInfiniteList } from '@refinedev/core'
import { Button, Empty, Result, Alert, Upload } from 'antd'
import { LoadingCard } from '@/main/components'
import FileUploadProgress from './FileUploadProgress'
import { cn } from '@/main/utils'
import { useOnChangeUpload } from '@/wp/components/general/OnChangeUpload/useOnChangeUpload'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'
import ItemInfo from '@/wp/components/general/MediaLibrary/List/ItemInfo'
import Item from '@/wp/components/general/MediaLibrary/List/Item'
import UploadFile from '@/wp/components/general/MediaLibrary/List/UploadFile'

const PAGE_SIZE = 50

const List = () => {
	const { uploadProps, selectedItems, selectButtonProps, filesInQueue } =
		useProps()
	const { uploadProps: wpUploadProps } = useOnChangeUpload({
		uploadProps,
	})

	// Drag and Drop Upload
	const dropZoneRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)

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
	// End Drag and Drop Upload

	const [search, setSearch] = useState('')
	const {
		data,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isFetching,
	} = useInfiniteList<TAttachment>({
		resource: 'posts',
		pagination: {
			pageSize: PAGE_SIZE,
		},
		filters: [
			{
				field: 's',
				operator: 'eq',
				value: search,
			},
			{
				field: 'post_type',
				operator: 'eq',
				value: 'attachment',
			},
			{
				field: 'post_status',
				operator: 'eq',
				value: 'inherit',
			},
		],
	})

	const allItems = ([] as TAttachment[]).concat(
		...(data?.pages ?? []).map((page) => page?.data || []),
	)

	const isSearchFetching = isFetching && !isFetchingNextPage

	if (isError) {
		return (
			<Result
				status="error"
				title="獲取檔案失敗"
				subTitle="API 回應錯誤，請聯繫網站管理人員或稍候再嘗試"
			/>
		)
	}

	return (
		<div ref={dropZoneRef} className="at-relative">
			<Alert
				message="檔案上傳中可以離開此頁，但不要「重新整理」頁面，「重新整理」會導致上傳中斷"
				banner
				className="at-mb-8"
			/>
			<div
				className={`at-absolute at-top-0 at-left-0 at-size-full ${isDragging ? 'at-opacity-100 at-z-50' : 'at-opacity-0 -at-z-50'}`}
			>
				<UploadFile uploadProps={wpUploadProps} />
			</div>
			<div className={cn(isDragging ? 'at-opacity-0' : 'at-opacity-100')}>
				<div className="at-flex at-justify-end at-mb-4">
					<Upload {...wpUploadProps}>
						<Button icon={<CloudUploadOutlined />}>上傳檔案</Button>
					</Upload>
				</div>
				<Filter
					setSearch={setSearch}
					disabled={isFetching}
					loading={isSearchFetching}
					selectButtonProps={selectButtonProps}
				/>
				<div className="at-flex">
					<div className="at-flex-1">
						<div className="at-flex at-flex-wrap at-gap-4">
							{filesInQueue?.map((fileInQueue) => (
								<div
									key={fileInQueue?.key}
									className="at-w-36 at-aspect-video at-bg-gray-200 at-rounded-md at-px-4 at-py-2 at-flex at-flex-col at-items-center at-justify-center"
								>
									<FileUploadProgress
										key={fileInQueue?.key}
										fileInQueue={fileInQueue}
									/>
								</div>
							))}

							{!isSearchFetching &&
								allItems.map((item, index) => (
									<Item
										key={item.id}
										item={item}
										index={index}
										allItems={allItems}
									/>
								))}

							{isFetching &&
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
							<Empty className="at-my-24" description="找不到檔案資料" />
						)}

						{hasNextPage && (
							<div className="at-text-center at-mt-8">
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
					<div className="at-w-[28rem]">
						{selectedItems?.length > 0 && (
							<ItemInfo item={selectedItems.slice(-1)[0]} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default List
