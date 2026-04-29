import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AltIcon } from './index'

describe('AltIcon', () => {
	it('渲染 SVG "Alt" 文字圖示並使用預設顏色', () => {
		const { container } = render(<AltIcon />)
		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveAttribute('fill', '#444')
		expect(svg).toHaveClass('at-size-4')
	})

	it('支援自訂 color 與 className', () => {
		const { container } = render(
			<AltIcon color="#ff0000" className="at-size-8" />,
		)
		const svg = container.querySelector('svg')
		expect(svg).toHaveAttribute('fill', '#ff0000')
		expect(svg).toHaveClass('at-size-8')
	})
})
