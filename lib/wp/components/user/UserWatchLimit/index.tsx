import { FC } from 'react'
import { TUserRecord } from '@/pages/admin/Courses/List/types'
import { Form } from 'antd'
import { DateTime } from 'antd-toolkit'

export const UserWatchLimit: FC<{
	record: TUserRecord
}> = ({ record }) => {
	const { avl_courses } = record
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	const currentCourse = avl_courses?.find((course) => course?.id === watchId)

	if (!currentCourse) return <>出錯了！找不到課程</>

	const expireDate = currentCourse?.expire_date
		? Number(currentCourse?.expire_date) * 1000 // 換成毫秒
		: undefined

	if (!expireDate) {
		return ''
	}

	return (
		<>
			<DateTime
				date={expireDate}
				timeProps={{
					format: 'HH:mm',
				}}
			/>
		</>
	)
}
