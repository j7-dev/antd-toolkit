import React, { memo } from 'react'
import { FormProps, Form, Input, Button, FormInstance, Select } from 'antd'
import { UndoOutlined, SearchOutlined } from '@ant-design/icons'
import { useLocale } from '@/main/components/LocaleProvider'

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

const defaultWrapperClassName =
	'at-grid at-grid-cols-2 md:at-grid-cols-3 at-gap-x-4'

const UserFilterComponent = <T extends TBaseRecord>({
	formProps,
	renderAfter,
	wrapperClassName,
	hideInclude = false,
}: TUserFilterProps<T>) => {
	const t = useLocale('UserFilter')
	const form = formProps?.form as FormInstance<T>

	return (
		<div className="at-mb-2">
			<Form layout="vertical" {...formProps}>
				<div
					className={
						wrapperClassName ? wrapperClassName : defaultWrapperClassName
					}
				>
					<Item name="search" label={t.keywordSearch}>
						<Input
							placeholder={t.keywordPlaceholder}
							allowClear
						/>
					</Item>

					{!hideInclude && (
						<Item name="include" label={t.includeUsers} className="at-col-span-2">
							<Select mode="tags" placeholder={t.userIdPlaceholder} allowClear />
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
						className="at-w-full"
						icon={<SearchOutlined />}
					>
						{t.filter}
					</Button>
					<Button
						type="default"
						className="at-w-full"
						onClick={() => {
							form.resetFields()
							form.submit()
						}}
						icon={<UndoOutlined />}
					>
						{t.reset}
					</Button>
				</div>
			</Form>
		</div>
	)
}

export const UserFilter = memo(
	UserFilterComponent,
) as typeof UserFilterComponent
