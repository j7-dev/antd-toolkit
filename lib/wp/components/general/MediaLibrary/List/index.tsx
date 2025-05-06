import { useState, useRef, useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import Filter from './Filter'
import { useInfiniteList, useInvalidate } from '@refinedev/core'
import { Button, Empty, Result, Alert, Upload } from 'antd'
import { useEnv } from '@/main'
import { LoadingCard } from '@/main/components'
import { cn } from '@/main/utils'
import { useOnChangeUpload } from '@/wp/components/general/OnChangeUpload/useOnChangeUpload'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'
import ItemInfo from '@/wp/components/general/MediaLibrary/List/ItemInfo'
import Item from '@/wp/components/general/MediaLibrary/List/Item'
import UploadFile from '@/wp/components/general/MediaLibrary/List/UploadFile'
import { filesInQueueAtom } from '@/wp/components/general/MediaLibraryNotification'
import { useSetAtom } from 'jotai'

const PAGE_SIZE = 50

const List = () => {
	const { SITE_URL } = useEnv()
	const invalidate = useInvalidate()
	const setFilesInQueue = useSetAtom(filesInQueueAtom)
	const { uploadProps, selectedItems } = useProps()

	// 上傳檔案
	const { uploadProps: wpUploadProps } = useOnChangeUpload({
		uploadProps,
		onUploading: (file) => {
			if (!setFilesInQueue) return
			// @ts-ignore
			setFilesInQueue((prev) => {
				// 如果已經存在就更新，不存在就新增
				const index = prev.findIndex((f) => f.uid === file.uid)
				if (index === -1) {
					return [...prev, file]
				} else {
					return prev.map((f, i) => {
						if (i === index) return file
						return f
					})
				}
			})
		},
		onDone: (file, attachment) => {
			invalidate({
				resource: 'posts',
				invalidates: ['list'],
			})
			if (!setFilesInQueue) return
			// @ts-ignore
			setFilesInQueue((prev) => {
				const index = prev.findIndex((f) => f.uid === file.uid)
				// 存在，則更新，不存在，什麼也不做
				if (index !== -1) {
					return prev.map((f, i) => {
						if (i === index) return file
						return f
					})
				}
				return prev
			})
		},
		onError: (file) => {
			if (!setFilesInQueue) return
			// @ts-ignore
			setFilesInQueue((prev) => {
				const index = prev.findIndex((f) => f.uid === file.uid)
				// 存在，則更新，不存在，什麼也不做
				if (index !== -1) {
					return prev.map((f, i) => {
						if (i === index) return file
						return f
					})
				}
				return prev
			})
		},
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
		isLoading,
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

	const isSearchFetching = isLoading && !isFetchingNextPage

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
				className={`at-absolute at-top-0 at-left-0 at-size-full ${isDragging ? 'at-opacity-100 at-z-10' : 'at-opacity-0 -at-z-50'}`}
			>
				<UploadFile uploadProps={wpUploadProps} />
			</div>
			<div className={cn(isDragging ? 'at-opacity-0' : 'at-opacity-100')}>
				<div className="at-flex at-justify-end at-mb-8 at-gap-x-2">
					<Button href={`${SITE_URL}/wp-admin/upload.php`} target="_blank">
						前往傳統媒體庫介面
					</Button>
					<Upload {...wpUploadProps}>
						<Button icon={<CloudUploadOutlined />}>上傳檔案</Button>
					</Upload>
				</div>
				<Filter
					setSearch={setSearch}
					disabled={isLoading}
					loading={isSearchFetching}
				/>
				<div className="at-flex at-flex-col xl:at-flex-row">
					<div className="at-w-full xl:at-w-[28rem] xl:at-order-2 at-mb-8 xl:at-mb-0">
						{selectedItems?.length > 0 && (
							<ItemInfo allItems={allItems} item={selectedItems.slice(-1)[0]} />
						)}
					</div>
					<div className="at-flex-1 xl:at-order-1">
						<div className="at-grid at-grid-cols-3 md:at-grid-cols-4 xl:at-flex xl:at-flex-wrap at-gap-4">
							{!isSearchFetching &&
								allItems.map((item, index) => (
									<Item
										key={item.id}
										item={item}
										index={index}
										allItems={allItems}
									/>
								))}

							{isLoading &&
								new Array(PAGE_SIZE).fill(0).map((_, index) => (
									<div key={index} className="at-w-full xl:at-w-36">
										<LoadingCard className="at-aspect-square" />
										<LoadingCard className="at-h-3 !at-p-0 at-rounded-sm">
											&nbsp;
										</LoadingCard>
									</div>
								))}
						</div>

						{!allItems?.length && !isLoading && (
							<Empty className="at-my-24" description="找不到檔案資料" />
						)}

						{hasNextPage && (
							<div className="at-text-center at-mt-8">
								<Button
									type="link"
									onClick={() => fetchNextPage()}
									disabled={isLoading}
								>
									顯示更多
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default List
