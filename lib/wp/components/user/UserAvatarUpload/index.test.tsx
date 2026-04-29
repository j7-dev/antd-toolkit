import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { Form } from 'antd'

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	})
})

import { UserAvatarUpload } from './index'

const RenderWithForm = () => {
	const [form] = Form.useForm()
	return (
		<Form form={form} initialValues={{ id: '', user_avatar_url: '' }}>
			<UserAvatarUpload nonce="test-nonce" name="user_avatar_url" />
		</Form>
	)
}

describe('UserAvatarUpload', () => {
	it('不崩潰地渲染頭像上傳元件', () => {
		const { container } = render(<RenderWithForm />)
		expect(container.querySelector('.at-flex')).toBeInTheDocument()
	})

	it('渲染上傳提示文字', () => {
		const { container } = render(<RenderWithForm />)
		expect(container.textContent).toContain('建議尺寸')
		expect(container.textContent).toContain('400x400')
	})
})
