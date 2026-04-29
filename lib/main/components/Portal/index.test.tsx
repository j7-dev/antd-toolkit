import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Portal } from './index'

describe('Portal', () => {
	it('將 children 渲染到 document.body', () => {
		render(
			<Portal>
				<div data-testid="portal-content">Portal Content</div>
			</Portal>,
		)
		expect(screen.getByTestId('portal-content')).toBeInTheDocument()
		expect(screen.getByText('Portal Content')).toBeInTheDocument()
	})

	it('支援自訂 target 元素', () => {
		const target = document.createElement('div')
		target.id = 'custom-target'
		document.body.appendChild(target)

		render(
			<Portal target={target}>
				<span>Custom Target Content</span>
			</Portal>,
		)

		expect(target.textContent).toBe('Custom Target Content')

		document.body.removeChild(target)
	})
})
