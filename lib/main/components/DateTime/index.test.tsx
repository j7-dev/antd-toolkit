import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { DateTime } from './index'

describe('DateTime', () => {
	// Use a fixed timestamp and derive expected values via dayjs
	const timestamp = 1705290645000
	const expectedDate = dayjs(timestamp).format('YYYY-MM-DD')
	const expectedTime = dayjs(timestamp).format('HH:mm:ss')

	it('顯示日期與時間（13 位毫秒時間戳）', () => {
		const { container } = render(<DateTime date={timestamp} />)
		const paragraphs = container.querySelectorAll('p')
		expect(paragraphs[0].textContent).toContain(expectedDate)
		expect(paragraphs[1].textContent).toContain(expectedTime)
	})

	it('非 13 位時間戳顯示錯誤訊息', () => {
		render(<DateTime date={1234567890} />)
		expect(screen.getByText('OOPS! 出錯拉')).toBeInTheDocument()
		expect(
			screen.getByText('date 請輸入 毫秒(13位) 數字'),
		).toBeInTheDocument()
	})

	it('hideTime=true 時只顯示日期文字', () => {
		const { container } = render(<DateTime date={timestamp} hideTime />)
		const paragraphs = container.querySelectorAll('p')
		expect(paragraphs).toHaveLength(1)
		expect(paragraphs[0].textContent).toContain(expectedDate)
	})

	it('支援自訂日期與時間格式', () => {
		const customDateFormat = 'DD/MM/YYYY'
		const customTimeFormat = 'HH:mm'
		const expectedCustomDate = dayjs(timestamp).format(customDateFormat)
		const expectedCustomTime = dayjs(timestamp).format(customTimeFormat)

		const { container } = render(
			<DateTime
				date={timestamp}
				dateProps={{ format: customDateFormat }}
				timeProps={{ format: customTimeFormat }}
			/>,
		)
		const paragraphs = container.querySelectorAll('p')
		expect(paragraphs[0].textContent).toContain(expectedCustomDate)
		expect(paragraphs[1].textContent).toContain(expectedCustomTime)
	})
})
