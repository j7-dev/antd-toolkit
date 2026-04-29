import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Countdown } from './index'

vi.mock('./styles.scss', () => ({}))

describe('Countdown', () => {
	it('非 13 位時間戳顯示錯誤訊息', () => {
		render(<Countdown date={1234567890} />)
		expect(screen.getByText('OOPS! 出錯拉')).toBeInTheDocument()
		expect(
			screen.getByText('date 請輸入 毫秒(13位) 數字'),
		).toBeInTheDocument()
	})

	it('13 位時間戳渲染倒數計時器並顯示時間標籤', () => {
		const futureDate = Date.now() + 100000000
		render(<Countdown date={futureDate} />)
		expect(screen.getByText('Days')).toBeInTheDocument()
		expect(screen.getByText('Hours')).toBeInTheDocument()
		expect(screen.getByText('Minutes')).toBeInTheDocument()
		expect(screen.getByText('Seconds')).toBeInTheDocument()
	})

	it('支援自訂 title', () => {
		const futureDate = Date.now() + 100000000
		render(<Countdown date={futureDate} title="距離活動開始" />)
		expect(screen.getByText('距離活動開始')).toBeInTheDocument()
	})
})
