import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({
	BaseRecord: {},
}))

// Mock @refinedev/antd
vi.mock('@refinedev/antd', () => ({}))

// Mock antd icons
vi.mock('@ant-design/icons', () => ({
	EditFilled: () => <span>edit-icon</span>,
	SaveFilled: () => <span>save-icon</span>,
	CloseOutlined: () => <span>close-icon</span>,
}))

import useUpdateRecord from './useUpdateRecord'
import { Form } from 'antd'

type TestRecord = {
	id: string
	name: string
}

// Wrapper component that uses the hook
const TestComponent = ({
	onFinish,
}: {
	onFinish?: (values: any) => void
}) => {
	const {
		formProps,
		editingKey,
		EditButton,
		isEditing,
		edit,
		save,
		cancel,
	} = useUpdateRecord<TestRecord>({
		rowKey: 'id',
		onFinish,
	})

	const record: TestRecord = { id: '1', name: 'Test Item' }

	return (
		<Form {...formProps}>
			<div data-testid="editing-key">{editingKey}</div>
			<div data-testid="is-editing">
				{isEditing(record) ? 'yes' : 'no'}
			</div>
			<button
				data-testid="edit-btn"
				onClick={() => edit(record)}
			>
				Edit
			</button>
			<button
				data-testid="save-btn"
				onClick={() => save('1')}
			>
				Save
			</button>
			<button data-testid="cancel-btn" onClick={cancel}>
				Cancel
			</button>
			<EditButton record={record} />
		</Form>
	)
}

describe('useUpdateRecord', () => {
	it('初始狀態 editingKey 為空字串', () => {
		render(<TestComponent />)
		expect(screen.getByTestId('editing-key').textContent).toBe('')
		expect(screen.getByTestId('is-editing').textContent).toBe('no')
	})

	it('呼叫 edit 後設定 editingKey 為 record 的 rowKey 值', () => {
		render(<TestComponent />)

		act(() => {
			fireEvent.click(screen.getByTestId('edit-btn'))
		})

		expect(screen.getByTestId('editing-key').textContent).toBe('1')
		expect(screen.getByTestId('is-editing').textContent).toBe('yes')
	})

	it('呼叫 cancel 後清除 editingKey', () => {
		render(<TestComponent />)

		act(() => {
			fireEvent.click(screen.getByTestId('edit-btn'))
		})
		expect(screen.getByTestId('editing-key').textContent).toBe('1')

		act(() => {
			fireEvent.click(screen.getByTestId('cancel-btn'))
		})
		expect(screen.getByTestId('editing-key').textContent).toBe('')
	})

	it('呼叫 save 後觸發 onFinish 並清除 editingKey', async () => {
		const onFinish = vi.fn()
		render(<TestComponent onFinish={onFinish} />)

		act(() => {
			fireEvent.click(screen.getByTestId('edit-btn'))
		})

		await act(async () => {
			fireEvent.click(screen.getByTestId('save-btn'))
		})

		expect(onFinish).toHaveBeenCalledTimes(1)
		expect(onFinish).toHaveBeenCalledWith(
			expect.objectContaining({ key: '1' }),
		)
		expect(screen.getByTestId('editing-key').textContent).toBe('')
	})

	it('EditButton 在非編輯狀態顯示編輯圖示', () => {
		render(<TestComponent />)
		// Should show the edit icon (not editing)
		expect(screen.getByText('edit-icon')).toBeInTheDocument()
	})
})
