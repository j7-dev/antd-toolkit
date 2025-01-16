import React, { memo, useEffect } from 'react'
import { useTable, useModal } from '@refinedev/antd'
import { TUserRecord, TAVLCourse } from '@/pages/admin/Courses/List/types'
import { Table, TableProps, FormInstance, Button, Modal, CardProps } from 'antd'
import useColumns from './hooks/useColumns'
import { useRowSelection, FilterTags } from 'antd-toolkit'
import {
	getDefaultPaginationProps,
	defaultTableProps,
} from '@/components/product/ProductTable/utils'
import { useGCDItems } from '@/hooks'
import {
	GrantCourseAccess,
	RemoveCourseAccess,
	ModifyCourseExpireDate,
} from '@/components/user'
import Filter, { TFilterValues } from './Filter'
import { HttpError } from '@refinedev/core'
import { keyLabelMapper } from './utils'
import CsvUpload from './CsvUpload'
import { selectedUserIdsAtom } from './atom'
import { useAtom } from 'jotai'
import SelectedUser from './SelectedUser'
import Card from './Card'
import HistoryDrawer from './HistoryDrawer'

const UserTableComponent = ({
	canGrantCourseAccess = false,
	tableProps: overrideTableProps,
	cardProps,
}: {
	canGrantCourseAccess?: boolean
	tableProps?: TableProps<TUserRecord>
	cardProps?: CardProps & { showCard?: boolean }
}) => {
	const [selectedUserIds, setSelectedUserIds] = useAtom(selectedUserIdsAtom)

	const { searchFormProps, tableProps, filters } = useTable<
		TUserRecord,
		HttpError,
		TFilterValues
	>({
		resource: 'users',
		pagination: {
			pageSize: 20,
		},
		onSearch: (values) => {
			return Object.keys(values).map((key) => {
				return {
					field: key,
					operator: 'contains',
					value: values[key as keyof TFilterValues],
				}
			})
		},
	})

	const currentAllKeys =
		tableProps?.dataSource?.map((record) => record?.id.toString()) || []

	// 多選
	const { rowSelection, setSelectedRowKeys, selectedRowKeys } =
		useRowSelection<TUserRecord>({
			onChange: (currentSelectedRowKeys: React.Key[]) => {
				setSelectedRowKeys(currentSelectedRowKeys)

				/**
				 * 不在這頁的已選擇用戶
				 * @type string[]
				 */
				const setSelectedUserIdsNotInCurrentPage = selectedUserIds.filter(
					(selectedUserId) => !currentAllKeys.includes(selectedUserId),
				)

				/**
				 * 在這頁的已選擇用戶
				 * @type string[]
				 */
				const currentSelectedRowKeysStringify = currentSelectedRowKeys.map(
					(key) => key.toString(),
				)

				setSelectedUserIds(() => {
					// 把這頁的已選用戶加上 不在這頁的已選用戶
					const newKeys = new Set([
						...setSelectedUserIdsNotInCurrentPage,
						...currentSelectedRowKeysStringify,
					])
					return [...newKeys]
				})
			},
		})

	/*
	 * 換頁時，將已加入的商品全局狀態同步到當前頁面的 selectedRowKeys 狀態
	 */
	useEffect(() => {
		if (!tableProps?.loading) {
			const filteredKey =
				currentAllKeys?.filter((id) => selectedUserIds?.includes(id)) || []
			setSelectedRowKeys(filteredKey)
		}
	}, [
		JSON.stringify(filters),
		JSON.stringify(tableProps?.pagination),
		tableProps?.loading,
	])

	useEffect(() => {
		// 如果清空已選擇的用戶，連帶清空 selectedRowKeys (畫面上的打勾)
		if (selectedUserIds.length === 0) {
			setSelectedRowKeys([])
		}
	}, [selectedUserIds.length])

	useEffect(() => {
		// 剛載入組件時，清空已選擇的用戶
		setSelectedUserIds([])
	}, [])

	const columns = useColumns()

	const selectedAllAVLCourses = selectedRowKeys
		.map((key) => {
			return tableProps?.dataSource?.find((user) => user.id === key)
				?.avl_courses
		})
		.filter((courses) => courses !== undefined)

	// 取得最大公約數的課程
	const { GcdItemsTags, selectedGCDs, setSelectedGCDs, gcdItems } =
		useGCDItems<TAVLCourse>({
			allItems: selectedAllAVLCourses,
		})

	// CSV 上傳 Modal
	const { show, modalProps } = useModal()

	return (
		<>
			<Card title="篩選" bordered={false} className="mb-4" {...cardProps}>
				<Filter formProps={searchFormProps} />
				<FilterTags
					form={searchFormProps.form as FormInstance}
					keyLabelMapper={keyLabelMapper}
				/>
			</Card>
			<Card bordered={false} {...cardProps}>
				{canGrantCourseAccess && (
					<>
						<div className="mt-4">
							<GrantCourseAccess
								user_ids={selectedRowKeys as string[]}
								label="添加其他課程"
							/>
						</div>

						<div className="mt-4 flex gap-x-6 justify-between">
							<div>
								<label className="tw-block mb-2">批量操作</label>
								<div className="flex gap-x-4">
									<ModifyCourseExpireDate
										user_ids={selectedRowKeys as string[]}
										course_ids={selectedGCDs}
										onSettled={() => {
											setSelectedGCDs([])
										}}
									/>
									<RemoveCourseAccess
										user_ids={selectedRowKeys}
										course_ids={selectedGCDs}
										onSettled={() => {
											setSelectedGCDs([])
										}}
									/>
								</div>
							</div>
							{!!gcdItems.length && (
								<div className="flex-1">
									<label className="tw-block mb-2">選擇課程</label>
									<GcdItemsTags />
								</div>
							)}
							<Button
								onClick={show}
								color="primary"
								variant="outlined"
								className="self-end"
							>
								CSV 批次上傳學員權限
							</Button>
						</div>
					</>
				)}

				<SelectedUser
					user_ids={selectedUserIds}
					onClear={() => {
						setSelectedUserIds([])
					}}
					onSelected={() => {
						const searchForm = searchFormProps?.form
						if (!searchForm) return
						searchForm.setFieldValue(['include'], selectedUserIds)
						searchForm.submit()
					}}
				/>

				<Table
					{...(defaultTableProps as unknown as TableProps<TUserRecord>)}
					{...tableProps}
					className="mt-4"
					columns={columns}
					rowSelection={rowSelection}
					pagination={{
						...tableProps.pagination,
						...getDefaultPaginationProps({ label: '用戶' }),
					}}
					{...overrideTableProps}
				/>
			</Card>
			{canGrantCourseAccess && (
				<Modal
					{...modalProps}
					centered
					title="CSV 批次上傳學員權限"
					footer={null}
				>
					<CsvUpload />
				</Modal>
			)}

			<HistoryDrawer />
		</>
	)
}

export const UserTable = memo(UserTableComponent)
export * from './atom'
export { default as SelectedUser } from './SelectedUser'
