import {useState} from 'react'
import { Table, TableProps } from 'antd'

type TableRowSelection<T> = TableProps<T>['rowSelection']

export function useRowSelection<T>(){

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

	const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }

	return {selectedRowKeys, setSelectedRowKeys, rowSelection}
}