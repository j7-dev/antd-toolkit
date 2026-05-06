import React, { memo } from 'react'
import { Input, InputProps, Button, Popconfirm } from 'antd'
import { useDeleteMany } from '@refinedev/core'
import { notificationProps } from '@/refine'
import { useProps } from '@/wp/components/general/MediaLibrary/hooks'
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
	const t = useLocale('WpMediaLibrary')
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
		<div className="pc-media-library__tabs__filter at-w-full at-flex at-flex-col xl:at-flex-row at-items-center xl:at-justify-between at-sticky at-backdrop-blur-sm at-z-[18] at-top-0 at-py-2 at-mb-4 at-gap-y-2 xl:at-gap-y-0">
			<Search
				placeholder={t.searchPlaceholder}
				className="at-w-full xl:at-w-[20rem]"
				allowClear
				onSearch={(searchValue) => setSearch(searchValue)}
				enterButton
				loading={loading}
				{...inputProps}
			/>

			<div className="at-flex at-items-center at-gap-2">
				<p className="at-hidden xl:at-block at-text-sm at-m-0 at-text-gray-500">
					{t.selectedFiles(selectedItems?.length ?? 0)}
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

export default memo(Filter)
