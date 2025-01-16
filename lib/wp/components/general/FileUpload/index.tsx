import React, { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, UploadProps, Form, UploadFile, GetProp } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const { Dragger } = Upload

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

/**
 * 這種 UPLOAD onChange 時不會發 API，只會取得 File 資訊
 */

export const FileUpload = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	const beforeUpload = (file: FileType) => {
		form.setFieldValue('files', file)
		getBase64(file, (url: string) => {
			setFileList([
				{
					...file,
					url,
				},
			])
		})
		return false
	}

	useEffect(() => {
		if (watchId) {
			const images = form.getFieldValue(['images'])
			if (images?.length) {
				setFileList([
					{
						uid: '-1',
						name: 'feature_image_url.png',
						status: 'done',
						url: images[0]?.url,
					},
				])
			}
		}
	}, [watchId])

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setFileList([])
	}

	return (
		<div className="flex justify-center w-full mb-4">
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
					maxCount={1}
					fileList={fileList}
					className="w-full aspect-video"
					showUploadList={false}
					beforeUpload={beforeUpload}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
					<p className="ant-upload-hint">僅支持 image/* 類型 文件</p>
					{fileList.length > 0 && fileList?.[0]?.url && (
						<div className="w-full h-full absolute top-0 left-0 p-2">
							<div className="w-full h-full rounded-lg overflow-hidden">
								<img
									src={fileList?.[0]?.url}
									className="w-full h-full object-cover"
								/>
								<div
									onClick={handleDelete}
									className="group absolute top-4 right-4 rounded-md w-12 h-12 bg-white shadow-lg flex justify-center items-center transition duration-300 hover:bg-red-500 cursor-pointer"
								>
									<DeleteOutlined className="text-red-500 group-hover:text-white" />
								</div>
							</div>
						</div>
					)}
				</Dragger>
			</ImgCrop>
		</div>
	)
}
