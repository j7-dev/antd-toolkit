import { describe, it, expect, vi } from 'vitest'
import dayjs from 'dayjs'

// Mock the constants barrel export to avoid pulling in the full component tree
// which has deep transitive deps (@blocknote/mantine -> @mantine/core)
vi.mock('./constants', () => ({}))

import {
	getColumnFilterProps,
	getDefaultPaginationProps,
	formatDateRangeData,
} from './index'

describe('getColumnFilterProps', () => {
	it('從 TConstant 資料來源產生 filters 和 onFilter', () => {
		const constants = [
			{ label: '啟用', value: 'active' },
			{ label: '停用', value: 'inactive' },
		] as const

		const result = getColumnFilterProps<{ status: string }>({
			dataSource: constants,
			dataIndex: 'status',
			dataFrom: 'local',
		})

		expect(result.filters).toEqual([
			{ text: '啟用', value: 'active' },
			{ text: '停用', value: 'inactive' },
		])
	})

	it('onFilter 支援字串欄位比對', () => {
		const constants = [{ label: 'Test', value: 'hello' }] as const
		const { onFilter } = getColumnFilterProps<{
			name: string
		}>({
			dataSource: constants,
			dataIndex: 'name',
			dataFrom: 'local',
		})

		expect(onFilter('hello', { name: 'hello world' })).toBe(true)
		expect(onFilter('xyz', { name: 'hello world' })).toBe(false)
	})
})

describe('getDefaultPaginationProps', () => {
	it('回傳標準分頁設定，位置為 bottomCenter', () => {
		const result = getDefaultPaginationProps({ label: '商品' })
		expect(result.position).toEqual(['bottomCenter'])
		expect(result.showSizeChanger).toBe(true)
		expect(result.showQuickJumper).toBe(true)
	})

	it('showTotal 顯示中文分頁資訊', () => {
		const result = getDefaultPaginationProps({ label: '課程' })
		const totalText = result.showTotal!(100, [1, 10])
		expect(totalText).toContain('課程')
		expect(totalText).toContain('100')
	})
})

describe('formatDateRangeData', () => {
	it('將日期範圍欄位拆分為兩個 timestamp 欄位', () => {
		const values = {
			sale_date_range: [dayjs('2024-01-01'), dayjs('2024-12-31')],
			other: 'keep',
		}
		const result = formatDateRangeData(values, 'sale_date_range', [
			'date_from',
			'date_to',
		])

		expect(result.date_from).toBe(dayjs('2024-01-01').unix())
		expect(result.date_to).toBe(dayjs('2024-12-31').unix())
		expect(result.sale_date_range).toBeUndefined()
		expect(result.other).toBe('keep')
	})

	it('null 日期值保持原樣', () => {
		const values = {
			sale_date_range: [null, null],
		}
		const result = formatDateRangeData(values, 'sale_date_range', [
			'date_from',
			'date_to',
		])

		expect(result.date_from).toBeNull()
		expect(result.date_to).toBeNull()
	})
})
