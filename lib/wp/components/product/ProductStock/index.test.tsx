import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductStock } from './index'

describe('ProductStock', () => {
	it('instock 狀態顯示庫存充足', () => {
		const record = {
			stock_status: 'instock' as const,
			stock_quantity: 50,
			low_stock_amount: 5,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.textContent).toContain('庫存充足')
	})

	it('instock 且庫存低於低庫存門檻時顯示低庫存', () => {
		const record = {
			stock_status: 'instock' as const,
			stock_quantity: 3,
			low_stock_amount: 5,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.textContent).toContain('低庫存')
	})

	it('outofstock 狀態顯示缺貨中', () => {
		const record = {
			stock_status: 'outofstock' as const,
			stock_quantity: 0,
			low_stock_amount: 5,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.textContent).toContain('缺貨中')
	})

	it('onbackorder 狀態顯示延期交貨(預購)', () => {
		const record = {
			stock_status: 'onbackorder' as const,
			stock_quantity: null,
			low_stock_amount: null,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.textContent).toContain('延期交貨(預購)')
	})

	it('庫存數量為整數時顯示數量', () => {
		const record = {
			stock_status: 'instock' as const,
			stock_quantity: 25,
			low_stock_amount: 5,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.textContent).toContain('(25)')
	})

	it('stock_status 為空時不渲染', () => {
		const record = {
			stock_status: '' as any,
			stock_quantity: null,
			low_stock_amount: null,
		}
		const { container } = render(<ProductStock record={record} />)
		expect(container.innerHTML).toBe('')
	})

	it('type 為 tag 時渲染 Tag 元件', () => {
		const record = {
			stock_status: 'instock' as const,
			stock_quantity: 10,
			low_stock_amount: 5,
		}
		const { container } = render(<ProductStock record={record} type="tag" />)
		expect(container.querySelector('.ant-tag')).toBeInTheDocument()
	})
})
