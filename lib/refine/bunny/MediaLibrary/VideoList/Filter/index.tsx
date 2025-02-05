import React, { useState } from 'react'
import {
	Input,
	InputProps,
	Button,
	Popconfirm,
	message,
	ButtonProps,
} from 'antd'
import { TBunnyVideo, useBunny } from '@/refine'
import { useDelete, useInvalidate } from '@refinedev/core'

const { Search } = Input

const Filter = ({
	selectedVideos,
	setSelectedVideos,
	setSearch,
	loading,
	selectButtonProps,
	...inputProps
}: {
	selectedVideos: TBunnyVideo[]
	setSelectedVideos:
		| React.Dispatch<React.SetStateAction<TBunnyVideo[]>>
		| ((
				_videosOrFunction:
					| TBunnyVideo[]
					| ((_videos: TBunnyVideo[]) => TBunnyVideo[]),
		  ) => void)
	setSearch: React.Dispatch<React.SetStateAction<string>>
	loading?: boolean
	selectButtonProps?: ButtonProps
} & InputProps) => {
	const { bunny_library_id } = useBunny()
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { mutate: deleteVideo } = useDelete()
	const invalidate = useInvalidate()

	const handleBulkDelete = () => {
		setIsLoading(true)
		selectedVideos.forEach((video, index) => {
			deleteVideo(
				{
					dataProviderName: 'bunny-stream',
					resource: `${bunny_library_id}/videos`,
					id: video.guid,
					// mutationMode: 'undoable',
				},
				{
					onSuccess: () => {
						if (index === selectedVideos.length - 1) {
							message.success('影片已經全部刪除成功')
							setSelectedVideos([])
						}
					},
					onError: () => {
						message.error(`影片 ${video.title} #${video.guid} 刪除失敗`)
					},
					onSettled: () => {
						setIsLoading(false)
						if (index === selectedVideos.length - 1) {
							invalidate({
								dataProviderName: 'bunny-stream',
								resource: `${bunny_library_id}/videos`,
								invalidates: ['list'],
							})
						}
					},
				},
			)
		})
	}

	return (
		<div className="pc-media-library__tabs__filter flex items-center justify-between sticky backdrop-blur-sm z-50 top-0 -mx-6 px-6 pb-4 mb-4">
			<Search
				placeholder="搜尋關鍵字，按 ENTER 也能搜"
				className="w-[20rem]"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				allowClear
				onSearch={(searchValue) => setSearch(searchValue)}
				enterButton
				loading={loading}
				{...inputProps}
			/>

			<div className="flex items-center gap-2">
				<p className="text-sm m-0 text-gray-500">
					已經選取 {selectedVideos?.length ?? 0} 個影片
				</p>
				<Popconfirm
					title="確定要刪除這些影片嗎？"
					onConfirm={handleBulkDelete}
					okText="刪除"
					cancelText="取消"
				>
					<Button
						disabled={!selectedVideos?.length}
						loading={isLoading}
						type="primary"
						danger
					>
						批量刪除{' '}
						{selectedVideos?.length ? `(${selectedVideos?.length})` : ''}
					</Button>
				</Popconfirm>
				<Button
					type="primary"
					{...selectButtonProps}
					disabled={!selectedVideos?.length}
				>
					選取影片 {selectedVideos?.length ? `(${selectedVideos?.length})` : ''}
				</Button>
			</div>
		</div>
	)
}

export default Filter
