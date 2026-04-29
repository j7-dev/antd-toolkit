import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { VideoInput } from './index'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('VideoInput', () => {
	it('提供 6 種影片來源選項的視覺化選擇格', () => {
		const { container } = render(
			<Wrapper>
				<VideoInput formItemProps={{ name: 'video' }} />
			</Wrapper>,
		)

		// Should render 6 clickable option cards in the grid
		const grid = container.querySelector('.at-grid')
		expect(grid).toBeInTheDocument()
		// Each option is a div with cursor-pointer class
		const options = grid?.querySelectorAll('.at-cursor-pointer')
		expect(options?.length).toBe(6)
	})
})
