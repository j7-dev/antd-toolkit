import React from 'react'
import { TableProps, Typography, Button } from 'antd'
import { TUserRecord, TAVLCourse } from '@/pages/admin/Courses/List/types'
import { UserName } from '@/components/user'
import { WatchStatusTag, getWatchStatusTagTooltip } from '@/components/general'
import { useSetAtom } from 'jotai'
import { historyDrawerAtom } from '../atom'
import { FieldTimeOutlined } from '@ant-design/icons'

type TUseColumnsParams = {
	onClick?: (_record: TUserRecord | undefined) => () => void
}

const { Text } = Typography

const useColumns = (params?: TUseColumnsParams) => {
	const setHistoryDrawerProps = useSetAtom(historyDrawerAtom)
	const handleClick = params?.onClick
	const columns: TableProps<TUserRecord>['columns'] = [
		{
			title: '會員',
			dataIndex: 'id',
			width: 180,
			render: (_, record) => <UserName record={record} onClick={handleClick} />,
		},
		{
			title: '已開通課程',
			dataIndex: 'avl_courses',
			width: 240,
			render: (avl_courses: TAVLCourse[], { id: user_id, display_name }) => {
				return avl_courses.map(
					({ id: course_id, name: course_name, expire_date }) => (
						<div
							key={course_id}
							className="grid grid-cols-[1fr_6rem_4rem_12rem] gap-1 my-1"
						>
							<div>
								<Text
									className="cursor-pointer"
									ellipsis={{
										tooltip: (
											<>
												<sub className="text-gray-500">#{course_id}</sub>{' '}
												{course_name || '未知的課程名稱'}
											</>
										),
									}}
									onClick={() => {
										setHistoryDrawerProps({
											user_id,
											user_name: display_name,
											course_id,
											course_name,
											drawerProps: {
												open: true,
											},
										})
									}}
								>
									<sub className="text-gray-500">#{course_id}</sub>{' '}
									{course_name || '未知的課程名稱'}
								</Text>
							</div>

							<div className="text-center">
								<Button
									className="text-xs"
									color="primary"
									size="small"
									variant="filled"
									icon={<FieldTimeOutlined />}
									iconPosition="end"
									onClick={() => {
										setHistoryDrawerProps({
											user_id,
											user_name: display_name,
											course_id,
											course_name,
											drawerProps: {
												open: true,
											},
										})
									}}
								>
									學習紀錄
								</Button>
							</div>

							<div className="text-center">
								<WatchStatusTag expireDate={expire_date} />
							</div>

							<div className="text-left">
								{getWatchStatusTagTooltip(expire_date)}
							</div>
						</div>
					),
				)
			},
		},
		{
			title: '註冊時間',
			dataIndex: 'user_registered',
			width: 180,
			render: (user_registered, record) => (
				<>
					<p className="m-0">已註冊 {record?.user_registered_human}</p>
					<p className="m-0 text-gray-500 text-xs">{user_registered}</p>
				</>
			),
		},
	]

	return columns
}

export default useColumns
