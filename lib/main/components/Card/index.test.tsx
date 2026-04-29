import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './index'

describe('Card', () => {
	it('showCard=true 時渲染 Ant Design Card 包裹內容', () => {
		const { container } = render(
			<Card showCard={true}>
				<p>Card Content</p>
			</Card>,
		)
		expect(screen.getByText('Card Content')).toBeInTheDocument()
		const card = container.querySelector('.ant-card')
		expect(card).toBeInTheDocument()
	})

	it('showCard=false 時直接渲染 children 不包裹 Card', () => {
		const { container } = render(
			<Card showCard={false}>
				<p>Bare Content</p>
			</Card>,
		)
		expect(screen.getByText('Bare Content')).toBeInTheDocument()
		const card = container.querySelector('.ant-card')
		expect(card).not.toBeInTheDocument()
	})

	it('預設 showCard=true', () => {
		const { container } = render(
			<Card>
				<p>Default Card</p>
			</Card>,
		)
		const card = container.querySelector('.ant-card')
		expect(card).toBeInTheDocument()
	})
})
