import { FC, memo } from 'react'
import { FormItemProps, Form, SelectProps } from 'antd'
import Youtube from './Youtube'
import Vimeo from './Vimeo'
import Bunny from './Bunny'
import Code from './Code'
import { CheckIcon } from '@/main/components'

type TVideoInputProps = {
	formItemProps: FormItemProps
	selectProps?: SelectProps
}

const { Item } = Form

const OPTIONS = [
	{
		value: 'none',
		label: '無影片',
		url: 'https://e7.pngegg.com/pngimages/990/965/png-clipart-prohibition-in-the-united-states-computer-icons-symbol-none-angle-sign-thumbnail.png',
	},
	{
		value: 'wordpress',
		label: 'Wordpress 媒體庫',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/WordPress_logo.svg/2560px-WordPress_logo.svg.png',
	},
	{
		value: 'youtube',
		label: 'Youtube 嵌入',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png',
	},
	{
		value: 'vimeo',
		label: 'Vimeo 嵌入',
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Vimeo_Logo.svg/2560px-Vimeo_Logo.svg.png',
	},
	{
		value: 'bunny-stream-api',
		label: 'Bunny Stream API',
		url: 'https://img.perfops.net/img/cdn-provider/11.png',
	},
	{
		value: 'code',
		label: '自訂代碼',
		url: 'https://as1.ftcdn.net/jpg/01/16/06/44/1000_F_116064418_tEuuAaPygdFyrt1vUIDGhdtN0bwlsfoc.jpg',
	},
]

const VideoInputComponent: FC<TVideoInputProps> = ({ formItemProps }) => {
	const { name, ...restFormItemProps } = formItemProps
	const form = Form.useFormInstance()
	const watchVideoType = Form.useWatch(name, form)?.type || 'none'

	const options = OPTIONS

	return (
		<>
			<div className="at-grid at-grid-cols-3 at-gap-3">
				{options.map(({ value, url }) => {
					const isSelected = watchVideoType === value

					return (
						<div
							key={value}
							onClick={() => {
								form.setFieldValue(name, {
									type: value,
									id: '',
									meta: {},
								})
							}}
							className={`at-rounded-md at-border at-cursor-pointer at-border-solid at-border-gray-200 at-aspect-video at-w-full at-flex at-justify-center at-items-center at-relative ${
								isSelected
									? 'at-outline at-outline-4 at-outline-yellow-300 at-outline-offset-1'
									: ''
							}`}
						>
							<img src={url} className="at-size-4/5 at-object-contain" />
							{isSelected && (
								<div className="at-bg-white at-absolute -at-top-2 -at-right-2 at-z-[15] at-size-6 at-rounded-full at-flex at-items-center at-justify-center">
									<CheckIcon className="at-size-5 [&_path]:at-fill-yellow-300" />
								</div>
							)}
						</div>
					)
				})}
			</div>

			<Item
				{...restFormItemProps}
				name={name}
				className="at-mb-1"
				initialValue="none"
				hidden
			/>
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
