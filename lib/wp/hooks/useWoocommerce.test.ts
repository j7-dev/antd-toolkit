import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

const mockUseCustom = vi.fn()
const mockUseApiUrl = vi.fn()

vi.mock('@refinedev/core', () => ({
	useCustom: (...args: any[]) => mockUseCustom(...args),
	useApiUrl: () => mockUseApiUrl(),
}))

vi.mock('@/main', () => ({
	safeParse: vi.fn(),
}))

import { useWoocommerce, useCountries, useCountryOptions } from './useWoocommerce'

describe('useWoocommerce', () => {
	it('從 API 取得 WooCommerce 設定並回傳', () => {
		mockUseApiUrl.mockReturnValue('http://test.local/wp-json')
		mockUseCustom.mockReturnValue({
			data: {
				data: {
					data: {
						countries: { TW: '台灣' },
						currency: { slug: 'TWD', symbol: 'NT$' },
						product_taxonomies: [],
						notify_low_stock_amount: 2,
						dimension_unit: 'cm',
						weight_unit: 'kg',
						permalinks: {
							product_base: '',
							category_base: '',
							tag_base: '',
							attribute_base: '',
							use_verbose_page_rules: false,
							product_rewrite_slug: '',
							category_rewrite_slug: '',
							tag_rewrite_slug: '',
							attribute_rewrite_slug: '',
						},
						manage_stock: true,
						product_types: [],
						order_statuses: [],
						post_statuses: [],
						product_stock_statuses: [],
					},
				},
			},
			isLoading: false,
		})

		const { result } = renderHook(() => useWoocommerce())
		expect(result.current.currency.slug).toBe('TWD')
		expect(result.current.countries).toEqual({ TW: '台灣' })
	})

	it('載入中時回傳預設值', () => {
		mockUseApiUrl.mockReturnValue('http://test.local/wp-json')
		mockUseCustom.mockReturnValue({
			data: undefined,
			isLoading: true,
		})

		const { result } = renderHook(() => useWoocommerce())
		expect(result.current.currency.slug).toBe('')
		expect(result.current.manage_stock).toBe(true)
	})
})

describe('useCountries', () => {
	it('從 WooCommerce 設定回傳國家 key-value', () => {
		mockUseApiUrl.mockReturnValue('http://test.local/wp-json')
		mockUseCustom.mockReturnValue({
			data: {
				data: {
					data: {
						countries: { TW: '台灣', JP: '日本' },
						currency: { slug: '', symbol: '' },
						product_taxonomies: [],
						notify_low_stock_amount: 0,
						dimension_unit: '',
						weight_unit: '',
						permalinks: {
							product_base: '',
							category_base: '',
							tag_base: '',
							attribute_base: '',
							use_verbose_page_rules: false,
							product_rewrite_slug: '',
							category_rewrite_slug: '',
							tag_rewrite_slug: '',
							attribute_rewrite_slug: '',
						},
						manage_stock: true,
						product_types: [],
						order_statuses: [],
						post_statuses: [],
						product_stock_statuses: [],
					},
				},
			},
			isLoading: false,
		})

		const { result } = renderHook(() => useCountries())
		expect(result.current).toEqual({ TW: '台灣', JP: '日本' })
	})
})

describe('useCountryOptions', () => {
	it('將國家資料轉為 Select 選項格式', () => {
		mockUseApiUrl.mockReturnValue('http://test.local/wp-json')
		mockUseCustom.mockReturnValue({
			data: {
				data: {
					data: {
						countries: { TW: '台灣', JP: '日本' },
						currency: { slug: '', symbol: '' },
						product_taxonomies: [],
						notify_low_stock_amount: 0,
						dimension_unit: '',
						weight_unit: '',
						permalinks: {
							product_base: '',
							category_base: '',
							tag_base: '',
							attribute_base: '',
							use_verbose_page_rules: false,
							product_rewrite_slug: '',
							category_rewrite_slug: '',
							tag_rewrite_slug: '',
							attribute_rewrite_slug: '',
						},
						manage_stock: true,
						product_types: [],
						order_statuses: [],
						post_statuses: [],
						product_stock_statuses: [],
					},
				},
			},
			isLoading: false,
		})

		const { result } = renderHook(() => useCountryOptions())
		expect(result.current).toEqual([
			{ label: '台灣', value: 'TW' },
			{ label: '日本', value: 'JP' },
		])
	})
})
