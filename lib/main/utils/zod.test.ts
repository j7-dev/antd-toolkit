import { describe, it, expect, vi } from 'vitest'
import { z } from 'zod/v4'
import { safeParse } from './zod'

describe('safeParse', () => {
	it('驗證成功時不印出警告', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const schema = z.object({ name: z.string() })
		safeParse(schema, { name: 'hello' })
		expect(warnSpy).not.toHaveBeenCalled()
		warnSpy.mockRestore()
	})

	it('驗證失敗時透過 console.warn 印出 issues', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const schema = z.object({ name: z.string() })
		safeParse(schema, { name: 123 })
		expect(warnSpy).toHaveBeenCalled()
		warnSpy.mockRestore()
	})
})
