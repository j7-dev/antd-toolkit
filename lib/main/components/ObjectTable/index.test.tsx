import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ObjectTable } from './index'

describe('ObjectTable', () => {
	it('自動從物件鍵值生成表格列', () => {
		const record = { name: 'John', age: 30, email: 'john@test.com' }
		render(<ObjectTable record={record} />)
		expect(screen.getByText('Name')).toBeInTheDocument()
		expect(screen.getByText('John')).toBeInTheDocument()
		expect(screen.getByText('Age')).toBeInTheDocument()
		expect(screen.getByText('30')).toBeInTheDocument()
		expect(screen.getByText('Email')).toBeInTheDocument()
		expect(screen.getByText('john@test.com')).toBeInTheDocument()
	})

	it('record 為 falsy 時顯示 Empty 元件', () => {
		const { container } = render(<ObjectTable record={null as any} />)
		const empty = container.querySelector('.ant-empty')
		expect(empty).toBeInTheDocument()
	})

	it('支援自訂 columns 配置', () => {
		const record = { name: 'John', age: 30 }
		const columns = [
			{ key: 'name', title: '姓名', dataIndex: 'name' },
			{ key: 'age', title: '年齡', dataIndex: 'age' },
		]
		render(<ObjectTable record={record} columns={columns} />)
		expect(screen.getByText('姓名')).toBeInTheDocument()
		expect(screen.getByText('年齡')).toBeInTheDocument()
	})

	it('editable 模式顯示 ActionButton', () => {
		const record = { name: 'John' }
		render(<ObjectTable record={record} editable />)
		// ActionButton renders an edit button by default
		expect(screen.getByText('編輯')).toBeInTheDocument()
	})
})
