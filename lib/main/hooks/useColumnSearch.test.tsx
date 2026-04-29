import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useColumnSearch } from './useColumnSearch'

type TestData = { name: string; email: string }

describe('useColumnSearch', () => {
	it('提供 getColumnSearchProps 函式，回傳 ColumnType 設定', () => {
		const { result } = renderHook(() =>
			useColumnSearch<TestData, 'name'>(),
		)

		const columnProps = result.current.getColumnSearchProps('name')

		expect(columnProps.filterDropdown).toBeDefined()
		expect(columnProps.filterIcon).toBeDefined()
		expect(columnProps.onFilter).toBeDefined()
		expect(columnProps.render).toBeDefined()
	})

	it('onFilter 執行大小寫不敏感的 string.includes 比對', () => {
		const { result } = renderHook(() =>
			useColumnSearch<TestData, 'name'>(),
		)

		const { onFilter } = result.current.getColumnSearchProps('name')

		expect(onFilter!('john', { name: 'John Doe', email: '' }, {} as any)).toBe(
			true,
		)
		expect(
			onFilter!('JOHN', { name: 'john doe', email: '' }, {} as any),
		).toBe(true)
		expect(onFilter!('xyz', { name: 'John Doe', email: '' }, {} as any)).toBe(
			false,
		)
	})
})
