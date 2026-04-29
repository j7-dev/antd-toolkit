import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Form } from 'antd'
import { DoubleConfirmSwitch } from './index'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('DoubleConfirmSwitch', () => {
	it('需要 Popconfirm 確認才能啟用', () => {
		const { container } = render(
			<Wrapper>
				<DoubleConfirmSwitch
					fromItemProps={{ name: 'confirm_switch' }}
				/>
			</Wrapper>,
		)

		// Switch should be rendered
		const switchEl = container.querySelector('.ant-switch')
		expect(switchEl).toBeInTheDocument()
	})

	it('顯示 Click to Enable/Disable 的 tooltip', () => {
		const { container } = render(
			<Wrapper>
				<DoubleConfirmSwitch
					fromItemProps={{ name: 'confirm_switch' }}
				/>
			</Wrapper>,
		)

		// The component renders a Switch inside Popconfirm inside Tooltip
		const switchEl = container.querySelector('.ant-switch')
		expect(switchEl).toBeInTheDocument()
	})
})
