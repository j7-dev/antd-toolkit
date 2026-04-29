import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Upload as AntdUpload, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useLocale } from '@/main/components/LocaleProvider'

const { Dragger } = AntdUpload

type TUploadProps = {
	uploadProps: UploadProps
	children?: React.ReactNode
}

export const Upload: React.FC<TUploadProps> = ({ uploadProps, children }) => {
	const t = useLocale('Upload')
	const { accept } = uploadProps
	return (
		<ImgCrop
			rotationSlider
			quality={1}
			aspectSlider
			showReset
			showGrid

			// cropShape="round"
		>
			<Dragger {...uploadProps}>
				{children ? (
					children
				) : (
					<>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">{t.uploadHint}</p>

						{accept ? (
							<p className="ant-upload-hint">{t.supportType(accept || '')}</p>
						) : (
							''
						)}
					</>
				)}
			</Dragger>
		</ImgCrop>
	)
}

export * from './useUpload'
