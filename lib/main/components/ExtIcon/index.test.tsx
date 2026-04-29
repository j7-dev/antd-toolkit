import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExtIcon } from './index'

describe('ExtIcon', () => {
	it('根據副檔名渲染對應的 SVG 圖示', () => {
		const { container } = render(<ExtIcon ext="txt" />)
		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
	})

	it('支援多種常見檔案類型', () => {
		const extensions = ['txt', 'doc', 'pdf', 'mp4', 'jpg', 'zip']
		extensions.forEach((ext) => {
			const { container } = render(<ExtIcon ext={ext} />)
			const svg = container.querySelector('svg')
			expect(svg).toBeInTheDocument()
		})
	})

	it('套用自訂 className', () => {
		const { container } = render(
			<ExtIcon ext="txt" className="custom-class" />,
		)
		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('custom-class')
	})
})
