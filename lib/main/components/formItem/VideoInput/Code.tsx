import { Form, FormItemProps, Input } from 'antd'
import { FC, ChangeEvent, useState, useEffect } from 'react'

const { Item } = Form

// 抽象組件，適用任何拿來 iFrame 的平台
const Code: FC<FormItemProps> = (formItemProps) => {
	const { name } = formItemProps
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
		<div className="relative">
			<Input.TextArea
				allowClear
				className="mb-1 rounded-lg"
				rows={12}
				onChange={handleChange}
				value={value}
				placeholder="你可以放任何你想放的 HTML 或 iframe 或 Javascript 嵌入代碼，例如 JWP 影片、prestoplayer/WordPress shortcode 等..."
			/>
			<Item {...formItemProps} hidden />
		</div>
	)
}

export default Code
