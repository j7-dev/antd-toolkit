import { BaseRecord, CrudFilters, NotificationProvider } from '@refinedev/core'
import { DeleteButtonProps } from '@refinedev/antd'
import { notification } from 'antd'
import {
	InfoCircleTwoTone,
	CheckCircleTwoTone,
	CloseCircleTwoTone,
} from '@ant-design/icons'

export * from './woocommerce'

/**
 * 將 key-value 的物件轉換成 refine 的 crudFilters
 * 以便執行 refine 的 crud 操作
 * @param initialValues
 * @return RefineCrudFilters
 */
export function objToCrudFilters(values: BaseRecord) {
	return Object.keys(values).reduce((acc: CrudFilters, key) => {
		if (values[key]) {
			acc.push({
				field: key,
				operator: 'eq',
				value: values[key],
			})
		}
		return acc
	}, [])
}

/**
 * 將 key-value 的物件轉換成 refine 的 crudFilters
 * 以便執行 refine 的 crud 操作
 * @deprecated 使用 objToCrudFilters 替代
 * @param values
 * @returns RefineCrudFilters
 */
export function getInitialFilters(values: BaseRecord) {
	return objToCrudFilters(values)
}

// refine 預設的 delete button 的 props
export const defaultDeleteButtonProps: DeleteButtonProps = {
	confirmTitle: '確認刪除嗎?',
	confirmOkText: '確認',
	confirmCancelText: '取消',
	hideText: true,
	type: 'text',
}

export const notificationProvider: NotificationProvider = {
	open: ({ key, message, type, description }) => {
		const notificationType = type === 'progress' ? 'info' : type

		const getColorAndIcon = (nt: string) => {
			switch (nt) {
				case 'open':
					return {
						color: '#1677ff',
						icon: (
							<InfoCircleTwoTone
								twoToneColor="#1677ff"
								style={{ transform: 'scale(0.75)' }}
							/>
						),
					}
				case 'success':
					return {
						color: '#52c41a',
						icon: (
							<CheckCircleTwoTone
								twoToneColor="#52c41a"
								style={{ transform: 'scale(0.75)' }}
							/>
						),
					}

				default:
					return {
						color: '#ff4d4f',
						icon: (
							<CloseCircleTwoTone
								twoToneColor="#ff4d4f"
								style={{ transform: 'scale(0.75)' }}
							/>
						),
					}
			}
		}

		const { color, icon } = getColorAndIcon(notificationType)

		notification?.[notificationType as keyof typeof notification]({
			key,
			description,
			message: <span style={{ color }}>{message}</span>,
			showProgress: true,
			pauseOnHover: true,
			icon,
		} as any)
	},
	close: (key) => {
		notification.destroy(key)
	},
}
