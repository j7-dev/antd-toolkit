import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({
	BaseRecord: {},
}))

// Mock @refinedev/antd
vi.mock('@refinedev/antd', () => ({}))

import { FilterTagsComponent } from './index'

// Helper to create a mock form instance
function createMockForm(values: Record<string, any>) {
	return {
		getFieldsValue: () => values,
		setFieldValue: vi.fn(),
		submit: vi.fn(),
	} as any
}

describe('FilterTagsComponent', () => {
	it('undefined/null/空字串值不顯示 Tag', () => {
		const form = createMockForm({
			name: undefined,
			status: null,
			keyword: '',
		})
		const { container } = render(
			<FilterTagsComponent form={form} />,
		)
		// 不應有任何 Tag
		expect(container.querySelectorAll('.ant-tag').length).toBe(0)
	})

	it('一般字串值顯示為 Tag', () => {
		const form = createMockForm({
			name: 'test-product',
		})
		render(<FilterTagsComponent form={form} />)
		expect(screen.getByText(/test-product/)).toBeInTheDocument()
	})

	it('keyLabelMapper 轉換 key 為顯示標籤', () => {
		const form = createMockForm({
			status: 'publish',
		})
		const keyLabelMapper = (key: any) => {
			if (key === 'status') return '狀態'
			return key?.toString()
		}
		render(
			<FilterTagsComponent
				form={form}
				keyLabelMapper={keyLabelMapper}
			/>,
		)
		expect(screen.getByText(/狀態/)).toBeInTheDocument()
	})

	it('valueLabelMapper 轉換 value 為顯示標籤', () => {
		const form = createMockForm({
			status: 'publish',
		})
		const valueLabelMapper = (value: any) => {
			if (value === 'publish') return '已發佈'
			return value?.toString()
		}
		render(
			<FilterTagsComponent
				form={form}
				valueLabelMapper={valueLabelMapper}
			/>,
		)
		expect(screen.getByText(/已發佈/)).toBeInTheDocument()
	})

	it('字串/數字陣列值顯示多個 Tag', () => {
		const form = createMockForm({
			tags: ['red', 'blue', 'green'],
		})
		render(<FilterTagsComponent form={form} />)
		expect(screen.getByText(/red/)).toBeInTheDocument()
		expect(screen.getByText(/blue/)).toBeInTheDocument()
		expect(screen.getByText(/green/)).toBeInTheDocument()
	})

	it('空陣列不顯示 Tag', () => {
		const form = createMockForm({
			tags: [],
		})
		const { container } = render(
			<FilterTagsComponent form={form} />,
		)
		expect(container.querySelectorAll('.ant-tag').length).toBe(0)
	})

	it('boolean 值顯示為 Tag', () => {
		const form = createMockForm({
			featured: true,
		})
		render(<FilterTagsComponent form={form} />)
		expect(screen.getByText(/true/)).toBeInTheDocument()
	})

	it('booleanKeys 的字串值 "1" 轉換為 true 標籤', () => {
		const form = createMockForm({
			featured: '1',
		})
		render(
			<FilterTagsComponent
				form={form}
				booleanKeys={['featured'] as any}
			/>,
		)
		expect(screen.getByText(/true/)).toBeInTheDocument()
	})

	it('booleanKeys 的字串值 "0" 轉換為 false 標籤', () => {
		const form = createMockForm({
			featured: '0',
		})
		render(
			<FilterTagsComponent
				form={form}
				booleanKeys={['featured'] as any}
			/>,
		)
		expect(screen.getByText(/false/)).toBeInTheDocument()
	})
})
