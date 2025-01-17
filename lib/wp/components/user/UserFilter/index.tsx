import React, { memo } from 'react'
import { FormProps, Form, Input, Button, FormInstance, Select } from 'antd'
import { UndoOutlined, SearchOutlined } from '@ant-design/icons'

const { Item } = Form

type TBaseRecord = {
	search?: string
	include?: string[]
}

type TUserFilterProps<T extends TBaseRecord> = {
	formProps: FormProps<T>
	renderAfter?: React.ReactNode
	wrapperClassName?: string
	hideInclude?: boolean
}

const defaultWrapperClassName = 'grid grid-cols-2 md:grid-cols-3 gap-x-4'

const UserFilterComponent = <T extends TBaseRecord>({
	formProps,
	renderAfter,
	wrapperClassName,
	hideInclude = false,
}: TUserFilterProps<T>) => {
	const form = formProps?.form as FormInstance<T>

	return (
		<div className="mb-2">
			<Form layout="vertical" {...formProps}>
				<div
					className={
						wrapperClassName ? wrapperClassName : defaultWrapperClassName
					}
				>
					<Item name="search" label="關鍵字搜尋">
						<Input
							placeholder="可以輸入用戶ID, 帳號, Email, 顯示名稱"
							allowClear
						/>
					</Item>

					{!hideInclude && (
						<Item name="include" label="包含指定用戶" className="col-span-2">
							<Select mode="tags" placeholder="輸入用戶 ID" allowClear />
						</Item>
					)}

					{renderAfter}
				</div>
				<div
					className={
						wrapperClassName ? wrapperClassName : defaultWrapperClassName
					}
				>
					<Button
						htmlType="submit"
						type="primary"
						className="w-full"
						icon={<SearchOutlined />}
					>
						篩選
					</Button>
					<Button
						type="default"
						className="w-full"
						onClick={() => {
							form.resetFields()
							form.submit()
						}}
						icon={<UndoOutlined />}
					>
						重置
					</Button>
				</div>
			</Form>
		</div>
	)
}

export const UserFilter = memo(
	UserFilterComponent,
) as typeof UserFilterComponent
