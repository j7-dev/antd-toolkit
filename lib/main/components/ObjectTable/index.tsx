import React, { useState, memo } from 'react'
import { isNumber, isString, isNull, isUndefined, isBoolean } from 'lodash-es'
import { keyToWord } from '@/main/utils'
import { cn } from '@/main/utils'
import { Empty, Form, Input } from 'antd'
import { ActionButton, TActionButton } from '@/main/components/ActionButton'

export type TColumn = {
	key: string
	title: string
	dataIndex: string
	render?: (
		value: any,
		record: any,
		index: number,
		editable: boolean,
	) => React.ReactNode
}

export type TObjectTable = {
	record: {
		[key: string]: any
	}
	editable?: boolean
	columns?: TColumn[]
	className?: string
	actionButtonProps?: TActionButton
}

const ObjectTableComponent: React.FC<TObjectTable> = ({
	record,
	columns,
	editable = false,
	className,
	actionButtonProps,
}) => {
	const [isEditing, setIsEditing] = useState(false)

	if (!record) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

	const defaultColumns = Object.entries(record)
		.map(([key, value]) => {
			if (
				isNumber(value) ||
				isString(value) ||
				isNull(value) ||
				isUndefined(value) ||
				isBoolean(value)
			) {
				return {
					key,
					title: keyToWord(key),
					dataIndex: key,
				}
			}

			if (
				Array.isArray(value) &&
				(value || []).every(
					(item: any) =>
						isNumber(item) ||
						isString(item) ||
						isNull(item) ||
						isUndefined(item),
				)
			) {
				return {
					key,
					title: keyToWord(key),
					dataIndex: key,
					render: (arr: (string | number)[], rowRecord: any, _k: number) =>
						editable && isEditing ? (
							<Form.Item
								className="at-m-0"
								name={[key]}
								initialValue={rowRecord?.[key]}
							>
								<Input />
							</Form.Item>
						) : (
							arr.join(', ')
						),
				}
			}
		})
		.filter((c) => !!c) as TColumn[]

	const getView = (theColumn: TColumn, j: number) => {
		const render = theColumn?.render
		const dataIndex = theColumn?.dataIndex

		if (render) {
			return render(record?.[dataIndex as string], record, j, editable)
		}

		if (!editable) {
			return record?.[dataIndex as string]?.toString()
		}

		return (
			<>
				{!isEditing && record?.[dataIndex as string]?.toString()}
				<Form.Item
					className="at-m-0"
					hidden={!isEditing}
					name={[dataIndex]}
					initialValue={record?.[dataIndex]}
				>
					<Input />
				</Form.Item>
			</>
		)
	}

	return (
		<>
			{editable && (
				<div className="at-flex at-justify-end at-mb-4">
					<ActionButton
						onEdit={() => setIsEditing(true)}
						onCancel={() => setIsEditing(false)}
						canDelete={false}
						{...actionButtonProps}
					/>
				</div>
			)}

			<table className={cn('table table-vertical at-mb-4', className)}>
				<tbody>
					{(columns ? columns : defaultColumns).map((column, i) => {
						return (
							<tr key={column?.key}>
								<th>
									<div>{column?.title as string}</div>
								</th>
								<td>{getView(column, i)}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

/**
 * ObjectTable 組件
 *
 * @description 將對象數據以表格形式垂直展示的組件，支持可編輯模式
 *
 * @param {object} record - 要顯示的數據對象
 * @param {Array<ColumnType>} [columns] - 自定義列配置，如果未提供則根據 record 自動生成
 * @param {boolean} [editable=false] - 是否啟用編輯模式
 * @param {Function} [onSave] - 編輯保存時的回調函數
 * @param {string} [className] - 表格的自定義 CSS 類名
 * @param {object} [buttonProps] - 操作按鈕的屬性配置
 * @param {Function} [valueStringify] - 自定義值格式化函數
 *
 * @returns {JSX.Element} 返回垂直佈局的表格組件
 *
 * @example
 * // 基本用法
 * <ObjectTable record={data} />
 *
 * // 可編輯模式
 * <ObjectTable
 *   record={data}
 *   editable={true}
 *   onSave={(values) => console.log(values)}
 * />
 *
 * // 自定義列
 * <ObjectTable
 *   record={data}
 *   columns={[
 *     { title: '名稱', dataIndex: 'name', key: 'name' },
 *     { title: '描述', dataIndex: 'description', key: 'description' }
 *   ]}
 * />
 */

export const ObjectTable = memo(ObjectTableComponent)
