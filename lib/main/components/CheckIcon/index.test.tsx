import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CheckIcon } from './index'

describe('CheckIcon', () => {
	it('渲染 SVG 勾選圖示', () => {
		const { container } = render(<CheckIcon />)
		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveAttribute('viewBox', '0 0 20 20')
	})

	it('支援傳入 HTML 屬性', () => {
		const { container } = render(
			<CheckIcon className="at-size-6" data-testid="check" />,
		)
		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('at-size-6')
		expect(svg).toHaveAttribute('data-testid', 'check')
	})
})
