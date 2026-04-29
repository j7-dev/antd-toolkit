import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TrendIndicator } from './index'

describe('TrendIndicator', () => {
	it('value >= compareValue 時顯示紅色上箭頭與百分比', () => {
		render(
			<TrendIndicator
				tooltipProps={{ title: 'trend' }}
				value={150}
				compareValue={100}
			/>,
		)
		expect(screen.getByText('50%')).toBeInTheDocument()
		// CaretUpOutlined should be rendered
		expect(screen.getByRole('img', { name: 'caret-up' })).toBeInTheDocument()
	})

	it('value < compareValue 時顯示綠色下箭頭與百分比', () => {
		render(
			<TrendIndicator
				tooltipProps={{ title: 'trend' }}
				value={50}
				compareValue={100}
			/>,
		)
		expect(screen.getByText('-50%')).toBeInTheDocument()
		expect(
			screen.getByRole('img', { name: 'caret-down' }),
		).toBeInTheDocument()
	})

	it('compareValue 為 0 時顯示無限大符號', () => {
		render(
			<TrendIndicator
				tooltipProps={{ title: 'trend' }}
				value={100}
				compareValue={0}
				hideWithoutCompareValue={false}
			/>,
		)
		expect(screen.getByText('∞%')).toBeInTheDocument()
	})

	it('hideWithoutCompareValue=true 且 compareValue 為 falsy 時隱藏', () => {
		const { container } = render(
			<TrendIndicator
				tooltipProps={{ title: 'trend' }}
				value={100}
				compareValue={0}
				hideWithoutCompareValue={true}
			/>,
		)
		expect(container.innerHTML).toBe('')
	})
})
