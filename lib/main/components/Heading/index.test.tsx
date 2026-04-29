import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading } from './index'

describe('Heading', () => {
	it('size="md" 時渲染 Title 帶有藍色左邊框', () => {
		const { container } = render(
			<Heading size="md">Section Title</Heading>,
		)
		expect(screen.getByText('Section Title')).toBeInTheDocument()
		const heading = container.querySelector('h2')
		expect(heading).toBeInTheDocument()
	})

	it('size="sm" 時渲染 Divider 帶有 SendOutlined 圖示', () => {
		render(<Heading size="sm">Small Section</Heading>)
		expect(screen.getByText('Small Section')).toBeInTheDocument()
	})

	it('hideIcon=true 時不顯示圖示', () => {
		const { container } = render(
			<Heading size="md" hideIcon>
				No Icon
			</Heading>,
		)
		expect(screen.getByText('No Icon')).toBeInTheDocument()
		const heading = container.querySelector('h2')
		expect(heading).toHaveStyle({ borderLeft: 'none' })
	})
})
