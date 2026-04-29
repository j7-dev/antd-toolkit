import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PopconfirmDelete } from './index'

describe('PopconfirmDelete', () => {
	it('type="icon" 時渲染 DeleteOutlined 圖示按鈕', () => {
		render(
			<PopconfirmDelete
				popconfirmProps={{ onConfirm: () => {} }}
				type="icon"
			/>,
		)
		expect(
			screen.getByRole('img', { name: 'delete' }),
		).toBeInTheDocument()
	})

	it('type="button" 時渲染 danger 按鈕', () => {
		render(
			<PopconfirmDelete
				popconfirmProps={{ onConfirm: () => {} }}
				type="button"
			/>,
		)
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('ant-btn-dangerous')
	})
})
