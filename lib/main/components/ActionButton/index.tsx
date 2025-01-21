import { useState } from 'react'
import { Button, ButtonProps, Popconfirm } from 'antd'
import {
	DeleteOutlined,
	CloseOutlined,
	SaveOutlined,
	EditOutlined,
} from '@ant-design/icons'

type TActionButton = {
	canDelete?: boolean
	buttonProps?: ButtonProps
	className?: string
	type?: 'icon' | 'text' | 'both'
	onDelete?: () => void
	onSave?: () => void
	onEdit?: () => void
	onCancel?: () => void
}

const defaultButtonProps = {
	type: 'primary',
	className: 'mx-1',
}

// TODO 需要留嗎?
export const ActionButton = ({
	canDelete = true,
	buttonProps = {},
	className,
	type = 'both',
	onDelete,
	onSave,
	onEdit,
	onCancel,
}: TActionButton) => {
	const [isEditing, setIsEditing] = useState(false)

	const handleEdit = () => {
		setIsEditing(true)
		if (onEdit) {
			onEdit()
		}
	}
	const handleCancel = () => {
		setIsEditing(false)
		if (onCancel) {
			onCancel()
		}
	}

	const buttonPropsMapping = {
		edit: {
			children: 'Edit',
			onClick: handleEdit,
			icon: <EditOutlined />,
		},
		save: {
			children: 'Save',
			icon: <SaveOutlined />,
			onClick: onSave,
		},
		cancel: {
			children: 'Cancel',
			onClick: handleCancel,
			icon: <CloseOutlined />,
			type: 'default',
		},
		delete: {
			children: 'Delete',
			danger: true,
			icon: <DeleteOutlined />,
		},
	}

	const getButtonProps = (
		buttonType: 'edit' | 'save' | 'cancel' | 'delete',
	): ButtonProps => {
		const combineButtonProps = {
			...defaultButtonProps,
			...buttonProps,
			...(buttonPropsMapping?.[buttonType] || {}),
		} as ButtonProps

		if ('both' === type) return combineButtonProps

		if ('icon' === type) {
			delete combineButtonProps.children
			return combineButtonProps
		}

		if ('text' === type) {
			delete combineButtonProps.icon
			return combineButtonProps
		}

		return combineButtonProps
	}

	return (
		<div className={className}>
			{!isEditing && <Button {...getButtonProps('edit')} />}
			{isEditing && (
				<>
					<Button {...getButtonProps('save')} />
					<Button {...getButtonProps('cancel')} />
				</>
			)}

			{canDelete && (
				<Popconfirm
					title="Confirm delete"
					onConfirm={onDelete}
					okText="confirm"
					cancelText="cancel"
				>
					<Button {...getButtonProps('delete')} />
				</Popconfirm>
			)}
		</div>
	)
}
