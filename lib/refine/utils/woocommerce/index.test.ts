import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({
	BaseRecord: {},
}))

// Mock @refinedev/antd
vi.mock('@refinedev/antd', () => ({}))

// Mock @/refine
vi.mock('@/refine', () => ({
	objToCrudFilters: (values: Record<string, any>) => {
		return Object.keys(values).reduce((acc: any[], key) => {
			if (values[key]) {
				acc.push({
					field: key,
					operator: 'eq',
					value: values[key],
				})
			}
			return acc
		}, [])
	},
}))

// Mock @/refine/types
vi.mock('@/refine/types', () => ({}))

import { onProductSearch } from './index'

describe('onProductSearch', () => {
	it('將一般篩選條件轉換為 CrudFilters', () => {
		const values = {
			s: '搜尋關鍵字',
			status: 'publish',
		}
		const result = onProductSearch(values)
		expect(result).toEqual([
			{ field: 's', operator: 'eq', value: '搜尋關鍵字' },
			{ field: 'status', operator: 'eq', value: 'publish' },
		])
	})

	it('date_created 欄位的 operator 調整為 between', () => {
		const mockDateStart = { format: () => '2024-01-01' }
		const mockDateEnd = { format: () => '2024-12-31' }

		const values = {
			date_created: [mockDateStart, mockDateEnd] as any,
		}
		const result = onProductSearch(values)

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'date_created',
					operator: 'between',
				}),
			]),
		)
	})

	it('空物件回傳空陣列', () => {
		const result = onProductSearch({})
		expect(result).toEqual([])
	})
})
