import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Upload as AntdUpload, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'

const { Dragger } = AntdUpload

type TUploadProps = {
	uploadProps: UploadProps
	children?: React.ReactNode
}

export const Upload: React.FC<TUploadProps> = ({ uploadProps, children }) => {
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
						<p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
						<p className="ant-upload-hint">
							支持單個或批量上傳。{accept ? `僅支持 ${accept} 類型檔案` : ''}
						</p>
					</>
				)}
			</Dragger>
		</ImgCrop>
	)
}

export * from './useUpload'
