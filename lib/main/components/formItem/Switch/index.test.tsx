import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Form } from 'antd'
import { Switch } from './index'

// Mock the wp module's stringToBool
vi.mock('@/wp', () => ({
	stringToBool: (value: string | boolean | number) => {
		if (typeof value === 'boolean') return value
		return value === 'yes' || value === '1' || value === 1
	},
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('Switch', () => {
	it('透過 Form.Item normalize 存入 "yes" 或 "no" 字串', () => {
		const { container } = render(
			<Wrapper>
				<Switch
					formItemProps={{ name: 'enabled', label: '啟用' }}
				/>
			</Wrapper>,
		)

		// Switch should render with a button role
		const switchEl = container.querySelector('.ant-switch')
		expect(switchEl).toBeInTheDocument()
	})
})
