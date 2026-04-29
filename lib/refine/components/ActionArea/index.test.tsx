import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

const { mockUseThemedLayoutContext, mockUseBreakpoint } = vi.hoisted(
	() => ({
		mockUseThemedLayoutContext: vi.fn(() => ({
			siderCollapsed: false,
		})),
		mockUseBreakpoint: vi.fn(() => ({
			lg: true,
		})),
	}),
)

// Mock @refinedev/antd
vi.mock('@refinedev/antd', () => ({
	useThemedLayoutContext: mockUseThemedLayoutContext,
}))

// Mock @refinedev/core - also provide useThemedLayoutContext in case
// @refinedev/antd internally re-exports from @refinedev/core
vi.mock('@refinedev/core', () => ({
	useThemedLayoutContext: mockUseThemedLayoutContext,
}))

// Mock antd Grid
vi.mock('antd', async () => {
	const actual = await vi.importActual<any>('antd')
	return {
		...actual,
		Grid: {
			useBreakpoint: mockUseBreakpoint,
		},
	}
})

import { ActionArea } from './index'

describe('ActionArea', () => {
	it('渲染子元件於固定底部區域', () => {
		render(
			<ActionArea>
				<span>批量操作</span>
			</ActionArea>,
		)
		expect(screen.getByText('批量操作')).toBeInTheDocument()
	})

	it('桌面模式下使用 sider 展開寬度計算 width', () => {
		mockUseThemedLayoutContext.mockReturnValue({
			siderCollapsed: false,
		})
		mockUseBreakpoint.mockReturnValue({ lg: true })

		const { container } = render(
			<ActionArea>
				<span>Content</span>
			</ActionArea>,
		)

		const el = container.firstChild as HTMLElement
		expect(el.style.position).toBe('fixed')
		// 預設 expandedWidth=200, desktop padding=24 => 200 + 48 = 248
		expect(el.style.width).toBe('calc(100% - 248px)')
	})

	it('桌面模式 sider 收合時使用 collapsedWidth', () => {
		mockUseThemedLayoutContext.mockReturnValue({
			siderCollapsed: true,
		})
		mockUseBreakpoint.mockReturnValue({ lg: true })

		const { container } = render(
			<ActionArea>
				<span>Content</span>
			</ActionArea>,
		)

		const el = container.firstChild as HTMLElement
		// 預設 collapsedWidth=80, desktop padding=24 => 80 + 48 = 128
		expect(el.style.width).toBe('calc(100% - 128px)')
	})

	it('行動版模式下只扣除 padding 不計算 sider', () => {
		mockUseBreakpoint.mockReturnValue({ lg: false })

		const { container } = render(
			<ActionArea>
				<span>Content</span>
			</ActionArea>,
		)

		const el = container.firstChild as HTMLElement
		// 預設 mobile padding=12 => 12*2 = 24
		expect(el.style.width).toBe('calc(100% - 24px)')
	})

	it('自訂 mainPadding 和 collapsedWidth/expandedWidth', () => {
		mockUseThemedLayoutContext.mockReturnValue({
			siderCollapsed: false,
		})
		mockUseBreakpoint.mockReturnValue({ lg: true })

		const { container } = render(
			<ActionArea
				mainPadding={[8, 16]}
				collapsedWidth={60}
				expandedWidth={240}
			>
				<span>Content</span>
			</ActionArea>,
		)

		const el = container.firstChild as HTMLElement
		// expandedWidth=240, desktop padding=16 => 240 + 32 = 272
		expect(el.style.width).toBe('calc(100% - 272px)')
		expect(el.style.right).toBe('16px')
	})
})
