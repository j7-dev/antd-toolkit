import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BreathLight } from './index'

describe('BreathLight', () => {
	it('渲染帶有 animate-ping 效果的脈衝圓點', () => {
		const { container } = render(<BreathLight />)
		const pingSpan = container.querySelector('.at-animate-ping')
		expect(pingSpan).toBeInTheDocument()
	})

	it('預設使用 at-bg-orange-400 樣式', () => {
		const { container } = render(<BreathLight />)
		const spans = container.querySelectorAll('span')
		// The inner spans should have at-bg-orange-400
		const hasOrangeClass = Array.from(spans).some((span) =>
			span.classList.contains('at-bg-orange-400'),
		)
		expect(hasOrangeClass).toBe(true)
	})
})
