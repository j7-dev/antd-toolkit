import { FC, memo } from 'react'
import { FormItemProps, Select, Form, SelectProps } from 'antd'
import Youtube from './Youtube'
import Vimeo from './Vimeo'
import Bunny from './Bunny'
import Code from './Code'

type TVideoInputProps = {
	formItemProps: FormItemProps
	selectProps?: SelectProps
}

const { Item } = Form

const VideoInputComponent: FC<TVideoInputProps> = ({
	formItemProps,
	selectProps,
}) => {
	const { name, ...restFormItemProps } = formItemProps
	const form = Form.useFormInstance()
	const watchVideoType = Form.useWatch([...name, 'type'], form)

	const handleChange = () => {
		form.setFieldValue([...name, 'id'], '')
		form.setFieldValue([...name, 'meta'], {})
	}

	return (
		<>
			<Item
				{...restFormItemProps}
				name={[
					...name,
					'type',
				]}
				className="mb-1"
				initialValue="none"
			>
				<Select
					className="w-full"
					size="small"
					onChange={handleChange}
					options={[
						{ value: 'none', label: '無影片' },
						{ value: 'youtube', label: 'Youtube 嵌入' },
						{ value: 'vimeo', label: 'Vimeo 嵌入' },
						{ value: 'bunny-stream-api', label: 'Bunny Stream API' },
						{ value: 'code', label: '自訂代碼' },
					]}
					{...selectProps}
				/>
			</Item>
			{watchVideoType === 'youtube' && <Youtube {...formItemProps} />}
			{watchVideoType === 'vimeo' && <Vimeo {...formItemProps} />}
			{watchVideoType === 'bunny-stream-api' && <Bunny {...formItemProps} />}
			{watchVideoType === 'code' && <Code {...formItemProps} />}
		</>
	)
}

/**
 * 影片輸入框
 * 選擇影片來源，輸入影片 ID
 */
export const VideoInput = memo(VideoInputComponent)
