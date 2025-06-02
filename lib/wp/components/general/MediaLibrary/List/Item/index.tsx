import React, { memo } from 'react'
import { Typography, message } from 'antd'
import { uniqBy } from 'lodash-es'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'
import { isImageFile, getFileExtension } from '@/main/utils'
import { ExtIcon, CheckIcon } from '@/main/components'
import { TImage } from '@/wp'
const { Text } = Typography

const Item = ({
	item,
	allItems,
	index,
}: {
	item: TAttachment | TImage
	allItems: (TAttachment | TImage)[]
	index: number
}) => {
	const { selectedItems, setSelectedItems, limit } = useProps()
	const isSelected = selectedItems?.some(
		(selectedItem) => selectedItem.id === item.id,
	)

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 上一個選中的
		const prevSelected = selectedItems?.length
			? selectedItems?.slice(-1)?.[0]
			: null

		const prevSelectedIndex = allItems.findIndex(
			(v) => v.id === prevSelected?.id,
		) // 沒找到會返回 -1
		// 確保 prevSelectedIndex 不會是-1
		const formattedPrevSelectedIndex =
			prevSelectedIndex === -1 ? 0 : prevSelectedIndex

		if (e.shiftKey && formattedPrevSelectedIndex !== index) {
			// 從上一個選中的 item 開始選擇到 這個 item
			// @ts-ignore

			setSelectedItems((prev) => {
				// 确定开始和结束的索引
				const start = Math.min(formattedPrevSelectedIndex, index)
				const end = Math.max(formattedPrevSelectedIndex, index)
				const newSelected = allItems.slice(start, end + 1)
				return uniqBy([...prev, ...newSelected], 'id')
			})
			return
		}
		if (isSelected) {
			// @ts-ignore
			setSelectedItems((prev) => prev.filter((v) => v.id !== item.id))
		} else {
			if (limit && selectedItems.length >= limit) {
				message.warning({
					key: 'limit',
					content: `最多只能選取${limit}個檔案`,
				})
				// @ts-ignore
				setSelectedItems((prev) => [...prev.slice(1), item])
				return
			}
			// @ts-ignore
			setSelectedItems((prev) => [...prev, item])
		}
	}

	const isImage = isImageFile(item?.url)
	const ext = getFileExtension(item?.url)

	return (
		<div className="at-w-full xl:at-w-36 at-relative">
			{isImage && (
				<img
					onClick={handleClick}
					className={`at-rounded-md at-w-full at-object-contain at-cursor-pointer at-aspect-square ${
						isSelected
							? 'at-outline at-outline-4 at-outline-yellow-300 at-outline-offset-1'
							: ''
					}`}
					// @ts-ignore
					src={item?.img_url}
				/>
			)}
			{!isImage && (
				<div
					onClick={handleClick}
					className={`at-cursor-pointer at-rounded-md  ${
						isSelected
							? 'at-outline at-outline-4 at-outline-yellow-300 at-outline-offset-1'
							: ''
					}`}
				>
					<ExtIcon
						ext={ext}
						className={`at-w-full at-object-contain at-aspect-square`}
					/>
				</div>
			)}

			<Text className="at-text-xs at-text-gray-800" ellipsis>
				{/* @ts-ignore */}
				{item?.title}
			</Text>
			{isSelected && (
				<div className="at-bg-white at-absolute -at-top-2 -at-right-2 at-z-[15] at-size-6 at-rounded-full at-flex at-items-center at-justify-center">
					<CheckIcon className="at-size-5 [&_path]:at-fill-yellow-300" />
				</div>
			)}
		</div>
	)
}

export default memo(Item)
