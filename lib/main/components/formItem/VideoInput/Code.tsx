import { Form, FormItemProps, Input } from 'antd'
import { FC, ChangeEvent, useState, useEffect } from 'react'
import { useLocale } from '@/main/components/LocaleProvider'

const { Item } = Form

// 抽象組件，適用任何拿來 iFrame 的平台
const Code: FC<FormItemProps> = (formItemProps) => {
	const { name } = formItemProps
	const t = useLocale('VideoInput')
	const form = Form.useFormInstance()
	const [value, setValue] = useState('')
	const watchField = Form.useWatch(name, form)

	useEffect(() => {
		if (watchField) {
			setValue(watchField?.id)
		}
	}, [watchField])

	if (!name) {
		throw new Error('name is required')
	}

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value)
		form.setFieldValue(name, {
			type: 'code',
			id: e.target.value,
			meta: {},
		})
	}

	return (
		<div className="at-relative">
			<Input.TextArea
				allowClear
				className="at-mb-1 at-rounded-lg"
				rows={12}
				onChange={handleChange}
				value={value}
				placeholder={t.codePlaceholder}
			/>
			<Item {...formItemProps} hidden />
		</div>
	)
}

export default Code
