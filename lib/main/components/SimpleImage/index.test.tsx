import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SimpleImage } from './index'

describe('SimpleImage', () => {
	it('渲染帶有 lazy loading 的圖片', () => {
		render(<SimpleImage src="https://example.com/test.jpg" />)
		const img = screen.getByRole('img')
		expect(img).toHaveAttribute('loading', 'lazy')
		expect(img).toHaveAttribute('src', 'https://example.com/test.jpg')
	})

	it('圖片下方顯示載入中骨架動畫', () => {
		render(<SimpleImage src="https://example.com/test.jpg" />)
		expect(screen.getByText('LOADING...')).toBeInTheDocument()
	})

	it('提供 render prop 時使用自訂渲染內容', () => {
		render(
			<SimpleImage
				src="https://example.com/test.jpg"
				render={<div data-testid="custom">Custom Content</div>}
			/>,
		)
		expect(screen.getByTestId('custom')).toBeInTheDocument()
		expect(screen.queryByRole('img')).not.toBeInTheDocument()
	})
})
