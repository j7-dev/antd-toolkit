import React, { useEffect, memo } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, UploadProps, Form, Input } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import { useOnChangeUpload } from './useOnChangeUpload'

const { Item } = Form

const { Dragger } = Upload

export const OnChangeUploadComponent = () => {
	const { uploadProps, fileList, setFileList } = useOnChangeUpload()

	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	useEffect(() => {
		if (watchId) {
			const url = form.getFieldValue(['files'])
			setFileList([
				{
					uid: '-1',
					name: 'feature_image_url.png',
					status: 'done',
					url,
				},
			])
		}
	}, [watchId])

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setFileList([])
	}

	return (
		<div className="at-flex at-justify-center at-w-full at-mb-4">
			<ImgCrop
				aspect={1.778}
				quality={1}
				rotationSlider
				showReset
				resetText="重置"
				showGrid
				onModalCancel={(resolve) => {
					resolve(Upload.LIST_IGNORE)
				}}
				modalProps={{
					zIndex: 999999,
				}}
			>
				<Dragger {...uploadProps}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
					<p className="ant-upload-hint">僅支持 image/* 類型 文件</p>
					{fileList.length > 0 && fileList?.[0]?.url && (
						<div className="at-size-full at-absolute at-top-0 at-left-0 at-p-2">
							<div className="at-size-full at-rounded-lg at-overflow-hidden">
								<img
									src={fileList?.[0]?.url}
									className="at-size-full at-object-cover"
								/>
								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-12 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
								>
									<DeleteOutlined className="at-text-red-500 group-hover:at-text-white" />
								</div>
							</div>
						</div>
					)}
				</Dragger>
			</ImgCrop>
			<Item name={['files']} hidden>
				<Input />
			</Item>
		</div>
	)
}

/**
 * 這種 UPLOAD 會在 onChange 時，將圖片上傳到媒體庫，並回傳 attachmentId, url 等資訊
 */
export const OnChangeUpload = memo(OnChangeUploadComponent)
