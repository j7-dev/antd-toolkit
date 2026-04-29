import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

import { generateSort } from './generateSort'

describe('generateSort', () => {
	it('將 sorters 陣列轉換為 WordPress orderby query string', () => {
		const sorters = [
			{ field: 'date', order: 'desc' as const },
			{ field: 'menu_order', order: 'asc' as const },
		]
		const result = generateSort(sorters)
		expect(result).toBe('orderby[date]=desc&orderby[menu_order]=asc')
	})

	it('單一 sorter 產出單一 orderby 參數', () => {
		const sorters = [{ field: 'title', order: 'asc' as const }]
		const result = generateSort(sorters)
		expect(result).toBe('orderby[title]=asc')
	})

	it('sorters 為 undefined 時回傳空字串', () => {
		const result = generateSort(undefined)
		expect(result).toBe('')
	})

	it('sorters 不是陣列時回傳空字串', () => {
		const result = generateSort('invalid' as any)
		expect(result).toBe('')
	})

	it('空陣列回傳空字串', () => {
		const result = generateSort([])
		expect(result).toBe('')
	})
})
