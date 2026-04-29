import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('react-icons/io', () => ({
	IoMdDownload: (props: any) => <span data-testid="download-icon" {...props} />,
}))

vi.mock('@/wp/types', () => ({}))

vi.mock('@/wp', () => ({
	stringToBool: (val: any) =>
		['yes', '1', 1, 'true', 'on'].includes(val) || val === true,
	useWoocommerce: () => ({
		product_types: [
			{ value: 'simple', label: '簡單商品', color: 'processing' },
			{ value: 'variable', label: '可變商品', color: 'magenta' },
		],
	}),
}))

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		featured: '精選商品',
		notFeatured: '非精選商品',
		virtual: '虛擬商品',
		notVirtual: '非虛擬商品',
		downloadable: '可下載',
		notDownloadable: '不可下載',
	}),
}))

import { ProductType } from './index'

describe('ProductType', () => {
	it('顯示商品類型為有顏色的 Tag 標籤', () => {
		const record = {
			type: 'simple' as const,
			featured: false,
			virtual: false,
			downloadable: false,
		}
		render(<ProductType record={record} />)
		expect(screen.getByText('簡單商品')).toBeInTheDocument()
	})

	it('featured 為 true 時顯示填滿星星圖示', () => {
		const record = {
			type: 'simple' as const,
			featured: true,
			virtual: false,
			downloadable: false,
		}
		const { container } = render(<ProductType record={record} />)
		expect(container.querySelector('.anticon-star')).toBeInTheDocument()
		expect(container.querySelector('.at-text-yellow-400')).toBeInTheDocument()
	})

	it('featured 為 false 時顯示空心星星圖示', () => {
		const record = {
			type: 'simple' as const,
			featured: false,
			virtual: false,
			downloadable: false,
		}
		const { container } = render(<ProductType record={record} />)
		expect(container.querySelector('.anticon-star')).toBeInTheDocument()
		expect(container.querySelector('.at-text-gray-400')).toBeInTheDocument()
	})

	it('virtual 為 true 時顯示填滿雲端圖示', () => {
		const record = {
			type: 'simple' as const,
			featured: false,
			virtual: true,
			downloadable: false,
		}
		const { container } = render(<ProductType record={record} />)
		expect(container.querySelector('.anticon-cloud')).toBeInTheDocument()
		expect(container.querySelector('.at-text-primary')).toBeInTheDocument()
	})

	it('type 為空時不渲染', () => {
		const record = {
			type: '' as any,
			featured: false,
			virtual: false,
			downloadable: false,
		}
		const { container } = render(<ProductType record={record} />)
		expect(container.innerHTML).toBe('')
	})
})
