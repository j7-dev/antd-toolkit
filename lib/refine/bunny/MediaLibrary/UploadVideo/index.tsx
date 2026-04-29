import { FC } from 'react'
import { Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useLocale } from '@/main/components/LocaleProvider'

const { Dragger } = Upload

const UploadVideo: FC<{
	uploadProps: UploadProps
	children?: React.ReactNode
}> = ({ uploadProps, children }) => {
	const t = useLocale('Upload')
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
						<p className="ant-upload-text">{t.uploadHint}</p>
						{accept ? (
							<p className="ant-upload-hint">{t.supportType(accept)}</p>
						) : (
							''
						)}
					</>
				)}
			</Dragger>
		</div>
	)
}

export default UploadVideo
