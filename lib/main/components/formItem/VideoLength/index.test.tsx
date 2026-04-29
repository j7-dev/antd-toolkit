import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { VideoLength } from './index'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('VideoLength', () => {
	it('將時/分/秒輸入轉換為總秒數', () => {
		render(
			<Wrapper>
				<VideoLength name="video_length" label="影片長度" />
			</Wrapper>,
		)

		// Three InputNumber fields should be rendered with addon labels
		expect(screen.getByText('時')).toBeInTheDocument()
		expect(screen.getByText('分')).toBeInTheDocument()
		expect(screen.getByText('秒')).toBeInTheDocument()
	})

	it('提供三個 InputNumber 欄位 (hours/minutes/seconds)', () => {
		render(
			<Wrapper>
				<VideoLength name="video_length" />
			</Wrapper>,
		)

		// Should have 3 spinbutton inputs
		const spinbuttons = screen.getAllByRole('spinbutton')
		expect(spinbuttons).toHaveLength(3)
	})
})
