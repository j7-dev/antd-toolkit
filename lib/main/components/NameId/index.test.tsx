import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock @/main barrel to provide cn without circular deps
vi.mock('@/main', () => ({
	cn: (...args: unknown[]) => args.filter(Boolean).flat().join(' '),
	renderHTML: (html: string) => {
		const { createElement } = require('react')
		return createElement('div', {
			dangerouslySetInnerHTML: { __html: html },
		})
	},
}))

import { NameId } from './index'

describe('NameId', () => {
	it('顯示名稱與 #id 後綴', () => {
		const { container } = render(<NameId name="John" id="123" />)
		expect(container.querySelector('.at-name')).toBeInTheDocument()
		expect(container.querySelector('.at-id')).toBeInTheDocument()
		expect(container.querySelector('.at-id')?.textContent).toBe('#123')
	})

	it('字串名稱透過 renderHTML 渲染為 HTML', () => {
		const { container } = render(
			<NameId name="<strong>Bold Name</strong>" id="1" />,
		)
		const strong = container.querySelector('strong')
		expect(strong).toBeInTheDocument()
		expect(strong?.textContent).toBe('Bold Name')
	})

	it('id 為空字串時不顯示 # 後綴', () => {
		const { container } = render(<NameId name="Test" id="" />)
		expect(container.querySelector('.at-id')?.textContent).toBe('')
	})
})
