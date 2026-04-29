import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SelectedRecord } from './index'

describe('SelectedRecord', () => {
	it('顯示已選數量與清除/顯示按鈕', () => {
		const onClear = vi.fn()
		const onSelected = vi.fn()
		render(
			<SelectedRecord
				ids={['1', '2', '3']}
				onClear={onClear}
				onSelected={onSelected}
				resourceLabel="用戶"
			/>,
		)
		expect(screen.getByText('已選擇 3 個 用戶')).toBeInTheDocument()
		expect(screen.getByText('清除選取')).toBeInTheDocument()
		expect(screen.getByText('顯示已選 用戶')).toBeInTheDocument()
	})

	it('點擊清除按鈕呼叫 onClear', () => {
		const onClear = vi.fn()
		render(
			<SelectedRecord ids={['1']} onClear={onClear} resourceLabel="" />,
		)
		fireEvent.click(screen.getByText('清除選取'))
		expect(onClear).toHaveBeenCalledTimes(1)
	})

	it('hideOnEmpty=true 且無選取時顯示空佔位 div', () => {
		const { container } = render(
			<SelectedRecord ids={[]} hideOnEmpty={true} />,
		)
		const spacer = container.querySelector('.at-h-8')
		expect(spacer).toBeInTheDocument()
	})

	it('hideOnEmpty=false 且無選取時仍顯示選取區', () => {
		render(
			<SelectedRecord
				ids={[]}
				hideOnEmpty={false}
				resourceLabel="商品"
			/>,
		)
		expect(screen.getByText('已選擇 0 個 商品')).toBeInTheDocument()
	})
})
