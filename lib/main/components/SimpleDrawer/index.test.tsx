import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SimpleDrawer } from './index'

describe('SimpleDrawer', () => {
	it('opacity=1 時渲染 Drawer 內容（含標題和關閉按鈕）', () => {
		render(
			<SimpleDrawer
				opacity={1}
				pointerEvents="auto"
				title="Test Drawer"
			>
				<div>Drawer Content</div>
			</SimpleDrawer>,
		)
		expect(screen.getByText('Test Drawer')).toBeInTheDocument()
	})

	it('destroyOnHidden=true 且 opacity=0 時不渲染任何內容', () => {
		const { container } = render(
			<SimpleDrawer
				opacity={0}
				pointerEvents="none"
				destroyOnHidden={true}
			>
				<div>Hidden Content</div>
			</SimpleDrawer>,
		)
		expect(
			screen.queryByText('Hidden Content'),
		).not.toBeInTheDocument()
	})

	it('opacity=0 且 destroyOnHidden=false 時仍掛載但不可見', () => {
		render(
			<SimpleDrawer
				opacity={0}
				pointerEvents="none"
				destroyOnHidden={false}
				title="Invisible Drawer"
			>
				<div>Still Mounted</div>
			</SimpleDrawer>,
		)
		expect(
			screen.getByText('Invisible Drawer'),
		).toBeInTheDocument()
	})
})
