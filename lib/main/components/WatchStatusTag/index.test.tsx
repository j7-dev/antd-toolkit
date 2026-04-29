import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WatchStatusTag, getWatchStatusTagTooltip } from './index'
import type { TExpireDate } from './index'

describe('WatchStatusTag', () => {
	it('timestamp 為 0 時顯示藍色「無期限」標籤', () => {
		const expireDate: TExpireDate = {
			is_subscription: false,
			subscription_id: null,
			is_expired: false,
			timestamp: 0,
		}
		render(<WatchStatusTag expireDate={expireDate} />)
		expect(screen.getByText('無期限')).toBeInTheDocument()
	})

	it('未過期時顯示綠色「未過期」標籤', () => {
		const expireDate: TExpireDate = {
			is_subscription: false,
			subscription_id: null,
			is_expired: false,
			timestamp: 9999999999,
		}
		render(<WatchStatusTag expireDate={expireDate} />)
		expect(screen.getByText('未過期')).toBeInTheDocument()
	})

	it('已過期時顯示洋紅色「已過期」標籤', () => {
		const expireDate: TExpireDate = {
			is_subscription: false,
			subscription_id: null,
			is_expired: true,
			timestamp: 1000000000,
		}
		render(<WatchStatusTag expireDate={expireDate} />)
		expect(screen.getByText('已過期')).toBeInTheDocument()
	})

	it('getWatchStatusTagTooltip 回傳正確的提示文字', () => {
		const subscriptionDate: TExpireDate = {
			is_subscription: true,
			subscription_id: 42,
			is_expired: false,
			timestamp: 1000000000,
		}
		expect(getWatchStatusTagTooltip(subscriptionDate)).toBe(
			'跟隨訂閱 #42',
		)
	})
})
