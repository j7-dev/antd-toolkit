import { describe, it, expect } from 'vitest'
import {
	BOOLEAN_OPTIONS,
	POST_STATUS,
	PRODUCT_STATUS,
	USER_ROLES,
} from './index'

describe('BOOLEAN_OPTIONS', () => {
	it('提供 yes/no 選項供表單控制元件使用', () => {
		const values = BOOLEAN_OPTIONS.map((o) => o.value)
		expect(values).toContain('yes')
		expect(values).toContain('no')
	})
})

describe('POST_STATUS', () => {
	it('定義 WordPress 文章狀態及對應顏色', () => {
		const values = POST_STATUS.map((s) => s.value)
		expect(values).toContain('publish')
		expect(values).toContain('pending')
		expect(values).toContain('draft')
		expect(values).toContain('private')
		expect(values).toContain('trash')

		const publishStatus = POST_STATUS.find((s) => s.value === 'publish')
		expect(publishStatus?.color).toBe('blue')

		const trashStatus = POST_STATUS.find((s) => s.value === 'trash')
		expect(trashStatus?.color).toBe('red')
	})

	it('PRODUCT_STATUS 是 POST_STATUS 的別名', () => {
		expect(PRODUCT_STATUS).toBe(POST_STATUS)
	})
})

describe('USER_ROLES', () => {
	it('定義 WordPress 使用者角色及對應顏色', () => {
		const values = USER_ROLES.map((r) => r.value)
		expect(values).toEqual([
			'administrator',
			'shop_manager',
			'editor',
			'author',
			'translator',
			'contributor',
			'customer',
			'subscriber',
		])

		expect(
			USER_ROLES.find((r) => r.value === 'administrator')?.color,
		).toBe('red')
		expect(
			USER_ROLES.find((r) => r.value === 'customer')?.color,
		).toBe('blue')
		expect(
			USER_ROLES.find((r) => r.value === 'subscriber')?.color,
		).toBe('gray')
	})
})
