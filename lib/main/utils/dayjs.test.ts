import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import {
	parseDatePickerValue,
	parseRangePickerValue,
	formatDatePickerValue,
	formatRangePickerValue,
} from './dayjs'

describe('parseDatePickerValue', () => {
	it('10 位數 Unix timestamp 轉換為 Dayjs', () => {
		const timestamp = 1700000000 // 10-digit
		const result = parseDatePickerValue(timestamp)
		expect(dayjs.isDayjs(result)).toBe(true)
		expect((result as dayjs.Dayjs).unix()).toBe(timestamp)
	})

	it('13 位數毫秒 timestamp 轉換為 Dayjs', () => {
		const timestamp = 1700000000000 // 13-digit
		const result = parseDatePickerValue(timestamp)
		expect(dayjs.isDayjs(result)).toBe(true)
		expect((result as dayjs.Dayjs).valueOf()).toBe(timestamp)
	})

	it('Dayjs 物件直接回傳', () => {
		const d = dayjs('2024-01-01')
		const result = parseDatePickerValue(d)
		expect(result).toBe(d)
	})
})

describe('parseRangePickerValue', () => {
	it('timestamp 陣列轉換為 Dayjs 陣列', () => {
		const values = [1700000000, 1700100000] // 10-digit timestamps
		const result = parseRangePickerValue(values)
		expect(dayjs.isDayjs(result[0])).toBe(true)
		expect(dayjs.isDayjs(result[1])).toBe(true)
	})

	it('非陣列輸入回傳 [undefined, undefined]', () => {
		const result = parseRangePickerValue('invalid')
		expect(result).toEqual([undefined, undefined])
	})

	it('長度非 2 的陣列回傳 [undefined, undefined]', () => {
		const result = parseRangePickerValue([1700000000])
		expect(result).toEqual([undefined, undefined])
	})
})

describe('formatDatePickerValue', () => {
	it('Dayjs 值格式化為日期字串', () => {
		const d = dayjs('2024-06-15')
		expect(formatDatePickerValue(d)).toBe('2024-06-15')
	})

	it('非 Dayjs 值回傳 fallback', () => {
		expect(formatDatePickerValue('not-dayjs', 'YYYY-MM-DD', 'N/A')).toBe(
			'N/A',
		)
	})

	it('支援自訂格式', () => {
		const d = dayjs('2024-06-15 14:30')
		expect(formatDatePickerValue(d, 'YYYY/MM/DD')).toBe('2024/06/15')
	})
})

describe('formatRangePickerValue', () => {
	it('Dayjs 陣列格式化為日期字串陣列', () => {
		const values = [dayjs('2024-01-01'), dayjs('2024-12-31')]
		const result = formatRangePickerValue(values)
		expect(result).toEqual(['2024-01-01', '2024-12-31'])
	})

	it('非陣列值回傳 fallback', () => {
		expect(formatRangePickerValue('invalid')).toEqual([])
	})

	it('長度非 2 回傳 fallback', () => {
		expect(formatRangePickerValue([dayjs()])).toEqual([])
	})
})
