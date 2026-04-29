import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/wp', () => ({
	TImage: {},
}))

vi.mock('@/main', () => ({
	defaultImage: 'https://placeholder.test/default.png',
	cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
	NameId: ({ name, id }: { name: string; id: string }) => (
		<span>{name} #{id}</span>
	),
}))

import { ProductName } from './index'

describe('ProductName', () => {
	const baseRecord = {
		id: '123',
		name: 'Test Product',
		sku: 'SKU-001',
		images: [{ id: '1', url: 'https://example.com/product.jpg' }],
		attribute_summary: 'Red, Large',
	}

	it('顯示商品名稱作為連結到編輯頁面', () => {
		render(<ProductName record={baseRecord} />)
		expect(screen.getByText('Test Product #123')).toBeInTheDocument()
	})

	it('顯示 SKU 與屬性摘要的商品 meta 資訊', () => {
		render(<ProductName record={baseRecord} />)
		expect(screen.getByText('SKU: SKU-001, Red, Large')).toBeInTheDocument()
	})

	it('hideImage 為 true 時不渲染商品圖片', () => {
		const { container } = render(
			<ProductName record={baseRecord} hideImage />,
		)
		expect(container.querySelector('.ant-image')).toBeNull()
	})

	it('無 SKU 時僅顯示屬性摘要', () => {
		const recordNoSku = { ...baseRecord, sku: '' }
		render(<ProductName record={recordNoSku} />)
		expect(screen.getByText('Red, Large')).toBeInTheDocument()
	})

	it('無圖片時使用預設圖片', () => {
		const recordNoImages = { ...baseRecord, images: [] }
		render(<ProductName record={recordNoImages} />)
		const img = document.querySelector('.ant-image img') as HTMLImageElement
		expect(img?.src).toContain('placeholder.test/default.png')
	})
})
