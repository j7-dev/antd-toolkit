import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useRowSelection } from './useRowSelection'

describe('useRowSelection', () => {
	it('提供 selectedRowKeys、setSelectedRowKeys 和 rowSelection', () => {
		const { result } = renderHook(() => useRowSelection())

		expect(result.current.selectedRowKeys).toEqual([])
		expect(typeof result.current.setSelectedRowKeys).toBe('function')
		expect(result.current.rowSelection).toBeDefined()
	})

	it('rowSelection 包含 ALL/INVERT/NONE 選取預設', () => {
		const { result } = renderHook(() => useRowSelection())

		expect(result.current.rowSelection!.selections).toHaveLength(3)
	})

	it('setSelectedRowKeys 可更新選取狀態', () => {
		const { result } = renderHook(() => useRowSelection())

		act(() => {
			result.current.setSelectedRowKeys(['1', '2', '3'])
		})

		expect(result.current.selectedRowKeys).toEqual(['1', '2', '3'])
	})

	it('支援合併自訂 rowSelectionProps', () => {
		const { result } = renderHook(() =>
			useRowSelection({ fixed: true }),
		)

		expect(result.current.rowSelection!.fixed).toBe(true)
	})
})
