import { FC, memo } from 'react'
import { Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const UploadFile: FC<{
	uploadProps: UploadProps
	children?: React.ReactNode
}> = ({ uploadProps, children }) => {
	const { accept } = uploadProps
	return (
		<div className="at-size-full at-max-h-[30rem]">
			<Dragger {...uploadProps}>
				{children ? (
					children
				) : (
					<>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
						{accept ? (
							<p className="ant-upload-hint">支持 {accept} 類型檔案</p>
						) : (
							''
						)}
					</>
				)}
			</Dragger>
		</div>
	)
}

export default memo(UploadFile)
