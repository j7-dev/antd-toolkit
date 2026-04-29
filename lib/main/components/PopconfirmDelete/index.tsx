import React, { FC, memo } from 'react'
import {
	Button,
	Popconfirm,
	PopconfirmProps,
	ButtonProps,
	Tooltip,
	TooltipProps,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useLocale } from '@/main/components/LocaleProvider'

type PopconfirmDeleteProps = {
	popconfirmProps: Omit<PopconfirmProps, 'title'> & { title?: React.ReactNode }
	type?: 'icon' | 'button'
	buttonProps?: ButtonProps
	tooltipProps?: TooltipProps
}

export const PopconfirmDeleteComponent: FC<PopconfirmDeleteProps> = ({
	popconfirmProps,
	type = 'icon',
	buttonProps,
	tooltipProps,
}) => {
	const t = useLocale('PopconfirmDelete')

	const mergedPopconfirmProps: PopconfirmProps = {
		title: t.title,
		okText: t.ok,
		cancelText: t.cancel,
		...popconfirmProps,
	}

	if (tooltipProps) {
		return (
			<Popconfirm {...mergedPopconfirmProps}>
				{'icon' === type && (
					<Tooltip {...tooltipProps}>
						<Button
							danger
							type="text"
							icon={<DeleteOutlined />}
							{...buttonProps}
						/>
					</Tooltip>
				)}

				{'button' === type && (
					<Button type="primary" danger {...buttonProps}>
						{buttonProps?.children ?? t.delete}
					</Button>
				)}
			</Popconfirm>
		)
	}

	return (
		<Popconfirm {...mergedPopconfirmProps}>
			{'icon' === type && (
				<Button danger type="text" icon={<DeleteOutlined />} {...buttonProps} />
			)}

			{'button' === type && (
				<Button type="primary" danger {...buttonProps}>
					{buttonProps?.children ?? t.delete}
				</Button>
			)}
		</Popconfirm>
	)
}

export const PopconfirmDelete = memo(PopconfirmDeleteComponent)
