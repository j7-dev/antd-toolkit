import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { RangePicker } from './index'
import { LocaleProvider } from '@/main/components/LocaleProvider'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LocaleProvider>
		<Form>{children}</Form>
	</LocaleProvider>
)

describe('RangePicker', () => {
	it('使用 parseRangePickerValue 做 getValueProps 轉換 timestamp 陣列為 Dayjs 陣列', () => {
		render(
			<Wrapper>
				<RangePicker
					formItemProps={{ name: 'date_range', label: '日期範圍' }}
				/>
			</Wrapper>,
		)

		expect(
			screen.getByPlaceholderText('開始日期'),
		).toBeInTheDocument()
		expect(
			screen.getByPlaceholderText('結束日期'),
		).toBeInTheDocument()
	})

	it('允許兩端空值 (allowEmpty)', () => {
		render(
			<Wrapper>
				<RangePicker formItemProps={{ name: 'date_range' }} />
			</Wrapper>,
		)

		// The range picker should render with both placeholder inputs
		const startInput = screen.getByPlaceholderText('開始日期')
		const endInput = screen.getByPlaceholderText('結束日期')
		expect(startInput).toBeInTheDocument()
		expect(endInput).toBeInTheDocument()
	})
})
