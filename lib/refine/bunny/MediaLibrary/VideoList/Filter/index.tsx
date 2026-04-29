import React, { useState } from 'react'
import { Input, InputProps, Button, Popconfirm, message } from 'antd'
import { useBunny } from '@/refine'
import { useDelete, useInvalidate } from '@refinedev/core'
import { useProps } from '@/refine/bunny/MediaLibrary/hooks'
import { useLocale } from '@/main/components/LocaleProvider'

const { Search } = Input

const Filter = ({
	setSearch,
	loading,
	...inputProps
}: {
	setSearch: React.Dispatch<React.SetStateAction<string>>
	loading?: boolean
} & InputProps) => {
	const t = useLocale('BunnyModule')
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
							message.success(t.deleteSuccess)
							setSelectedItems([])
						}
					},
					onError: () => {
						message.error(t.deleteFailed(video.title, video.guid))
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
				placeholder={t.searchPlaceholder}
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
					{t.selectedVideos(selectedItems?.length ?? 0)}
				</p>
				<Button onClick={() => setSelectedItems([])}>{t.clearSelection}</Button>
				<Popconfirm
					title={t.deleteConfirm}
					onConfirm={handleBulkDelete}
					okText={t.deleteOk}
					cancelText={t.deleteCancel}
				>
					<Button
						disabled={!selectedItems?.length}
						loading={isLoading}
						type="primary"
						danger
					>
						{t.batchDelete(selectedItems?.length ?? 0)}
					</Button>
				</Popconfirm>
			</div>
		</div>
	)
}

export default Filter
