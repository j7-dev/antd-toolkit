import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/main', () => ({
	defaultImage: 'https://placeholder.test/default.png',
	renderHTML: (html: string) => html,
	NameId: ({ name, id }: { name: string; id: string }) => (
		<span>{name} #{id}</span>
	),
}))

import { UserName } from './index'

describe('UserName', () => {
	const baseRecord = {
		id: '42',
		display_name: 'John Doe',
		user_email: 'john@example.com',
		user_avatar_url: 'https://example.com/avatar.jpg',
	}

	it('顯示使用者頭像與顯示名稱', () => {
		render(<UserName record={baseRecord} />)
		expect(screen.getByText('John Doe #42')).toBeInTheDocument()
	})

	it('顯示使用者電子郵件', () => {
		render(<UserName record={baseRecord} />)
		expect(screen.getByText('john@example.com')).toBeInTheDocument()
	})

	it('hideImage 為 true 時不渲染頭像', () => {
		const { container } = render(
			<UserName record={baseRecord} hideImage />,
		)
		expect(container.querySelector('.ant-image')).toBeNull()
	})

	it('有 onClick 時元素可點擊', () => {
		const onClick = vi.fn()
		const { container } = render(
			<UserName record={baseRecord} onClick={onClick} />,
		)
		const clickable = container.querySelector('.at-cursor-pointer')
		expect(clickable).toBeInTheDocument()
	})

	it('自訂 renderTitle 取代預設名稱顯示', () => {
		render(
			<UserName
				record={baseRecord}
				renderTitle={<span>Custom Title</span>}
			/>,
		)
		expect(screen.getByText('Custom Title')).toBeInTheDocument()
	})
})
