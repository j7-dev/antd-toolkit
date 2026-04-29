import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Amount } from './index'

describe('Amount', () => {
	it('symbol=false 時顯示大寫貨幣代碼', () => {
		render(<Amount amount={1234} currency="usd" />)
		expect(screen.getByText('USD')).toBeInTheDocument()
		expect(screen.getByText('1,234')).toBeInTheDocument()
	})

	it('symbol=true 時顯示貨幣符號', () => {
		render(<Amount amount={1234} currency="usd" symbol />)
		expect(screen.getByText('$')).toBeInTheDocument()
		expect(screen.getByText('1,234')).toBeInTheDocument()
	})

	it('amount 為 falsy 時 fallback 為 0', () => {
		render(<Amount amount={0} currency="usd" />)
		expect(screen.getByText('0')).toBeInTheDocument()
	})

	it('currency 為 falsy 時 fallback 為空字串', () => {
		render(<Amount amount={100} currency="" />)
		expect(screen.getByText('100')).toBeInTheDocument()
	})

	it('套用自訂 className', () => {
		const { container } = render(
			<Amount amount={100} currency="usd" className="at-text-lg" />,
		)
		expect(container.firstChild).toHaveClass('at-text-lg')
	})

	it('預設包含 at-whitespace-nowrap class', () => {
		const { container } = render(<Amount amount={100} currency="usd" />)
		expect(container.firstChild).toHaveClass('at-whitespace-nowrap')
	})

	it('大數字顯示千分位格式', () => {
		render(<Amount amount={1000000} currency="jpy" />)
		expect(screen.getByText('1,000,000')).toBeInTheDocument()
	})
})
