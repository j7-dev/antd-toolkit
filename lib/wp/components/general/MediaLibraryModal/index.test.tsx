import { render } from '@testing-library/react'
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

vi.mock('@/wp', () => ({
	MediaLibrary: ({ selectedItems, setSelectedItems }: any) => (
		<div data-testid="media-library">MediaLibrary Mock</div>
	),
}))

vi.mock('@/main/components/SimpleModal', () => ({
	SimpleModal: ({ children, ...props }: any) => (
		<div data-testid="simple-modal">{children}</div>
	),
}))

vi.mock('./hooks', () => ({}))

import { MediaLibraryModal } from './index'

describe('MediaLibraryModal', () => {
	it('不崩潰地渲染媒體庫彈窗元件', () => {
		const { container } = render(
			<MediaLibraryModal
				modalProps={{
					modalTitle: 'Select Media',
				}}
				mediaLibraryProps={{
					selectedItems: [],
					setSelectedItems: vi.fn(),
				}}
			/>,
		)
		expect(container.querySelector('[data-testid="simple-modal"]')).toBeInTheDocument()
		expect(container.querySelector('[data-testid="media-library"]')).toBeInTheDocument()
	})
})
