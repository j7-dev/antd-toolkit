import { FC, memo } from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip, TooltipProps, ButtonProps } from 'antd'
import {
	useCustomMutation,
	useApiUrl,
	useInvalidate,
	UseInvalidateProp,
} from '@refinedev/core'
import { notificationProps } from '@/refine'
import { useLocale } from '@/main/components/LocaleProvider'

const CopyResourcesComponent: FC<{
	id: string
	tooltipProps?: TooltipProps
	invalidateProps: Omit<UseInvalidateProp, 'invalidates'>
	buttonProps?: ButtonProps
	children?: React.ReactNode
}> = ({ id, invalidateProps, tooltipProps, buttonProps, children }) => {
	const t = useLocale('CopyResources')
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
					invalidate({ invalidates: ['list'], ...invalidateProps })
				},
			},
		)
	}

	return (
		<>
			<Tooltip title={t.tooltip} {...tooltipProps}>
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
