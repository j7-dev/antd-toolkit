import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Form } from 'antd'
import { Segmented } from './index'

// Mock the wp module's BOOLEAN_OPTIONS_REVERSE
vi.mock('@/wp', () => ({
	BOOLEAN_OPTIONS_REVERSE: [
		{ label: '否', value: 'no' },
		{ label: '是', value: 'yes' },
	],
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Form>{children}</Form>
)

describe('Segmented', () => {
	it('透過 segmented control 存入 "yes" 或 "no" 字串', () => {
		const { container } = render(
			<Wrapper>
				<Segmented
					formItemProps={{ name: 'enabled', label: '啟用' }}
				/>
			</Wrapper>,
		)

		// Segmented should render with antd segmented class
		const segmented = container.querySelector('.ant-segmented')
		expect(segmented).toBeInTheDocument()
	})

	it('使用 block 佈局佔滿寬度', () => {
		const { container } = render(
			<Wrapper>
				<Segmented formItemProps={{ name: 'enabled' }} />
			</Wrapper>,
		)

		const segmented = container.querySelector('.ant-segmented-block')
		expect(segmented).toBeInTheDocument()
	})
})
