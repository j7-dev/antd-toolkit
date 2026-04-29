import { memo } from 'react'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import { useLocale } from '@/main/components/LocaleProvider'

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

export const getWatchStatusTagTooltip = (
	expireDate: TExpireDate,
	locale?: {
		followSubscription: (id: number | null) => string
		expiredAt: (date: string) => string
		availableUntil: (date: string) => string
	},
) => {
	const { is_subscription, subscription_id, is_expired, timestamp } =
		expireDate

	const t = locale ?? {
		followSubscription: (id: number | null) => `跟隨訂閱 #${id}`,
		expiredAt: (date: string) => `已於 ${date} 過期`,
		availableUntil: (date: string) => `可觀看至 ${date}`,
	}

	if (is_subscription) {
		return t.followSubscription(subscription_id)
	}

	if (!timestamp) return ''

	return is_expired
		? t.expiredAt(dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm'))
		: t.availableUntil(dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm'))
}

const WatchStatusTagComponent = ({
	expireDate,
}: {
	expireDate: TExpireDate
}) => {
	const t = useLocale('WatchStatusTag')
	const color = getColor(expireDate)

	const { timestamp, is_expired } = expireDate

	let label: string
	if (timestamp === 0) {
		label = t.unlimited
	} else {
		label = is_expired ? t.expired : t.notExpired
	}

	return (
		<Tag color={color} bordered={false}>
			{label}
		</Tag>
	)
}

export const WatchStatusTag = memo(WatchStatusTagComponent)
