import { describe, it, expect } from 'vitest'
import { stringToBool, boolToString } from './index'

describe('stringToBool', () => {
	it('WordPress 風格的 truthy 字串轉為 true', () => {
		expect(stringToBool('yes')).toBe(true)
		expect(stringToBool('1')).toBe(true)
		expect(stringToBool(1)).toBe(true)
		expect(stringToBool('true')).toBe(true)
		expect(stringToBool('on')).toBe(true)
		expect(stringToBool(true)).toBe(true)
	})

	it('其他值一律回傳 false', () => {
		expect(stringToBool('no')).toBe(false)
		expect(stringToBool('0')).toBe(false)
		expect(stringToBool(0)).toBe(false)
		expect(stringToBool('false')).toBe(false)
		expect(stringToBool('off')).toBe(false)
		expect(stringToBool(false)).toBe(false)
		expect(stringToBool('')).toBe(false)
		expect(stringToBool('random')).toBe(false)
	})
})

describe('boolToString', () => {
	it('布林值轉為 WordPress 風格字串 yes/no', () => {
		expect(boolToString(true)).toBe('yes')
		expect(boolToString(false)).toBe('no')
	})

	it('字串值也能正確轉換', () => {
		expect(boolToString('yes')).toBe('yes')
		expect(boolToString('no')).toBe('no')
		expect(boolToString('true')).toBe('yes')
		expect(boolToString('false')).toBe('no')
	})
})
