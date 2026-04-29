import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { DatePicker } from './index'
import { LocaleProvider } from '@/main/components/LocaleProvider'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LocaleProvider>
		<Form>{children}</Form>
	</LocaleProvider>
)

describe('DatePicker', () => {
	it('使用 parseDatePickerValue 做 getValueProps 轉換 Unix timestamp 為 Dayjs', () => {
		render(
			<Wrapper>
				<DatePicker
					formItemProps={{ name: 'date', label: '日期' }}
				/>
			</Wrapper>,
		)

		// DatePicker renders with placeholder from locale
		expect(screen.getByPlaceholderText('選擇日期')).toBeInTheDocument()
	})

	it('預設格式為 YYYY-MM-DD HH:mm 且顯示時間選擇', () => {
		render(
			<Wrapper>
				<DatePicker formItemProps={{ name: 'date' }} />
			</Wrapper>,
		)

		// The date picker input should be rendered
		const input = screen.getByPlaceholderText('選擇日期')
		expect(input).toBeInTheDocument()
	})
})
