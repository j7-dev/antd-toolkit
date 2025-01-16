import React, { memo } from 'react'
import { PopconfirmDelete } from '@/components/general'
import { useCustomMutation, useApiUrl, useInvalidate } from '@refinedev/core'
import { message } from 'antd'

const RemoveCourseAccessComponent = ({
	user_ids,
	course_ids,
	onSettled,
}: {
	user_ids: React.Key[]
	course_ids: string[]
	onSettled: () => void
}) => {
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	// remove student mutation
	const { mutate, isLoading } = useCustomMutation()

	const handleRemove = () => {
		mutate(
			{
				url: `${apiUrl}/courses/remove-students`,
				method: 'post',
				values: {
					user_ids,
					course_ids,
				},
				config: {
					headers: {
						'Content-Type': 'multipart/form-data;',
					},
				},
			},
			{
				onSuccess: () => {
					message.success({
						content: '移除學員成功！',
						key: 'remove-students',
					})
					invalidate({
						resource: 'users',
						invalidates: ['list'],
					})
				},
				onError: () => {
					message.error({
						content: '移除學員失敗！',
						key: 'remove-students',
					})
				},
				onSettled: () => {
					onSettled()
				},
			},
		)
	}

	return (
		<PopconfirmDelete
			type="button"
			popconfirmProps={{
				title: '確認移除這些用戶的課程權限嗎?',
				onConfirm: handleRemove,
			}}
			buttonProps={{
				children: '移除課程',
				disabled: !user_ids.length || !course_ids.length,
				loading: isLoading,
			}}
		/>
	)
}

export const RemoveCourseAccess = memo(RemoveCourseAccessComponent)
