import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/main/utils', () => ({
	cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}))

vi.mock('@/main', () => ({
	useEnv: () => ({
		SITE_URL: 'http://test.local',
	}),
}))

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		label: '回到 WordPress 後台',
	}),
}))

import { BackToWpAdmin } from './index'

describe('BackToWpAdmin', () => {
	it('渲染返回 WordPress 後台的導航連結', () => {
		render(<BackToWpAdmin collapsed={false} />)
		expect(screen.getByText('回到 WordPress 後台')).toBeInTheDocument()
	})

	it('預設連結指向 WordPress 管理面板', () => {
		const { container } = render(<BackToWpAdmin collapsed={false} />)
		const link = container.querySelector('a')
		expect(link).toHaveAttribute('href', 'http://test.local/wp-admin/')
	})

	it('支援自訂 href 覆蓋預設連結', () => {
		const { container } = render(
			<BackToWpAdmin collapsed={false} href="http://custom.local/admin" />,
		)
		const link = container.querySelector('a')
		expect(link).toHaveAttribute('href', 'http://custom.local/admin')
	})

	it('collapsed 為 true 時不顯示文字標籤', () => {
		render(<BackToWpAdmin collapsed={true} />)
		expect(screen.queryByText('回到 WordPress 後台')).not.toBeInTheDocument()
	})

	it('collapsed 為 true 時仍渲染 SVG 圖示', () => {
		const { container } = render(<BackToWpAdmin collapsed={true} />)
		expect(container.querySelector('svg')).toBeInTheDocument()
	})
})
