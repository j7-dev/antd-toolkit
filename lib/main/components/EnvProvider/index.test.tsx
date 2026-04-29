import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EnvProvider, TEnv } from './index'
import { useEnv } from './hooks'
import { LocaleProvider } from '@/main/components/LocaleProvider'

const mockEnv: TEnv = {
	SITE_URL: 'https://example.com',
	AJAX_URL: 'https://example.com/wp-admin/admin-ajax.php',
	API_URL: 'https://example.com/wp-json',
	CURRENT_USER_ID: 1,
	CURRENT_POST_ID: '42',
	PERMALINK: 'https://example.com/page',
	APP_NAME: 'TestApp',
	KEBAB: 'test-app',
	SNAKE: 'test_app',
	NONCE: 'abc123',
}

describe('EnvProvider', () => {
	it('透過 React Context 提供環境變數', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>
				<EnvProvider env={mockEnv}>{children}</EnvProvider>
			</LocaleProvider>
		)
		const { result } = renderHook(() => useEnv(), { wrapper })

		expect(result.current.SITE_URL).toBe('https://example.com')
		expect(result.current.NONCE).toBe('abc123')
		expect(result.current.CURRENT_USER_ID).toBe(1)
	})

	it('支援巢狀 EnvProvider 合併 context', () => {
		const outerEnv: TEnv = { ...mockEnv, APP_NAME: 'Outer' }
		const innerEnv: TEnv = { ...mockEnv, APP_NAME: 'Inner' }

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>
				<EnvProvider env={outerEnv}>
					<EnvProvider env={innerEnv}>{children}</EnvProvider>
				</EnvProvider>
			</LocaleProvider>
		)
		const { result } = renderHook(() => useEnv(), { wrapper })

		expect(result.current.APP_NAME).toBe('Inner')
	})
})

describe('useEnv', () => {
	it('回傳包含 AXIOS_INSTANCE 的環境變數', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>
				<EnvProvider env={mockEnv}>{children}</EnvProvider>
			</LocaleProvider>
		)
		const { result } = renderHook(() => useEnv(), { wrapper })

		expect(result.current.AXIOS_INSTANCE).toBeDefined()
		expect(typeof result.current.AXIOS_INSTANCE.get).toBe('function')
		expect(typeof result.current.AXIOS_INSTANCE.post).toBe('function')
	})

	it('Axios 設定 timeout 為 30000ms', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>
				<EnvProvider env={mockEnv}>{children}</EnvProvider>
			</LocaleProvider>
		)
		const { result } = renderHook(() => useEnv(), { wrapper })

		const axiosDefaults = result.current.AXIOS_INSTANCE.defaults
		expect(axiosDefaults.timeout).toBe(30000)
	})

	it('有 NONCE 時設定 X-WP-Nonce header', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>
				<EnvProvider env={mockEnv}>{children}</EnvProvider>
			</LocaleProvider>
		)
		const { result } = renderHook(() => useEnv(), { wrapper })

		const headers = result.current.AXIOS_INSTANCE.defaults.headers
		expect(headers['X-WP-Nonce']).toBe('abc123')
	})
})
