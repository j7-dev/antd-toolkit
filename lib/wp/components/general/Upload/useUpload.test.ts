import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUpload } from './useUpload'

describe('useUpload', () => {
	it('回傳的 uploadProps 包含正確的 action URL', () => {
		const { result } = renderHook(() =>
			useUpload({ apiUrl: 'http://test.local/upload' }),
		)
		expect(result.current.uploadProps.action).toBe(
			'http://test.local/upload',
		)
	})

	it('預設 accept 為 image/*', () => {
		const { result } = renderHook(() =>
			useUpload({ apiUrl: 'http://test.local/upload' }),
		)
		expect(result.current.uploadProps.accept).toBe('image/*')
	})

	it('支援自訂 accept 類型', () => {
		const { result } = renderHook(() =>
			useUpload({
				apiUrl: 'http://test.local/upload',
				accept: '.pdf,.docx',
			}),
		)
		expect(result.current.uploadProps.accept).toBe('.pdf,.docx')
	})

	it('預設 multiple 為 false', () => {
		const { result } = renderHook(() =>
			useUpload({ apiUrl: 'http://test.local/upload' }),
		)
		expect(result.current.uploadProps.multiple).toBe(false)
	})

	it('預設 method 為 post', () => {
		const { result } = renderHook(() =>
			useUpload({ apiUrl: 'http://test.local/upload' }),
		)
		expect(result.current.uploadProps.method).toBe('post')
	})
})
