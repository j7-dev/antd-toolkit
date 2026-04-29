import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CopyText } from './index'

describe('CopyText', () => {
	beforeEach(() => {
		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
		})
	})

	it('點擊後複製文字到剪貼簿並顯示成功訊息', async () => {
		render(<CopyText text="hello world" />)
		const copyButton = screen.getByRole('img', { name: 'copy' })
		fireEvent.click(copyButton)
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			'hello world',
		)
		await waitFor(() => {
			expect(screen.getByText('複製成功')).toBeInTheDocument()
		})
	})

	it('複製失敗時顯示錯誤訊息', async () => {
		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn().mockRejectedValue(new Error('fail')),
			},
		})
		render(<CopyText text="hello world" />)
		const copyButton = screen.getByRole('img', { name: 'copy' })
		fireEvent.click(copyButton)
		await waitFor(() => {
			expect(
				screen.getByText('OOPS! 複製失敗'),
			).toBeInTheDocument()
		})
	})

	it('支援自訂 children 作為觸發元素', () => {
		render(
			<CopyText text="test">
				<button>複製按鈕</button>
			</CopyText>,
		)
		expect(screen.getByText('複製按鈕')).toBeInTheDocument()
	})
})
