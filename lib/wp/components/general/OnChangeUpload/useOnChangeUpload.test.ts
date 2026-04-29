import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('@refinedev/core', () => ({
	useApiUrl: vi.fn(() => 'http://test.local/wp-json'),
}))

vi.mock('@/main', () => ({
	useEnv: () => ({
		NONCE: 'test-nonce-123',
	}),
}))

import { useOnChangeUpload } from './useOnChangeUpload'

describe('useOnChangeUpload', () => {
	it('回傳的 uploadProps 包含正確的 action URL', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.uploadProps.action).toBe(
			'http://test.local/wp-json/upload',
		)
	})

	it('uploadProps 包含 X-WP-Nonce header', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.uploadProps.headers).toEqual(
			expect.objectContaining({ 'X-WP-Nonce': 'test-nonce-123' }),
		)
	})

	it('初始 fileList 為空陣列', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.fileList).toEqual([])
	})

	it('初始 isUploading 為 false', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.isUploading).toBe(false)
	})

	it('初始 attachmentId 為 undefined', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.attachmentId).toBeUndefined()
	})

	it('uploadProps 設定 maxCount 為 1', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.uploadProps.maxCount).toBe(1)
	})

	it('uploadProps 設定 withCredentials 為 true', () => {
		const { result } = renderHook(() => useOnChangeUpload())
		expect(result.current.uploadProps.withCredentials).toBe(true)
	})
})
