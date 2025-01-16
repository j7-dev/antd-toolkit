import { FC } from 'react'
import { TUserRecord } from '@/pages/admin/Courses/List/types'
import { Form } from 'antd'
import { WatchStatusTag } from '@/components/general'

export const UserWatchStatus: FC<{
	record: TUserRecord
}> = ({ record }) => {
	const { avl_courses } = record
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	const currentCourse = avl_courses?.find((course) => course?.id === watchId)

	if (!currentCourse) return <>出錯了！找不到課程</>

	return <WatchStatusTag expireDate={currentCourse?.expire_date} />
}
