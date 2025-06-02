import React, { useState } from 'react'
import { Input, InputProps, Button, Popconfirm, message } from 'antd'
import { useBunny } from '@/refine'
import { useDelete, useInvalidate } from '@refinedev/core'
import { useProps } from '@/refine/bunny/MediaLibrary/hooks'

const { Search } = Input

const Filter = ({
	setSearch,
	loading,
	...inputProps
}: {
	setSearch: React.Dispatch<React.SetStateAction<string>>
	loading?: boolean
} & InputProps) => {
	const { selectedItems, setSelectedItems } = useProps()
	const { bunny_library_id } = useBunny()
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { mutate: deleteVideo } = useDelete()
	const invalidate = useInvalidate()

	const handleBulkDelete = () => {
		setIsLoading(true)
		selectedItems.forEach((video, index) => {
			deleteVideo(
				{
					dataProviderName: 'bunny-stream',
					resource: `${bunny_library_id}/videos`,
					id: video.guid,
					// mutationMode: 'undoable',
				},
				{
					onSuccess: () => {
						if (index === selectedItems.length - 1) {
							message.success('影片已經全部刪除成功')
							setSelectedItems([])
						}
					},
					onError: () => {
						message.error(`影片 ${video.title} #${video.guid} 刪除失敗`)
					},
					onSettled: () => {
						setIsLoading(false)
						if (index === selectedItems.length - 1) {
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
		<div className="pc-media-library__tabs__filter at-flex at-items-center at-justify-between at-sticky at-backdrop-blur-sm at-z-50 at-top-0 at-py-2 at-mb-4">
			<Search
				placeholder="搜尋關鍵字，按 ENTER 也能搜"
				className="at-w-[20rem]"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				allowClear
				onSearch={(searchValue) => setSearch(searchValue)}
				enterButton
				loading={loading}
				{...inputProps}
			/>

			<div className="at-flex at-items-center at-gap-2">
				<p className="at-text-sm at-m-0 at-text-gray-500">
					已經選取 {selectedItems?.length ?? 0} 個影片
				</p>
				<Button onClick={() => setSelectedItems([])}>清空選取</Button>
				<Popconfirm
					title="確定要刪除這些影片嗎？"
					onConfirm={handleBulkDelete}
					okText="刪除"
					cancelText="取消"
				>
					<Button
						disabled={!selectedItems?.length}
						loading={isLoading}
						type="primary"
						danger
					>
						批量刪除 {selectedItems?.length ? `(${selectedItems?.length})` : ''}
					</Button>
				</Popconfirm>
			</div>
		</div>
	)
}

export default Filter
