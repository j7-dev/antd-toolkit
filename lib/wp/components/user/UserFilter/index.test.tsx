import { render, screen } from '@testing-library/react'
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

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		keywordSearch: '關鍵字搜尋',
		keywordPlaceholder: '請輸入關鍵字',
		includeUsers: '包含特定使用者',
		userIdPlaceholder: '請輸入使用者 ID',
		filter: '篩選',
		reset: '重置',
	}),
}))

import { UserFilter } from './index'

const RenderWithForm = ({
	hideInclude,
}: {
	hideInclude?: boolean
}) => {
	const [form] = Form.useForm()
	return (
		<UserFilter
			formProps={{ form }}
			hideInclude={hideInclude}
		/>
	)
}

describe('UserFilter', () => {
	it('渲染關鍵字搜尋欄位與篩選按鈕', () => {
		render(<RenderWithForm />)
		expect(screen.getByText('關鍵字搜尋')).toBeInTheDocument()
		expect(screen.getByText('篩選')).toBeInTheDocument()
		expect(screen.getByText('重置')).toBeInTheDocument()
	})

	it('顯示包含特定使用者 ID 欄位', () => {
		render(<RenderWithForm />)
		expect(screen.getByText('包含特定使用者')).toBeInTheDocument()
	})

	it('hideInclude 為 true 時隱藏包含使用者欄位', () => {
		render(<RenderWithForm hideInclude />)
		expect(screen.queryByText('包含特定使用者')).not.toBeInTheDocument()
	})

	it('使用 locale 提供所有標籤文字', () => {
		render(<RenderWithForm />)
		expect(screen.getByPlaceholderText('請輸入關鍵字')).toBeInTheDocument()
	})
})
