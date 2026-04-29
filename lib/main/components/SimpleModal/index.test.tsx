import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SimpleModal } from './index'

describe('SimpleModal', () => {
	it('opacity=1 時渲染 Modal 內容（含標題）', () => {
		render(
			<SimpleModal
				opacity={1}
				pointerEvents="auto"
				title="Test Modal"
			>
				<div>Modal Content</div>
			</SimpleModal>,
		)
		expect(screen.getByText('Test Modal')).toBeInTheDocument()
	})

	it('destroyOnHidden=true 且 opacity=0 時不渲染任何內容', () => {
		render(
			<SimpleModal
				opacity={0}
				pointerEvents="none"
				destroyOnHidden={true}
			>
				<div>Hidden Modal</div>
			</SimpleModal>,
		)
		expect(
			screen.queryByText('Hidden Modal'),
		).not.toBeInTheDocument()
	})

	it('opacity=0 且 destroyOnHidden=false 時仍掛載', () => {
		render(
			<SimpleModal
				opacity={0}
				pointerEvents="none"
				destroyOnHidden={false}
				title="Invisible Modal"
			>
				<div>Still Here</div>
			</SimpleModal>,
		)
		expect(
			screen.getByText('Invisible Modal'),
		).toBeInTheDocument()
	})
})
