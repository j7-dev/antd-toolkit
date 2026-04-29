import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ActionButton } from './index'

describe('ActionButton', () => {
	it('初始顯示編輯按鈕，點擊後切換為儲存和取消按鈕', () => {
		const onEdit = vi.fn()
		render(<ActionButton onEdit={onEdit} />)
		expect(screen.getByText('編輯')).toBeInTheDocument()
		expect(screen.queryByText('儲存')).not.toBeInTheDocument()

		fireEvent.click(screen.getByText('編輯'))
		expect(onEdit).toHaveBeenCalled()
		expect(screen.getByText('儲存')).toBeInTheDocument()
		expect(screen.getByText('取消')).toBeInTheDocument()
		expect(screen.queryByText('編輯')).not.toBeInTheDocument()
	})

	it('點擊取消按鈕恢復檢視模式', () => {
		const onCancel = vi.fn()
		render(<ActionButton onCancel={onCancel} />)
		fireEvent.click(screen.getByText('編輯'))
		fireEvent.click(screen.getByText('取消'))
		expect(onCancel).toHaveBeenCalled()
		expect(screen.getByText('編輯')).toBeInTheDocument()
	})

	it('canDelete=true 時顯示刪除按鈕帶 Popconfirm', () => {
		render(<ActionButton canDelete={true} />)
		expect(screen.getByText('刪除')).toBeInTheDocument()
	})

	it('canDelete=false 時不顯示刪除按鈕', () => {
		render(<ActionButton canDelete={false} />)
		expect(screen.queryByText('刪除')).not.toBeInTheDocument()
	})
})
