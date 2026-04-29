import { describe, it, expect } from 'vitest'
import { ORDER_STATUS, getOrderStatus } from './order'

describe('ORDER_STATUS', () => {
	it('定義 WooCommerce 訂單狀態及對應顏色', () => {
		const values = ORDER_STATUS.map((s) => s.value)
		expect(values).toContain('processing')
		expect(values).toContain('pending')
		expect(values).toContain('wmp-in-transit')
		expect(values).toContain('wmp-shipped')
		expect(values).toContain('on-hold')
		expect(values).toContain('completed')
		expect(values).toContain('cancelled')
		expect(values).toContain('refunded')
		expect(values).toContain('failed')
		expect(values).toContain('checkout-draft')
		expect(values).toContain('ry-at-cvs')
		expect(values).toContain('ry-out-cvs')
	})
})

describe('getOrderStatus', () => {
	it('根據狀態值查找對應訂單狀態物件', () => {
		const result = getOrderStatus('processing')
		expect(result?.value).toBe('processing')
		expect(result?.label).toBe('處理中')
	})

	it('自動去除 wc- 前綴再查找', () => {
		const result = getOrderStatus('wc-processing')
		expect(result?.value).toBe('processing')
		expect(result?.label).toBe('處理中')
	})

	it('查找不到時回傳 undefined', () => {
		const result = getOrderStatus('nonexistent')
		expect(result).toBeUndefined()
	})
})
