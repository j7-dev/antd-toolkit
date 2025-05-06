import React, { FC, HTMLAttributes, memo } from 'react'
import { Typography, message } from 'antd'
import { uniqBy } from 'lodash-es'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'

const { Text } = Typography

const CheckIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
	return (
		<svg
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			{...props}
		>
			<g strokeWidth="0"></g>
			<g strokeLinecap="round" strokeLinejoin="round"></g>
			<g>
				{' '}
				<path
					fill="#000000"
					fillRule="evenodd"
					d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
				></path>{' '}
			</g>
		</svg>
	)
}

const Item = ({
	item,
	allItems,
	index,
}: {
	item: TAttachment
	allItems: TAttachment[]
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

	return (
		<div className="at-w-full xl:at-w-36 at-relative">
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
