import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SecondToStr } from './index'

describe('SecondToStr', () => {
	it('將秒數轉換為「HH 時 MM 分 SS 秒」格式', () => {
		// 1 hour, 2 minutes, 3 seconds = 3723 seconds
		render(<SecondToStr second={3723} />)
		expect(
			screen.getByText('01 時 02 分 03 秒'),
		).toBeInTheDocument()
	})

	it('second 為 falsy 時顯示空值訊息', () => {
		render(<SecondToStr second={0} />)
		expect(
			screen.getByText('-- 時 -- 分 -- 秒'),
		).toBeInTheDocument()
	})

	it('時數超過 99 時不補零', () => {
		// 100 hours = 360000 seconds
		render(<SecondToStr second={360000} />)
		expect(
			screen.getByText('100 時 00 分 00 秒'),
		).toBeInTheDocument()
	})
})
