import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

// Mock the date util functions from @/main/utils
vi.mock('@/main/utils', () => ({
	formatRangePickerValue: (value: any) => {
		if (Array.isArray(value) && value.length === 2) {
			return value.map((v: any) =>
				typeof v?.format === 'function' ? v.format('YYYY-MM-DD') : v,
			)
		}
		return []
	},
	formatDatePickerValue: (value: any) => {
		if (typeof value?.format === 'function') {
			return value.format('YYYY-MM-DD')
		}
		return ''
	},
}))

// Mock @/wp/utils to provide PRODUCT_DATE_FIELDS
vi.mock('@/wp/utils', () => ({
	PRODUCT_DATE_FIELDS: [
		{ label: '商品發佈日期', value: 'date_created' },
		{ label: '商品修改日期', value: 'date_modified' },
		{ label: '特價開始日期', value: 'date_on_sale_from' },
		{ label: '特價結束日期', value: 'date_on_sale_to' },
	],
}))

import { mapOperator } from './mapOperator'

describe('mapOperator - normalMapOperator', () => {
	it('eq operator 回傳原始 field 和 value', () => {
		const result = mapOperator({
			field: 'name',
			operator: 'eq',
			value: 'test',
		} as any)
		expect(result).toEqual({
			formattedField: 'name',
			formattedValue: 'test',
		})
	})

	it('ne operator 在 value 前加上驚嘆號', () => {
		const result = mapOperator({
			field: 'status',
			operator: 'ne',
			value: 'draft',
		} as any)
		expect(result).toEqual({
			formattedField: 'status',
			formattedValue: '!draft',
		})
	})

	it('in operator 回傳原始 field 和 value（由 query-string 處理陣列）', () => {
		const result = mapOperator({
			field: 'ids',
			operator: 'in',
			value: [1, 2, 3],
		} as any)
		expect(result).toEqual({
			formattedField: 'ids',
			formattedValue: [1, 2, 3],
		})
	})

	it('未知 operator 回傳原始 field 和 value（走 default case）', () => {
		const result = mapOperator({
			field: 'custom',
			operator: 'contains',
			value: 'abc',
		} as any)
		expect(result).toEqual({
			formattedField: 'custom',
			formattedValue: 'abc',
		})
	})
})

describe('mapOperator - dateMapOperator', () => {
	const mockDayjs = (dateStr: string) => ({
		format: (fmt: string) => dateStr,
	})

	it('between operator 格式化日期範圍並以 ... 連接', () => {
		const result = mapOperator({
			field: 'date_created',
			operator: 'between',
			value: [mockDayjs('2024-01-01'), mockDayjs('2024-12-31')],
		} as any)
		expect(result).toEqual({
			formattedField: 'date_created',
			formattedValue: '2024-01-01...2024-12-31',
		})
	})

	it('gt operator 在格式化日期前加上 >', () => {
		const result = mapOperator({
			field: 'date_modified',
			operator: 'gt',
			value: mockDayjs('2024-06-01'),
		} as any)
		expect(result).toEqual({
			formattedField: 'date_modified',
			formattedValue: '>2024-06-01',
		})
	})

	it('gte operator 在格式化日期前加上 >=', () => {
		const result = mapOperator({
			field: 'date_on_sale_from',
			operator: 'gte',
			value: mockDayjs('2024-06-01'),
		} as any)
		expect(result).toEqual({
			formattedField: 'date_on_sale_from',
			formattedValue: '>=2024-06-01',
		})
	})

	it('lt operator 在格式化日期前加上 <', () => {
		const result = mapOperator({
			field: 'date_on_sale_to',
			operator: 'lt',
			value: mockDayjs('2024-12-31'),
		} as any)
		expect(result).toEqual({
			formattedField: 'date_on_sale_to',
			formattedValue: '<2024-12-31',
		})
	})

	it('lte operator 在格式化日期前加上 <=', () => {
		const result = mapOperator({
			field: 'date_created',
			operator: 'lte',
			value: mockDayjs('2024-12-31'),
		} as any)
		expect(result).toEqual({
			formattedField: 'date_created',
			formattedValue: '<=2024-12-31',
		})
	})

	it('eq operator 對日期欄位格式化日期值', () => {
		const result = mapOperator({
			field: 'date_created',
			operator: 'eq',
			value: mockDayjs('2024-06-15'),
		} as any)
		expect(result).toEqual({
			formattedField: 'date_created',
			formattedValue: '2024-06-15',
		})
	})
})
