import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ConfigProvider } from 'antd'
import { useColor } from './useColor'

describe('useColor', () => {
	it('回傳 Ant Design 主題 token', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ConfigProvider>{children}</ConfigProvider>
		)
		const { result } = renderHook(() => useColor(), { wrapper })

		expect(result.current.colorPrimary).toBeDefined()
		expect(result.current.colorBgContainer).toBeDefined()
		expect(result.current.borderRadius).toBeDefined()
	})
})
