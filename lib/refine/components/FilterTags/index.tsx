import { memo } from 'react'
import { Tag, FormInstance } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { CloseCircleOutlined } from '@ant-design/icons'
import { BaseRecord } from '@refinedev/core'
import { NamePath } from 'rc-field-form/es/interface'

export function FilterTagsComponent<T = BaseRecord>({
	form,
	keyLabelMapper = (s) => s?.toString(),
	valueLabelMapper = (s) => s?.toString(),
	booleanKeys = [],
}: {
	form: FormInstance<T>
	keyLabelMapper?: (key: keyof T) => string
	valueLabelMapper?: (key: string) => string
	booleanKeys?: (keyof T)[]
}): JSX.Element {
	const filteredValues = form?.getFieldsValue()
	const handleClearFilterProps = (key: string) => () => {
		form?.setFieldValue([key] as NamePath<T>, undefined)
		form?.submit()
	}

	const handleArrayProps =
		(key: string, value: string | number, filteredValue: (string | number)[]) =>
		() => {
			const newValue = filteredValue.filter((item) => item !== value)
			form?.setFieldValue([key] as NamePath<T>, newValue)
			form?.submit()
		}

	const filterKeys = Object.keys(filteredValues || {}) as (keyof T)[]

	return (
		<>
			{filteredValues &&
				filterKeys.map((key) => {
					const filteredValue = filteredValues?.[key]

					/**
					 * If the value is undefined, null or empty string, we will not display the tag
					 *
					 * @returns null
					 */

					if (
						filteredValue === undefined ||
						filteredValue === null ||
						filteredValue === ''
					)
						return null

					/**
					 * If the value is an array of dayjs objects, we will format the date range
					 * often used in date range picker from antd
					 *
					 * @returns Tag with 'YYYY/MM/DD ~ YYYY/MM/DD'
					 */

					if (
						Array.isArray(filteredValue) &&
						(filteredValue as unknown[])?.every(
							(item: unknown) => item instanceof dayjs,
						) &&
						filteredValue?.length > 0
					) {
						return (
							<Tag
								key={key as string}
								bordered={false}
								color="cyan"
								className="at-px-2.5 at-py-0.5"
								closeIcon={<CloseCircleOutlined />}
								onClose={handleClearFilterProps(key as string)}
							>
								{keyLabelMapper(key)}:{' '}
								{(filteredValues[key] as Dayjs[])
									.map((date) => (date ? date.format('YYYY/MM/DD') : ''))
									.join(' ~ ')}
							</Tag>
						)
					}

					/**
					 * If the value is an string|number array
					 *
					 * @returns Multiple Tags
					 */

					if (Array.isArray(filteredValue)) {
						if (filteredValue.length === 0) {
							return null
						}
						// ensue every item in the array is a string or number

						const isStringOrNumber = (filteredValue as unknown[]).every(
							(item) => typeof item === 'string' || typeof item === 'number',
						)
						if (isStringOrNumber) {
							return (filteredValue as (string | number)[]).map((value) => (
								<Tag
									key={`${key as string}[${value?.toString()}]`}
									bordered={false}
									color="cyan"
									className="at-px-2.5 at-py-0.5"
									closeIcon={<CloseCircleOutlined />}
									onClose={handleArrayProps(
										key as string,
										value,
										filteredValue as (string | number)[],
									)}
								>
									{keyLabelMapper(key)}: {valueLabelMapper(value?.toString())}
								</Tag>
							))
						} else {
							return null
						}
					}

					/**
					 * If the value is an boolean, we will display the boolean value in string
					 *
					 * @returns Tag with 'true' or 'false'
					 */

					if (typeof filteredValue === 'boolean') {
						return (
							<Tag
								key={key as string}
								bordered={false}
								color="cyan"
								className="at-px-2.5 at-py-0.5"
								closeIcon={<CloseCircleOutlined />}
								onClose={handleClearFilterProps(key as string)}
							>
								{keyLabelMapper(key)}: {keyLabelMapper(key)}:{' '}
								{valueLabelMapper(filteredValue?.toString())}
							</Tag>
						)
					}

					/**
					 * If the value is not in the above conditions, we will display the value as it is
					 * Because BooleanRadioButton will pass the value as string, "", "0" or "1"
					 *
					 *
					 * @returns Tag
					 */

					const isBoolean = !!booleanKeys?.includes(key)
					return (
						<Tag
							key={key as string}
							bordered={false}
							color="cyan"
							className="at-px-2.5 at-py-0.5"
							closeIcon={<CloseCircleOutlined />}
							onClose={handleClearFilterProps(key as string)}
						>
							{keyLabelMapper(key)}:{' '}
							{isBoolean &&
								valueLabelMapper(
									filteredValue?.toString() === '1' ? 'true' : 'false',
								)}
							{!isBoolean && valueLabelMapper(filteredValue?.toString())}
						</Tag>
					)
				})}
		</>
	)
}

export const FilterTags = memo(
	FilterTagsComponent,
) as typeof FilterTagsComponent
