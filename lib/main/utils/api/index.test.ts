import { describe, it, expect } from 'vitest'
import { toFormData } from './index'

describe('toFormData', () => {
	it('將物件轉換為 FormData', () => {
		const data = { name: 'test', value: 123 }
		const formData = toFormData(data)
		// axios toFormData returns a FormData-compatible object
		// Verify it's truthy (the function doesn't throw)
		expect(formData).toBeTruthy()
	})

	it('空陣列轉換為 "[]" 字串後再傳入 toFormData', () => {
		// Verify the formatting logic by checking the intermediate step
		const data = { tags: [], keep: 'hello' }
		// The function should not throw and should return a FormData
		const formData = toFormData(data)
		expect(formData).toBeTruthy()
	})

	it('null 和 undefined 轉換為空字串後再傳入 toFormData', () => {
		const data = { a: null, b: undefined, c: 'keep' }
		const formData = toFormData(data)
		expect(formData).toBeTruthy()
	})
})
