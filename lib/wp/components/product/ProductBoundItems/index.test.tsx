import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('antd', () => ({
	Tag: ({ children }: any) => <span data-testid="tag">{children}</span>,
	Tooltip: ({ title, children }: any) => (
		<div title={typeof title === 'string' ? title : ''}>
			{children}
		</div>
	),
}))

vi.mock('dayjs', () => ({
	default: {
		unix: (ts: number) => ({
			format: (fmt: string) => '2025/01/15 10:30',
		}),
	},
}))

vi.mock('@/main', () => ({
	cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
	NameId: ({ name, id }: { name: string; id: string }) => (
		<span>
			{name} #{id}
		</span>
	),
}))

import { ProductBoundItems } from './index'

describe('ProductBoundItems', () => {
	it('顯示已綁定項目的名稱與限制標籤', () => {
		const items = [
			{
				id: '1',
				name: '線上課程 A',
				limit_type: 'unlimited' as const,
				limit_value: '' as const,
				limit_unit: '' as const,
			},
		]
		render(<ProductBoundItems items={items} />)
		expect(screen.getByText('線上課程 A #1')).toBeInTheDocument()
		expect(screen.getByText('無期限')).toBeInTheDocument()
	})

	it('limit_type 為 follow_subscription 顯示跟隨訂閱', () => {
		const items = [
			{
				id: '2',
				name: '訂閱服務',
				limit_type: 'follow_subscription' as const,
				limit_value: '' as const,
				limit_unit: '' as const,
			},
		]
		render(<ProductBoundItems items={items} />)
		expect(screen.getByText('跟隨訂閱')).toBeInTheDocument()
	})

	it('limit_type 為 fixed 顯示天/月/年單位', () => {
		const items = [
			{
				id: '3',
				name: '限時方案',
				limit_type: 'fixed' as const,
				limit_value: 30,
				limit_unit: 'day' as const,
			},
		]
		render(<ProductBoundItems items={items} />)
		expect(screen.getByText('訂單完成後 30 日')).toBeInTheDocument()
	})

	it('limit_type 為 assigned 顯示指定到期日', () => {
		const items = [
			{
				id: '4',
				name: '限定方案',
				limit_type: 'assigned' as const,
				limit_value: 1736928600,
				limit_unit: '' as const,
			},
		]
		render(<ProductBoundItems items={items} />)
		expect(screen.getByText(/至 2025\/01\/15 10:30/)).toBeInTheDocument()
	})

	it('hideName 為 true 時隱藏名稱僅顯示 ID', () => {
		const items = [
			{
				id: '5',
				name: '隱藏名稱項目',
				limit_type: 'unlimited' as const,
				limit_value: '' as const,
				limit_unit: '' as const,
			},
		]
		render(<ProductBoundItems items={items} hideName />)
		expect(screen.getByText('#5')).toBeInTheDocument()
	})
})
