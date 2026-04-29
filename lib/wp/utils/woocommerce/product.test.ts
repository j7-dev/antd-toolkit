import { describe, it, expect } from 'vitest'
import {
	BACKORDERS,
	PRODUCT_STOCK_STATUS,
	PRODUCT_TYPES,
	PRODUCT_CATALOG_VISIBILITIES,
	getProductFilterLabels,
	productKeyLabelMapper,
	isVariable,
	isVariation,
	isSubscription,
	getIsVariation,
} from './product'

describe('PRODUCT_STOCK_STATUS', () => {
	it('定義庫存狀態及對應顏色', () => {
		const values = PRODUCT_STOCK_STATUS.map((s) => s.value)
		expect(values).toEqual(['instock', 'outofstock', 'onbackorder'])

		expect(
			PRODUCT_STOCK_STATUS.find((s) => s.value === 'instock')?.color,
		).toBe('blue')
		expect(
			PRODUCT_STOCK_STATUS.find((s) => s.value === 'outofstock')?.color,
		).toBe('magenta')
		expect(
			PRODUCT_STOCK_STATUS.find((s) => s.value === 'onbackorder')?.color,
		).toBe('cyan')
	})
})

describe('BACKORDERS', () => {
	it('定義無庫存下單選項', () => {
		const values = BACKORDERS.map((b) => b.value)
		expect(values).toEqual(['no', 'yes', 'notify'])
	})
})

describe('PRODUCT_TYPES', () => {
	it('定義 WooCommerce 商品類型及對應顏色', () => {
		const values = PRODUCT_TYPES.map((t) => t.value)
		expect(values).toContain('simple')
		expect(values).toContain('grouped')
		expect(values).toContain('external')
		expect(values).toContain('variable')
		expect(values).toContain('variation')
		expect(values).toContain('subscription')
		expect(values).toContain('variable-subscription')
		expect(values).toContain('subscription_variation')
	})
})

describe('PRODUCT_CATALOG_VISIBILITIES', () => {
	it('定義商品目錄可見度選項', () => {
		const values = PRODUCT_CATALOG_VISIBILITIES.map((v) => v.value)
		expect(values).toEqual(['hidden', 'visible', 'search', 'catalog'])

		expect(
			PRODUCT_CATALOG_VISIBILITIES.find((v) => v.value === 'hidden')?.color,
		).toBe('red')
		expect(
			PRODUCT_CATALOG_VISIBILITIES.find((v) => v.value === 'visible')?.color,
		).toBe('green')
	})
})

describe('isVariable', () => {
	it('type 以 variable 開頭時回傳 true', () => {
		expect(isVariable('variable')).toBe(true)
		expect(isVariable('variable-subscription')).toBe(true)
	})

	it('type 不以 variable 開頭時回傳 false/undefined', () => {
		expect(isVariable('simple')).toBe(false)
		expect(isVariable('variation')).toBe(false)
		expect(isVariable(undefined)).toBeUndefined()
	})
})

describe('isVariation', () => {
	it('type 包含 variation 時回傳 true', () => {
		expect(isVariation('variation')).toBe(true)
		expect(isVariation('subscription_variation')).toBe(true)
	})

	it('type 不包含 variation 時回傳 false', () => {
		expect(isVariation('simple')).toBe(false)
		expect(isVariation('variable')).toBe(false)
		expect(isVariation(undefined)).toBe(false)
	})
})

describe('isSubscription', () => {
	it('type 包含 subscription 時回傳 true', () => {
		expect(isSubscription('subscription')).toBe(true)
		expect(isSubscription('variable-subscription')).toBe(true)
		expect(isSubscription('subscription_variation')).toBe(true)
	})

	it('type 不包含 subscription 時回傳 false', () => {
		expect(isSubscription('simple')).toBe(false)
		expect(isSubscription('variable')).toBe(false)
	})
})

describe('getIsVariation', () => {
	it('是 isVariation 的已棄用別名', () => {
		expect(getIsVariation('variation')).toBe(true)
		expect(getIsVariation('simple')).toBe(false)
	})
})

describe('getProductFilterLabels', () => {
	it('預設 label 為商品，回傳各篩選欄位的中文標籤', () => {
		const labels = getProductFilterLabels()
		expect(labels.s).toBe('關鍵字')
		expect(labels.sku).toBe('貨號(sku)')
		expect(labels.type).toBe('商品類型')
		expect(labels.product_category_id).toBe('商品分類')
		expect(labels.status).toBe('商品狀態')
	})

	it('自訂 label 參數會替換預設的商品字串', () => {
		const labels = getProductFilterLabels('課程')
		expect(labels.product_category_id).toBe('課程分類')
		expect(labels.status).toBe('課程狀態')
	})
})

describe('productKeyLabelMapper', () => {
	it('根據 key 回傳對應中文標籤', () => {
		expect(productKeyLabelMapper('s')).toBe('關鍵字')
		expect(productKeyLabelMapper('type')).toBe('商品類型')
	})

	it('支援自訂 label 參數', () => {
		expect(productKeyLabelMapper('status', '課程')).toBe('課程狀態')
	})
})
