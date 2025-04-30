import { useState, memo } from 'react'
import { Button, ButtonProps, Popconfirm } from 'antd'
import {
	DeleteOutlined,
	CloseOutlined,
	SaveOutlined,
	EditOutlined,
} from '@ant-design/icons'

export type TActionButton = {
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
	className: 'at-mx-1',
}

const ActionButtonComponent = ({
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
			children: '編輯',
			onClick: handleEdit,
			icon: <EditOutlined />,
		},
		save: {
			children: '儲存',
			icon: <SaveOutlined />,
			onClick: onSave,
		},
		cancel: {
			children: '取消',
			onClick: handleCancel,
			icon: <CloseOutlined />,
			type: 'default',
		},
		delete: {
			children: '刪除',
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

/**
 * ActionButton 組件
 *
 * @description 提供編輯、保存、取消和刪除功能的按鈕組合組件
 *
 * @param {boolean} [isEditing=false] - 是否處於編輯模式
 * @param {Function} [onEdit] - 點擊編輯按鈕時的回調函數
 * @param {Function} [onSave] - 點擊保存按鈕時的回調函數
 * @param {Function} [onCancel] - 點擊取消按鈕時的回調函數
 * @param {Function} [onDelete] - 點擊刪除按鈕時的回調函數
 * @param {boolean} [canDelete=true] - 是否顯示刪除按鈕
 * @param {string} [className] - 容器的自定義 CSS 類名
 * @param {ButtonProps} [buttonProps] - 所有按鈕的共用屬性
 * @param {object} [buttonPropsMapping] - 各按鈕的個別屬性配置
 * @param {'both'|'icon'|'text'} [type='both'] - 按鈕顯示類型：同時顯示圖標和文字、僅圖標或僅文字
 *
 * @returns {JSX.Element} 返回按鈕組合組件
 *
 * @example
 * // 基本用法
 * <ActionButton
 *   onEdit={() => setIsEditing(true)}
 *   onSave={handleSave}
 *   onCancel={() => setIsEditing(false)}
 * />
 *
 * // 僅顯示圖標
 * <ActionButton
 *   type="icon"
 *   isEditing={isEditing}
 *   onEdit={() => setIsEditing(true)}
 *   onSave={handleSave}
 *   onCancel={() => setIsEditing(false)}
 * />
 */

export const ActionButton = memo(ActionButtonComponent)
