import React, { memo } from 'react'
import { Tag } from 'antd'
import dayjs from 'dayjs'

export type TExpireDate = {
	is_subscription: boolean
	subscription_id: number | null
	is_expired: boolean
	timestamp: number | null
}

const getColor = (expireDate: TExpireDate) => {
	const { is_expired, timestamp } = expireDate
	if (timestamp === 0) {
		return 'blue'
	}

	if (is_expired) {
		return 'magenta'
	}

	return 'green'
}

const getLabel = (expireDate: TExpireDate) => {
	const { is_subscription, is_expired, timestamp } = expireDate

	if (timestamp === 0) {
		return '無期限'
	}

	const label = is_expired ? '已過期' : '未過期'
	const addonAfter = is_subscription ? '(訂閱)' : ''
	return `${label}`
}

export const getWatchStatusTagTooltip = (expireDate: TExpireDate) => {
	const { is_subscription, subscription_id, is_expired, timestamp } = expireDate
	if (is_subscription) {
		return `跟隨訂閱 #${subscription_id}`
	}

	if (!timestamp) return ''

	return is_expired
		? `已於 ${dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm')} 過期`
		: `可觀看至 ${dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm')}`
}

const WatchStatusTagComponent = ({
	expireDate,
}: {
	expireDate: TExpireDate
}) => {
	const color = getColor(expireDate)
	const label = getLabel(expireDate)

	return (
		<Tag color={color} bordered={false}>
			{label}
		</Tag>
	)
}

export const WatchStatusTag = memo(WatchStatusTagComponent)
