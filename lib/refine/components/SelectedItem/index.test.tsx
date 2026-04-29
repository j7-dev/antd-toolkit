import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

// Mock @refinedev/antd
vi.mock('@refinedev/antd', () => ({}))

// Mock useLocale to return locale strings
vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		tooltipContent: (label: string, ids: string) =>
			`已選擇的${label}: ${ids}`,
		selectedCount: (count: number, label: string) =>
			`已選擇 ${count} 個${label}`,
		clearSelection: '清除選擇',
		showSelected: (label: string) => `顯示已選${label}`,
	}),
}))

import { SelectedItem } from './index'

describe('SelectedItem', () => {
	it('有選取項目時顯示黃色 badge 與數量', () => {
		render(<SelectedItem ids={['1', '2', '3']} />)
		expect(screen.getByText('已選擇 3 個物件')).toBeInTheDocument()
	})

	it('無選取項目時顯示空白佔位區塊', () => {
		const { container } = render(<SelectedItem ids={[]} />)
		// 應該有空白 div 佔位
		const placeholder = container.querySelector('.at-h-8')
		expect(placeholder).toBeInTheDocument()
	})

	it('自訂 label 顯示在選取數量中', () => {
		render(<SelectedItem ids={['1']} label="商品" />)
		expect(screen.getByText('已選擇 1 個商品')).toBeInTheDocument()
	})

	it('提供 onClear 時顯示清除按鈕', () => {
		const onClear = vi.fn()
		render(<SelectedItem ids={['1']} onClear={onClear} />)

		const clearButton = screen.getByText('清除選擇')
		expect(clearButton).toBeInTheDocument()
		fireEvent.click(clearButton)
		expect(onClear).toHaveBeenCalledTimes(1)
	})

	it('提供 onSelected 時顯示「顯示已選」按鈕', () => {
		const onSelected = vi.fn()
		render(
			<SelectedItem ids={['1']} onSelected={onSelected} label="用戶" />,
		)

		const showButton = screen.getByText('顯示已選用戶')
		expect(showButton).toBeInTheDocument()
		fireEvent.click(showButton)
		expect(onSelected).toHaveBeenCalledTimes(1)
	})

	it('未提供 onClear/onSelected 時不顯示對應按鈕', () => {
		render(<SelectedItem ids={['1']} />)
		expect(screen.queryByText('清除選擇')).not.toBeInTheDocument()
		expect(screen.queryByText(/顯示已選/)).not.toBeInTheDocument()
	})
})
