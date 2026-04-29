import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingCard } from './index'

describe('LoadingCard', () => {
	it('渲染預設 LOADING... 文字與脈衝動畫樣式', () => {
		const { container } = render(<LoadingCard />)
		expect(screen.getByText('LOADING...')).toBeInTheDocument()
		expect(container.firstChild).toHaveClass('at-animate-pulse')
	})

	it('預設使用 at-aspect-video className', () => {
		const { container } = render(<LoadingCard />)
		expect(container.firstChild).toHaveClass('at-aspect-video')
	})

	it('支援自訂 children 與 className', () => {
		const { container } = render(
			<LoadingCard className="at-aspect-square">
				自訂載入中...
			</LoadingCard>,
		)
		expect(screen.getByText('自訂載入中...')).toBeInTheDocument()
		expect(container.firstChild).toHaveClass('at-aspect-square')
	})
})
