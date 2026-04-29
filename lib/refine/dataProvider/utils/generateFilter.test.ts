import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

// Mock mapOperator with a simple implementation
vi.mock('./mapOperator', () => ({
	mapOperator: (filter: any) => ({
		formattedField: filter.field,
		formattedValue: filter.value,
	}),
}))

import { generateFilter } from './generateFilter'

describe('generateFilter', () => {
	it('將 CrudFilters 陣列轉換為 query 物件', () => {
		const filters = [
			{ field: 'name', operator: 'eq', value: 'test' },
			{ field: 'status', operator: 'eq', value: 'publish' },
		]
		const result = generateFilter(filters as any)
		expect(result).toEqual({
			name: 'test',
			status: 'publish',
		})
	})

	it('filters 為 undefined 時回傳空物件', () => {
		const result = generateFilter(undefined)
		expect(result).toEqual({})
	})

	it('空陣列回傳空物件', () => {
		const result = generateFilter([])
		expect(result).toEqual({})
	})

	it('不支援 or operator，拋出 Error', () => {
		const filters = [
			{
				operator: 'or',
				value: [
					{ field: 'name', operator: 'eq', value: 'a' },
				],
			},
		]
		expect(() => generateFilter(filters as any)).toThrow(
			'is not supported',
		)
	})

	it('不支援 and operator，拋出 Error', () => {
		const filters = [
			{
				operator: 'and',
				value: [
					{ field: 'name', operator: 'eq', value: 'a' },
				],
			},
		]
		expect(() => generateFilter(filters as any)).toThrow(
			'is not supported',
		)
	})
})
