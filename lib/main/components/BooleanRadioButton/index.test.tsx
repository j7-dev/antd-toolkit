import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { BooleanRadioButton } from './index'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('BooleanRadioButton', () => {
	it('渲染 3 選項 radio button (ALL/true/false)', () => {
		render(
			<Wrapper>
				<BooleanRadioButton
					formItemProps={{ name: 'filter' }}
				/>
			</Wrapper>,
		)

		// Default options: ALL, CheckOutlined icon, CloseOutlined icon
		expect(screen.getByText('ALL')).toBeInTheDocument()
	})

	it('使用 button style (optionType="button", buttonStyle="solid")', () => {
		const { container } = render(
			<Wrapper>
				<BooleanRadioButton
					formItemProps={{ name: 'filter' }}
				/>
			</Wrapper>,
		)

		// Should have radio group with solid button style
		const radioGroup = container.querySelector('.ant-radio-group-solid')
		expect(radioGroup).toBeInTheDocument()
	})

	it('預設使用 averageWidth 平均分配寬度', () => {
		const { container } = render(
			<Wrapper>
				<BooleanRadioButton
					formItemProps={{ name: 'filter' }}
				/>
			</Wrapper>,
		)

		const radioGroup = container.querySelector('.w-avg')
		expect(radioGroup).toBeInTheDocument()
	})
})
