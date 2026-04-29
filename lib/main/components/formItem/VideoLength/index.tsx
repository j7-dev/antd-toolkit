import { FC, useState, useEffect, memo } from 'react'
import { FormItemProps, Form, Space, InputNumber } from 'antd'
import { useLocale } from '@/main/components/LocaleProvider'

const { Item } = Form

const VideoLengthComponent: FC<FormItemProps> = (formItemProps) => {
	const form = Form.useFormInstance()
	const tl = useLocale('VideoLength')
	const [length, setLength] = useState({
		hour: 0,
		minute: 0,
		second: 0,
	})

	const { name } = formItemProps
	const recordId = Form.useWatch(['id'], form)

	const handleChange =
		(field: 'hour' | 'minute' | 'second') => (value: number | null) => {
			setLength((prev) => {
				const newLength = { ...prev, [field]: value ?? 0 }

				const newLengthInSecond =
					newLength.hour * 3600 + newLength.minute * 60 + newLength.second
				form.setFieldValue(name, newLengthInSecond)

				return newLength
			})
		}

	useEffect(() => {
		if (recordId) {
			const lengthInSecond = form.getFieldValue(name)
			const h = lengthInSecond ? Math.floor(lengthInSecond / 3600) : 0
			const m = lengthInSecond
				? Math.floor((lengthInSecond - h * 3600) / 60)
				: 0
			const s = lengthInSecond ? lengthInSecond - h * 3600 - m * 60 : 0
			setLength({ hour: h, minute: m, second: s })
		}
	}, [recordId])

	return (
		<>
			{formItemProps?.label && (
				<label className="at-mb-2">{formItemProps?.label}</label>
			)}
			<Space.Compact block>
				<InputNumber
					addonAfter={tl.hour}
					value={length.hour}
					min={0}
					onChange={handleChange('hour')}
				/>
				<InputNumber
					addonAfter={tl.minute}
					value={length.minute}
					min={0}
					max={59}
					onChange={handleChange('minute')}
				/>
				<InputNumber
					addonAfter={tl.second}
					value={length.second}
					min={0}
					max={59}
					onChange={handleChange('second')}
				/>
			</Space.Compact>
			<Item hidden {...formItemProps} />
		</>
	)
}

/**
 * 時長輸入框
 * 輸入，時分秒，輸出秒數
 * TODO 加入天月年!?
 */
export const VideoLength = memo(VideoLengthComponent)
