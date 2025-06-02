import { FC, memo } from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip, TooltipProps, ButtonProps } from 'antd'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	UseInvalidateProp,
} from '@refinedev/core'
import { notificationProps } from 'antd-toolkit/refine'

const CopyResourcesComponent: FC<{
	id: string
	tooltipProps?: TooltipProps
	invalidateProps: Omit<UseInvalidateProp, 'invalidates'>
	buttonProps?: ButtonProps
	children?: React.ReactNode
}> = ({ id, invalidateProps, tooltipProps, buttonProps, children }) => {
	const { mutate: duplicate, isLoading } = useCustomMutation()
	const apiUrl = useApiUrl()
	const invalidate = useInvalidate()

	const handleDuplicate = () => {
		duplicate(
			{
				url: `${apiUrl}/copy/${id}`,
				method: 'post',
				values: {},
				...notificationProps,
			},
			{
				onSuccess: (data, variables, context) => {
					invalidate({
						invalidates: ['list'],
						...invalidateProps,
					})
				},
			},
		)
	}

	return (
		<>
			<Tooltip title="複製" {...tooltipProps}>
				<Button
					type="text"
					className="text-gray-400 m-0"
					icon={<CopyOutlined />}
					onClick={handleDuplicate}
					loading={isLoading}
					{...buttonProps}
				>
					{children}
				</Button>
			</Tooltip>
		</>
	)
}

export const CopyResources = memo(CopyResourcesComponent)
