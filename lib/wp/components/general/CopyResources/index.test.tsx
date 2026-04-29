import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@refinedev/core', () => ({
	useCustomMutation: vi.fn(() => ({
		mutate: vi.fn(),
		isLoading: false,
	})),
	useApiUrl: vi.fn(() => 'http://test.local/wp-json'),
	useInvalidate: vi.fn(() => vi.fn()),
}))

vi.mock('@/refine', () => ({
	notificationProps: {},
}))

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		tooltip: '複製此資源',
	}),
}))

import { CopyResources } from './index'

describe('CopyResources', () => {
	it('渲染複製按鈕與 tooltip', () => {
		render(
			<CopyResources
				id="123"
				invalidateProps={{ resource: 'posts' }}
			/>,
		)
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
	})

	it('支援自訂 children 內容', () => {
		render(
			<CopyResources
				id="123"
				invalidateProps={{ resource: 'posts' }}
			>
				複製
			</CopyResources>,
		)
		expect(screen.getByText('複製')).toBeInTheDocument()
	})
})
