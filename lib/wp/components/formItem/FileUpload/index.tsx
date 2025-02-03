import React, { useState } from 'react'
import ImgCrop, { ImgCropProps } from 'antd-img-crop'
import {
	Upload,
	UploadProps,
	Form,
	UploadFile,
	GetProp,
	FormItemProps,
} from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
type TFileUploadProps = {
	formItemProps?: FormItemProps
	aspect?: number
	uploadProps?: UploadProps
	imgCropProps?: ImgCropProps
}

const { Dragger } = Upload
const { Item } = Form

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

/**
 * 這種 UPLOAD onChange 時不會發 API，只會取得 File 資訊
 * 需要自己再將 File 透過 API 發送給後端
 * File 會存在 form 中，可以透過 form.getFieldValue('files') 取得
 * aspect 是圖片寬高比，預設為 1，如果希望比例是 16:9 可以輸入 1.778
 */
export const FileUpload = ({
	formItemProps = { name: ['files'] },
	aspect = 1,
	uploadProps,
	imgCropProps,
}: TFileUploadProps) => {
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const form = Form.useFormInstance()
	const fieldName = formItemProps?.name || ['files']

	const beforeUpload = (file: FileType) => {
		form.setFieldValue(fieldName, file)
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

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setFileList([])
	}

	return (
		<div className="flex justify-center w-full mb-4">
			<Item hidden {...formItemProps} />
			<ImgCrop
				aspect={aspect}
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
				{...imgCropProps}
			>
				<Dragger
					name="files"
					accept="image/*"
					maxCount={1}
					fileList={fileList}
					className="w-full"
					showUploadList={false}
					beforeUpload={beforeUpload}
					style={{
						aspectRatio: aspect,
					}}
					{...uploadProps}
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
