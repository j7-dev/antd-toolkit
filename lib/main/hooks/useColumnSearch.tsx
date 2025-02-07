import { useState, useRef, MouseEvent } from 'react'
import { Input, InputRef } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons'
import type { ColumnType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'

export const useColumnSearch = <
	DataType,
	DataIndex extends string & keyof DataType,
>() => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	const handleSearch = (
		selectedKeys: string[],
		confirm: (_param?: FilterConfirmProps) => void,
		dataIndex: DataIndex,
	) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (
		clearFilters: () => void,
		e: MouseEvent<HTMLSpanElement>,
	) => {
		e.stopPropagation()
		clearFilters()
		setSearchText('')
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<div className="at-w-60 at-tw-block">
					<Input.Search
						ref={searchInput}
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onSearch={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						className="at-w-full"
						enterButton
						allowClear={{
							clearIcon: (
								<CloseCircleFilled
									onClick={(e: MouseEvent<HTMLSpanElement>) =>
										clearFilters && handleReset(clearFilters, e)
									}
								/>
							),
						}}
					/>
				</div>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			((record?.[dataIndex] || '') as string | number)
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})

	return {
		getColumnSearchProps,
	}
}
