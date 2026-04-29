import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/wp', () => ({
	USER_ROLES: [
		{ label: '網站管理員', value: 'administrator', color: 'red' },
		{ label: '商店經理', value: 'shop_manager', color: 'orange' },
		{ label: '編輯', value: 'editor', color: 'pink' },
		{ label: '作者', value: 'author', color: 'green' },
		{ label: '翻譯', value: 'translator', color: 'cyan' },
		{ label: '投稿者', value: 'contributor', color: 'purple' },
		{ label: '顧客', value: 'customer', color: 'blue' },
		{ label: '訂閱者', value: 'subscriber', color: 'gray' },
	],
}))

import { UserRole } from './index'

describe('UserRole', () => {
	it('顯示使用者角色為有顏色的標籤', () => {
		render(<UserRole role="administrator" />)
		expect(screen.getByText('網站管理員')).toBeInTheDocument()
	})

	it('customer 角色顯示對應標籤', () => {
		render(<UserRole role="customer" />)
		expect(screen.getByText('顧客')).toBeInTheDocument()
	})

	it('未知角色時 fallback 顯示原始角色字串', () => {
		render(<UserRole role="unknown_role" />)
		expect(screen.getByText('unknown_role')).toBeInTheDocument()
	})
})
