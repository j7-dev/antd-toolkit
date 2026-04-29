import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useConstantSelect } from './useConstantSelect'

const mockConstants = [
	{ label: '選項一', value: 'a' },
	{ label: '選項二', value: 'b' },
	{ label: '選項三', value: 'c' },
]

describe('useConstantSelect', () => {
	it('提供受控的 Select 元件與狀態', () => {
		const { result } = renderHook(() =>
			useConstantSelect({ constants: mockConstants }),
		)

		expect(result.current.value).toBe('')
		expect(typeof result.current.setValue).toBe('function')
		expect(result.current.Select).toBeDefined()
		expect(result.current.selectProps).toBeDefined()
	})

	it('從 constants 陣列產生 options', () => {
		const { result } = renderHook(() =>
			useConstantSelect({ constants: mockConstants }),
		)

		expect(result.current.selectProps.options).toEqual([
			{ label: '選項一', value: 'a' },
			{ label: '選項二', value: 'b' },
			{ label: '選項三', value: 'c' },
		])
	})

	it('透過 setValue 可更新選取值', () => {
		const { result } = renderHook(() =>
			useConstantSelect({ constants: mockConstants }),
		)

		act(() => {
			result.current.setValue('b')
		})

		expect(result.current.value).toBe('b')
	})

	it('Select 為 memoized 元件', () => {
		const { result } = renderHook(() =>
			useConstantSelect({ constants: mockConstants }),
		)

		// React.memo returns an object with $$typeof and compare
		expect(result.current.Select.$$typeof).toBeDefined()
	})
})
