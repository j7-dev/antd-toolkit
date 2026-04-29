import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductTotalSales } from './index'

describe('ProductTotalSales', () => {
	it('顯示商品銷售數量', () => {
		const record = { total_sales: 42 }
		const { container } = render(
			<ProductTotalSales record={record} max_sales={100} />,
		)
		const badge = container.querySelector('.ant-badge-count')
		expect(badge).toBeInTheDocument()
		expect(badge).toHaveAttribute('title', '42')
	})

	it('total_sales 為 undefined 時不渲染', () => {
		const record = { total_sales: undefined as any }
		const { container } = render(
			<ProductTotalSales record={record} max_sales={100} />,
		)
		expect(container.innerHTML).toBe('')
	})

	it('銷售量為 0 且 showZero 時顯示 0', () => {
		const record = { total_sales: 0 }
		const { container } = render(
			<ProductTotalSales record={record} max_sales={100} />,
		)
		const badge = container.querySelector('.ant-badge-count')
		expect(badge).toBeInTheDocument()
		expect(badge).toHaveAttribute('title', '0')
	})
})
