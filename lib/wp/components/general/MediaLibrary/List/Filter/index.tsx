import React, { memo } from 'react'
import { Input, InputProps, Button, Popconfirm } from 'antd'
import { useDeleteMany } from '@refinedev/core'
import { notificationProps } from '@/refine'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'

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
	const { mutate: deleteMany, isLoading } = useDeleteMany()

	const handleBulkDelete = () => {
		const selectedIds = selectedItems.map((item) => item.id)

		deleteMany(
			{
				resource: 'posts',
				ids: selectedIds,
				// mutationMode: 'undoable',
				...notificationProps,
			},
			{
				onSuccess: () => {
					// @ts-ignore
					setSelectedItems([])
				},
			},
		)
	}

	return (
		<div className="pc-media-library__tabs__filter at-flex at-flex-col xl:at-flex-row at-items-center xl:at-justify-between at-sticky at-backdrop-blur-sm at-z-[18] at-top-0 at--mx-6 at-px-6 at-pb-4 at-mb-4 at-gap-y-2 xl:at-gap-y-0">
			<Search
				placeholder="搜尋關鍵字，按 ENTER 也能搜"
				className="at-w-full xl:at-w-[20rem]"
				allowClear
				onSearch={(searchValue) => setSearch(searchValue)}
				enterButton
				loading={loading}
				{...inputProps}
			/>

			<div className="at-flex at-items-center at-gap-2">
				<p className="at-hidden xl:at-block at-text-sm at-m-0 at-text-gray-500">
					已經選取 {selectedItems?.length ?? 0} 個檔案
				</p>
				<Popconfirm
					title="確定要刪除這些檔案嗎？"
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

export default memo(Filter)
