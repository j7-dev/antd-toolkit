import React, { FC, useState, HTMLAttributes } from 'react'
import { TBunnyVideo, useBunny } from '@/refine'
import { SimpleImage } from '@/main/components'
import { Typography, message } from 'antd'
import { uniqBy } from 'lodash-es'

const PREVIEW_FILENAME = 'preview.webp'
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

const VideoItem = ({
	children,
	video,
	allVideos,
	index,
	selectedVideos,
	setSelectedVideos,
	limit,
}: {
	children?: React.ReactNode
	video: TBunnyVideo
	allVideos: TBunnyVideo[]
	index: number
	selectedVideos: TBunnyVideo[]
	setSelectedVideos:
		| React.Dispatch<React.SetStateAction<TBunnyVideo[]>>
		| ((
				_videosOrFunction:
					| TBunnyVideo[]
					| ((_videos: TBunnyVideo[]) => TBunnyVideo[]),
		  ) => void)
	limit: number | undefined
}) => {
	const { bunny_cdn_hostname } = useBunny()
	const [filename, setFilename] = useState(video?.thumbnailFileName)
	const isSelected = selectedVideos?.some(
		(selectedVideo) => selectedVideo.guid === video.guid,
	)

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 上一個選中的
		const prevSelected = selectedVideos?.length
			? selectedVideos?.slice(-1)?.[0]
			: null

		const prevSelectedIndex = allVideos.findIndex(
			(v) => v.guid === prevSelected?.guid,
		) // 沒找到會返回 -1
		// 確保 prevSelectedIndex 不會是-1
		const formattedPrevSelectedIndex =
			prevSelectedIndex === -1 ? 0 : prevSelectedIndex

		if (e.shiftKey && formattedPrevSelectedIndex !== index) {
			// 從上一個選中的 item 開始選擇到 這個 item
			setSelectedVideos((prev) => {
				// 确定开始和结束的索引
				const start = Math.min(formattedPrevSelectedIndex, index)
				const end = Math.max(formattedPrevSelectedIndex, index)
				const newSelected = allVideos.slice(start, end + 1)
				return uniqBy([...prev, ...newSelected], 'guid')
			})
			return
		}
		if (isSelected) {
			setSelectedVideos((prev) => prev.filter((v) => v.guid !== video.guid))
		} else {
			if (limit && selectedVideos.length >= limit) {
				message.warning({
					key: 'limit',
					content: `最多只能選取${limit}個影片`,
				})
				setSelectedVideos((prev) => [...prev.slice(1), video])
				return
			}
			setSelectedVideos((prev) => [...prev, video])
		}
	}

	return (
		<div className="w-36 relative">
			<SimpleImage
				onClick={handleClick}
				onMouseEnter={() => {
					setFilename(PREVIEW_FILENAME)
				}}
				onMouseLeave={() => {
					setFilename(video?.thumbnailFileName)
				}}
				className={`rounded-md overflow-hidden cursor-pointer ${
					isSelected
						? 'outline outline-4 outline-yellow-300 outline-offset-1'
						: ''
				}`}
				loadingClassName="text-sm text-gray-500 font-bold"
				src={`https://${bunny_cdn_hostname}/${video.guid}/${filename}`}
			>
				{children}
			</SimpleImage>
			<Text className="text-xs text-gray-800" ellipsis>
				{video.title}
			</Text>
			{isSelected && (
				<div className="bg-white absolute -top-2 -right-2 z-30 w-6 h-6 -1 rounded-full flex items-center justify-center">
					<CheckIcon className="w-5 h-5 [&_path]:fill-yellow-300" />
				</div>
			)}
		</div>
	)
}

export default VideoItem
