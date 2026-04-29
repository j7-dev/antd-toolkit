import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('@refinedev/antd', () => ({
	useSelect: vi.fn(() => ({
		selectProps: {
			options: [
				{ label: 'Item A', value: '1' },
				{ label: 'Item B', value: '2' },
			],
			loading: false,
		},
	})),
}))

vi.mock('@/main', () => ({
	defaultSelectProps: {
		showSearch: true,
		mode: 'multiple',
	},
}))

import { useItemSelect } from './useItemSelect'

describe('useItemSelect', () => {
	it('回傳 selectProps, itemIds 和 setItemIds', () => {
		const { result } = renderHook(() =>
			useItemSelect({
				useSelectProps: { resource: 'products' },
			}),
		)

		expect(result.current.selectProps).toBeDefined()
		expect(result.current.itemIds).toEqual([])
		expect(typeof result.current.setItemIds).toBe('function')
	})

	it('合併 defaultSelectProps 與 refine selectProps', () => {
		const { result } = renderHook(() =>
			useItemSelect({
				useSelectProps: { resource: 'products' },
			}),
		)

		expect(result.current.selectProps.showSearch).toBe(true)
		expect(result.current.selectProps.options).toBeDefined()
	})

	it('setItemIds 可更新已選擇的項目 ID', () => {
		const { result } = renderHook(() =>
			useItemSelect({
				useSelectProps: { resource: 'products' },
			}),
		)

		act(() => {
			result.current.setItemIds(['1', '2'])
		})

		expect(result.current.itemIds).toEqual(['1', '2'])
	})

	it('selectProps.value 反映當前 itemIds', () => {
		const { result } = renderHook(() =>
			useItemSelect({
				useSelectProps: { resource: 'products' },
			}),
		)

		act(() => {
			result.current.setItemIds(['3'])
		})

		expect(result.current.selectProps.value).toEqual(['3'])
	})
})
