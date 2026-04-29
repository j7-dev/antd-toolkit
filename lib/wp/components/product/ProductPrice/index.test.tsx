import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/main/utils', () => ({
	renderHTML: (html: string) => <span dangerouslySetInnerHTML={{ __html: html }} />,
}))

vi.mock('./style.scss', () => ({}))

import { ProductPrice } from './index'

describe('ProductPrice', () => {
	it('顯示商品價格 HTML', () => {
		const record = { price_html: '<span>$100</span>' }
		const { container } = render(<ProductPrice record={record} />)
		expect(container.querySelector('.at-product-price')).toBeInTheDocument()
		expect(container.innerHTML).toContain('$100')
	})

	it('price_html 為空時不渲染任何內容', () => {
		const record = { price_html: '' }
		const { container } = render(<ProductPrice record={record} />)
		expect(container.innerHTML).toBe('')
	})
})
