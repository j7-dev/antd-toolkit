import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BooleanIndicator } from './index'

describe('BooleanIndicator', () => {
	it('enabled=true 時渲染 teal 圓點', () => {
		const { container } = render(<BooleanIndicator enabled={true} />)
		const dot = container.firstChild as HTMLElement
		expect(dot).toHaveClass('at-bg-teal-500')
		expect(dot).toHaveClass('at-rounded-full')
	})

	it('enabled=false 時渲染 rose 圓點', () => {
		const { container } = render(<BooleanIndicator enabled={false} />)
		const dot = container.firstChild as HTMLElement
		expect(dot).toHaveClass('at-bg-rose-500')
		expect(dot).toHaveClass('at-rounded-full')
	})

	it('tooltipProps.enabled=true 時包裹 Tooltip', () => {
		const { container } = render(
			<BooleanIndicator
				enabled={true}
				tooltipProps={{ enabled: true, title: 'Active' }}
			/>,
		)
		const dot = container.querySelector('.at-bg-teal-500')
		expect(dot).toBeInTheDocument()
	})
})
