import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCat } from './index'

describe('ProductCat', () => {
	it('渲染商品分類為 Tag 標籤', () => {
		const categories = [
			{ value: 'cat-1', label: '電子產品' },
			{ value: 'cat-2', label: '手機' },
		]
		render(<ProductCat categories={categories} tags={[]} />)
		expect(screen.getByText('電子產品')).toBeInTheDocument()
		expect(screen.getByText('手機')).toBeInTheDocument()
	})

	it('渲染商品標籤為 # 前綴文字', () => {
		const tags = [
			{ value: 'tag-1', label: '熱銷' },
			{ value: 'tag-2', label: '新品' },
		]
		render(<ProductCat categories={[]} tags={tags} />)
		expect(screen.getByText('#熱銷')).toBeInTheDocument()
		expect(screen.getByText('#新品')).toBeInTheDocument()
	})

	it('分類與標籤都為空時不渲染內容文字', () => {
		const { container } = render(
			<ProductCat categories={[]} tags={[]} />,
		)
		const tags = container.querySelectorAll('.ant-tag')
		expect(tags).toHaveLength(0)
	})
})
