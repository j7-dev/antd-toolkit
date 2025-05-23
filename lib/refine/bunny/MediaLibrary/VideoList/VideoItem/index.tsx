import React, { FC, useState, HTMLAttributes } from 'react'
import { TBunnyVideo, useBunny } from '@/refine'
import { SimpleImage, CheckIcon } from '@/main/components'
import { Typography, message } from 'antd'
import { uniqBy } from 'lodash-es'
import { useProps } from '@/refine/bunny/MediaLibrary/hooks'

const PREVIEW_FILENAME = 'preview.webp'
const { Text } = Typography

const VideoItem = ({
	item,
	allItems,
	index,
}: {
	item: TBunnyVideo
	allItems: TBunnyVideo[]
	index: number
}) => {
	const { selectedItems, setSelectedItems, limit } = useProps()
	const { bunny_cdn_hostname } = useBunny()
	const [filename, setFilename] = useState(item?.thumbnailFileName)
	const isSelected = selectedItems?.some(
		(selectedVideo) => selectedVideo.guid === item.guid,
	)

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 上一個選中的
		const prevSelected = selectedItems?.length
			? selectedItems?.slice(-1)?.[0]
			: null

		const prevSelectedIndex = allItems.findIndex(
			(v) => v.guid === prevSelected?.guid,
		) // 沒找到會返回 -1
		// 確保 prevSelectedIndex 不會是-1
		const formattedPrevSelectedIndex =
			prevSelectedIndex === -1 ? 0 : prevSelectedIndex

		if (e.shiftKey && formattedPrevSelectedIndex !== index) {
			// 從上一個選中的 item 開始選擇到 這個 item
			setSelectedItems((prev) => {
				// 确定开始和结束的索引
				const start = Math.min(formattedPrevSelectedIndex, index)
				const end = Math.max(formattedPrevSelectedIndex, index)
				const newSelected = allItems.slice(start, end + 1)
				return uniqBy([...prev, ...newSelected], 'guid')
			})
			return
		}

		if (isSelected) {
			setSelectedItems((prev) => prev.filter((v) => v.guid !== item.guid))
		} else {
			if (limit && selectedItems.length >= limit) {
				message.warning({
					key: 'limit',
					content: `最多只能選取${limit}個影片`,
				})
				setSelectedItems((prev) => [...prev.slice(1), item])
				return
			}
			setSelectedItems((prev) => [...prev, item])
		}
	}

	return (
		<div className="at-w-36 at-relative">
			<SimpleImage
				onClick={handleClick}
				onMouseEnter={() => {
					setFilename(PREVIEW_FILENAME)
				}}
				onMouseLeave={() => {
					setFilename(item?.thumbnailFileName)
				}}
				className={`at-rounded-md at-overflow-hidden at-cursor-pointer ${
					isSelected
						? 'at-outline at-outline-4 at-outline-yellow-300 at-outline-offset-1'
						: ''
				}`}
				loadingClassName="at-text-sm at-text-gray-500 at-font-bold"
				src={`https://${bunny_cdn_hostname}/${item.guid}/${filename}`}
			/>
			<Text className="at-text-xs at-text-gray-800" ellipsis>
				{item.title}
			</Text>
			{isSelected && (
				<div className="at-bg-white at-absolute at--top-2 at--right-2 at-z-30 at-size-6 at-rounded-full at-flex at-items-center at-justify-center">
					<CheckIcon className="at-size-5 [&_path]:at-fill-yellow-300" />
				</div>
			)}
		</div>
	)
}

export default VideoItem
