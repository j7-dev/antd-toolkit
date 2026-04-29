import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { Limit } from './index'
import { LocaleProvider } from '@/main/components/LocaleProvider'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LocaleProvider>
		<Form>{children}</Form>
	</LocaleProvider>
)

describe('Limit', () => {
	it('提供 4 種時間限制類型選項 (unlimited/fixed/assigned/follow_subscription)', () => {
		render(
			<Wrapper>
				<Limit />
			</Wrapper>,
		)

		expect(screen.getByText('無期限')).toBeInTheDocument()
		expect(screen.getByText('固定天數')).toBeInTheDocument()
		expect(screen.getByText('指定時間')).toBeInTheDocument()
		expect(screen.getByText('跟隨訂閱')).toBeInTheDocument()
	})

	it('預設類型為 unlimited，隱藏 value/unit 欄位', () => {
		render(
			<Wrapper>
				<Limit />
			</Wrapper>,
		)

		// label should be shown
		expect(screen.getByText('觀看期限')).toBeInTheDocument()
		// InputNumber and Select for fixed type should not be visible
		expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
	})
})
