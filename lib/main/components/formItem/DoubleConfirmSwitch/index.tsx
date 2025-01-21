import React, { memo } from 'react'
import { Switch, Tooltip, Popconfirm, Form, FormItemProps } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { PopconfirmProps } from 'antd/lib/popconfirm'
import { TooltipPlacement, TooltipProps } from 'antd/lib/tooltip'
import { SwitchProps } from 'antd/lib/switch'

const DoubleConfirmSwitchComponent: React.FC<{
	fromItemProps?: FormItemProps
	popconfirmProps?: PopconfirmProps
	tooltipProps?: TooltipProps
	switchProps?: SwitchProps
	onClick?: (checked: boolean) => void
	onConfirm?: (
		_checked: boolean,
		_e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
	) => void
	onCancel?: (
		_checked: boolean,
		_e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
	) => void
}> = ({
	fromItemProps,
	popconfirmProps,
	tooltipProps,
	switchProps,
	onClick,
	onConfirm,
	onCancel,
}) => {
	const form = Form.useFormInstance()
	const watchChecked = Form.useWatch(fromItemProps?.name, form)

	const handleSwitchClick = (checked: boolean) => {
		if (onClick) {
			onClick(checked)
		}
	}

	const confirmEnable = (
		e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
	) => {
		if (onConfirm) {
			onConfirm(watchChecked, e)
		}
	}

	const cancelEnable = (
		e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
	) => {
		form.setFieldValue(fromItemProps?.name, false)
		if (onCancel) {
			onCancel(watchChecked, e)
		}
	}

	const defaultPopconfirmProps = {
		title: 'Please Confirm',
		description: 'Do you confirm to Enable ?',
		okText: 'Confirm',
		cancelText: 'Cancel',
		placement: 'rightBottom' as TooltipPlacement,
		...popconfirmProps,
		onConfirm: confirmEnable,
		onCancel: cancelEnable,
		disabled: watchChecked,
	}

	const defaultTooltipProps = {
		title: `Click to ${watchChecked ? 'Disable' : 'Enable'}`,
		placement: 'left' as TooltipPlacement,
		...tooltipProps,
	}

	const defaultSwitchProps = {
		checkedChildren: <CheckOutlined />,
		unCheckedChildren: <CloseOutlined />,
		...switchProps,
		onClick: handleSwitchClick,
	}

	return (
		<Popconfirm {...defaultPopconfirmProps}>
			<Tooltip {...defaultTooltipProps}>
				<Form.Item {...fromItemProps} valuePropName="checked">
					<Switch {...defaultSwitchProps} />
				</Form.Item>
			</Tooltip>
		</Popconfirm>
	)
}

export const DoubleConfirmSwitch = memo(DoubleConfirmSwitchComponent)
