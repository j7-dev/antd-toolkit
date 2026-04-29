import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ToggleContent } from './index'

describe('ToggleContent', () => {
	it('預設顯示收合狀態與展開按鈕', () => {
		render(
			<ToggleContent
				content="<p>Some long content here</p>"
				className=""
			/>,
		)
		expect(screen.getByText('展開全部')).toBeInTheDocument()
		expect(screen.queryByText('收合全部')).not.toBeInTheDocument()
	})

	it('點擊展開後顯示完整內容與收合按鈕', () => {
		render(
			<ToggleContent
				content="<p>Some long content here</p>"
				className=""
			/>,
		)
		fireEvent.click(screen.getByText('展開全部'))
		expect(screen.getByText('收合全部')).toBeInTheDocument()
		expect(screen.queryByText('展開全部')).not.toBeInTheDocument()
	})

	it('點擊收合後恢復收合狀態', () => {
		render(
			<ToggleContent
				content="<p>Some long content here</p>"
				className=""
			/>,
		)
		fireEvent.click(screen.getByText('展開全部'))
		fireEvent.click(screen.getByText('收合全部'))
		expect(screen.getByText('展開全部')).toBeInTheDocument()
	})
})
