import React, { useState } from 'react'
import { isNumber, isString, isNull, isUndefined, isBoolean } from 'lodash-es'
import { keyToWord } from '@/main/utils'
import { cn } from '@/main/utils'
import { Empty, Form, Input } from 'antd'
import { ButtonProps } from 'antd/lib'
import { ActionButton } from '@/main/components/ActionButton'

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

export const ObjectTable: React.FC<{
	record: {
		[key: string]: any
	}
	editable?: boolean
	columns?: TColumn[]
	buttonProps?: ButtonProps
	className?: string
}> = ({ record, columns, editable = false, buttonProps, className }) => {
	const [isEditing, setIsEditing] = useState(false)

	if (!record) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

	const defaultColumns = Object.keys(record)
		.map((key) => {
			if (
				isNumber(record?.[key]) ||
				isString(record?.[key]) ||
				isNull(record?.[key]) ||
				isUndefined(record?.[key]) ||
				isBoolean(record?.[key])
			) {
				return {
					key,
					title: keyToWord(key),
					dataIndex: key,
				}
			}

			if (
				Array.isArray(record?.[key]) &&
				(record?.[key] || []).every(
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

		return isEditing ? (
			<Form.Item
				className="at-m-0"
				name={[dataIndex]}
				initialValue={record?.[dataIndex]}
			>
				<Input />
			</Form.Item>
		) : (
			<>
				{record?.[dataIndex as string]?.toString()}
				<Form.Item
					hidden
					name={[dataIndex]}
					initialValue={record?.[dataIndex]}
				/>
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
						buttonProps={buttonProps}
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
