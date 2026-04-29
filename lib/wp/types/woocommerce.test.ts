import { describe, it, expect } from 'vitest'
import {
	WoocommerceSchema,
	TaxonomySchema,
	DEFAULT_WOOCOMMERCE,
} from './woocommerce'

describe('TWoocommerce (Zod Schema)', () => {
	it('DEFAULT_WOOCOMMERCE 通過 WoocommerceSchema 驗證', () => {
		const result = WoocommerceSchema.safeParse(DEFAULT_WOOCOMMERCE)
		expect(result.success).toBe(true)
	})

	it('TaxonomySchema 驗證正確的 taxonomy 結構', () => {
		const validTaxonomy = {
			value: 'product_cat',
			label: '商品分類',
			hierarchical: true,
			publicly_queryable: true,
		}
		const result = TaxonomySchema.safeParse(validTaxonomy)
		expect(result.success).toBe(true)
	})

	it('DEFAULT_WOOCOMMERCE 包含所有必要欄位的零值預設', () => {
		expect(DEFAULT_WOOCOMMERCE.countries).toEqual({})
		expect(DEFAULT_WOOCOMMERCE.currency).toEqual({ slug: '', symbol: '' })
		expect(DEFAULT_WOOCOMMERCE.product_taxonomies).toEqual([])
		expect(DEFAULT_WOOCOMMERCE.manage_stock).toBe(true)
		expect(DEFAULT_WOOCOMMERCE.product_types).toEqual([])
		expect(DEFAULT_WOOCOMMERCE.order_statuses).toEqual([])
		expect(DEFAULT_WOOCOMMERCE.post_statuses).toEqual([])
		expect(DEFAULT_WOOCOMMERCE.product_stock_statuses).toEqual([])
	})
})
