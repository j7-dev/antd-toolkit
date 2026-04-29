import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'

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

vi.mock('antd-img-crop', () => ({
	default: ({ children }: any) => <div data-testid="img-crop">{children}</div>,
}))

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		uploadHint: '點擊或拖曳上傳',
		supportType: (accept: string) => `支援檔案類型: ${accept}`,
	}),
}))

import { Upload } from './index'

describe('Upload', () => {
	it('渲染拖放上傳元件包含 ImgCrop', () => {
		const { container } = render(
			<Upload uploadProps={{ accept: 'image/*' }} />,
		)
		expect(container.querySelector('[data-testid="img-crop"]')).toBeInTheDocument()
	})

	it('顯示預設上傳提示文字', () => {
		render(<Upload uploadProps={{ accept: 'image/*' }} />)
		expect(screen.getByText('點擊或拖曳上傳')).toBeInTheDocument()
	})

	it('有 accept 時顯示支援的檔案類型', () => {
		render(<Upload uploadProps={{ accept: '.jpg,.png' }} />)
		expect(screen.getByText('支援檔案類型: .jpg,.png')).toBeInTheDocument()
	})

	it('自訂 children 取代預設上傳 UI', () => {
		render(
			<Upload uploadProps={{}}>
				<span>自訂上傳區域</span>
			</Upload>,
		)
		expect(screen.getByText('自訂上傳區域')).toBeInTheDocument()
	})
})
