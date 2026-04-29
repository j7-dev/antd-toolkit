import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { BooleanSegmented } from './index'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('BooleanSegmented', () => {
	it('渲染 3 選項 segmented control (ALL/TRUE/FALSE)', () => {
		render(
			<Wrapper>
				<BooleanSegmented
					formItemProps={{ name: 'filter' }}
				/>
			</Wrapper>,
		)

		expect(screen.getByText('ALL')).toBeInTheDocument()
		expect(screen.getByText('TRUE')).toBeInTheDocument()
		expect(screen.getByText('FALSE')).toBeInTheDocument()
	})

	it('type="text" 時只顯示文字無圖示', () => {
		render(
			<Wrapper>
				<BooleanSegmented
					formItemProps={{ name: 'filter' }}
					type="text"
				/>
			</Wrapper>,
		)

		expect(screen.getByText('ALL')).toBeInTheDocument()
		expect(screen.getByText('TRUE')).toBeInTheDocument()
		expect(screen.getByText('FALSE')).toBeInTheDocument()
	})

	it('使用 block 佈局', () => {
		const { container } = render(
			<Wrapper>
				<BooleanSegmented
					formItemProps={{ name: 'filter' }}
				/>
			</Wrapper>,
		)

		const segmented = container.querySelector('.ant-segmented-block')
		expect(segmented).toBeInTheDocument()
	})
})
