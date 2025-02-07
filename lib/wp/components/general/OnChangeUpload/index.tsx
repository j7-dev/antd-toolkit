import React, { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, UploadProps, Form, Input, UploadFile } from 'antd'
import { useApiUrl } from '@refinedev/core'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEnv } from '@/main/components/EnvProvider'

const { Item } = Form

const { Dragger } = Upload

/**
 * 這種 UPLOAD 會在 onChange 時，將圖片上傳到媒體庫，並回傳 attachmentId, url 等資訊
 */

export const OnChangeUpload = () => {
	const { NONCE } = useEnv()
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	const apiUrl = useApiUrl()

	const onChange: UploadProps['onChange'] = ({ file }) => {
		const { status } = file
		setFileList([file])

		if ('done' !== status) return

		const url = file?.response?.data?.url
		const attachmentId = file?.response?.data?.id

		setFileList([
			{
				...file,
				url,
			},
		])

		form.setFieldValue('files', attachmentId)
	}

	// const beforeUpload = (file: FileType) => {
	//   const isLt2M = file.size / 1024 / 1024 < 2
	//   if (!isLt2M) {
	//     message.error('圖片大小必須小於 2MB!')
	//   }
	//   return false
	// }

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
				<Dragger
					name="files"
					accept="image/*"
					action={`${apiUrl}/upload`}
					headers={{
						'X-WP-Nonce': NONCE,
					}}
					maxCount={1}
					withCredentials
					fileList={fileList}
					onChange={onChange}
					className="at-w-full at-aspect-video"
					showUploadList={false}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
					<p className="ant-upload-hint">僅支持 image/* 類型 文件</p>
					{fileList.length > 0 && fileList?.[0]?.url && (
						<div className="at-w-full at-h-full at-absolute at-top-0 at-left-0 at-p-2">
							<div className="at-w-full at-h-full at-rounded-lg at-overflow-hidden">
								<img
									src={fileList?.[0]?.url}
									className="at-w-full at-h-full at-object-cover"
								/>
								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-w-12 at-h-12 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
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
