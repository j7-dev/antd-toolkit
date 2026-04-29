import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LocaleProvider, useLocale } from './index'
import { zh_TW } from '@/main/locales/zh_TW'
import { en_US } from '@/main/locales/en_US'

describe('LocaleProvider', () => {
	it('透過 React Context 提供多語系字串', () => {
		const TestComponent = () => {
			const t = useLocale('ActionButton')
			return <span>{t.edit}</span>
		}

		render(
			<LocaleProvider>
				<TestComponent />
			</LocaleProvider>,
		)

		// 預設 locale 為 zh_TW
		expect(screen.getByText('編輯')).toBeInTheDocument()
	})
})

describe('useLocale', () => {
	it('預設回傳繁體中文語系', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>{children}</LocaleProvider>
		)
		const { result } = renderHook(() => useLocale('CopyText'), { wrapper })
		expect(result.current.success).toBe(zh_TW.CopyText.success)
	})

	it('切換為英文語系時回傳英文字串', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider locale={en_US}>{children}</LocaleProvider>
		)
		const { result } = renderHook(() => useLocale('CopyText'), { wrapper })
		expect(result.current.success).toBe('Copied successfully')
	})

	it('各元件有獨立的 namespace', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<LocaleProvider>{children}</LocaleProvider>
		)
		const { result } = renderHook(() => useLocale('Limit'), { wrapper })
		expect(result.current.label).toBe('觀看期限')
		expect(result.current.unlimited).toBe('無期限')
	})
})
