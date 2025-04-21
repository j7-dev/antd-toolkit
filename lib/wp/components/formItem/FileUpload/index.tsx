import React, { memo } from 'react'
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
	fileList: UploadFile[]
	setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
	formItemProps?: FormItemProps // 前端傳給後端的 欄位名稱
	aspect?: number
	uploadProps?: UploadProps
	imgCropProps?: ImgCropProps
	disableImgCrop?: boolean
}

const { Dragger } = Upload
const { Item } = Form

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const FileUploadComponent = ({
	fileList = [],
	setFileList,
	formItemProps = { name: ['images'] },
	aspect = 1,
	uploadProps,
	imgCropProps,
	disableImgCrop = false,
}: TFileUploadProps) => {
	const form = Form.useFormInstance()
	const fieldName = formItemProps?.name || ['images']

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
		form.setFieldValue(fieldName, 'delete')
	}

	if (disableImgCrop) {
		return (
			<div className="at-flex at-justify-center at-w-full at-mb-4">
				<Item hidden {...formItemProps} />
				<Dragger
					name="files"
					accept="image/*"
					maxCount={1}
					fileList={fileList}
					className="at-w-full"
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
						<div className="at-size-full at-absolute at-top-0 at-left-0 at-p-2">
							<div className="at-size-full at-rounded-lg at-overflow-hidden">
								<img
									src={fileList?.[0]?.url}
									className="at-size-full at-object-cover"
								/>
								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-10 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
								>
									<DeleteOutlined className="at-text-red-500 group-hover:at-text-white" />
								</div>
							</div>
						</div>
					)}
				</Dragger>
			</div>
		)
	}

	/** NOTE: Antd Dragger/Upload 組件必須直接在 ImgCrop 底下，否則無法正確裁切圖片 */
	return (
		<div className="at-flex at-justify-center at-w-full at-mb-4">
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
					className="at-w-full"
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
						<div className="at-size-full at-absolute at-top-0 at-left-0 at-p-2">
							<div className="at-size-full at-rounded-lg at-overflow-hidden">
								<img
									src={fileList?.[0]?.url}
									className="at-size-full at-object-cover"
								/>
								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-10 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
								>
									<DeleteOutlined className="at-text-red-500 group-hover:at-text-white" />
								</div>
							</div>
						</div>
					)}
				</Dragger>
			</ImgCrop>
		</div>
	)
}

/**
 * 檔案上傳元件
 * 這種 UPLOAD onChange 時不會發 API，只會取得 File 資訊
 * 需要自己再將 File 透過 API 發送給後端
 * File 會存在 form 中，可以透過 form.getFieldValue('images') 取得
 * aspect 是圖片寬高比，預設為 1，如果希望比例是 16:9 可以輸入 1.778
 * @param {object} props
 * @param {UploadFile[]} props.fileList - 檔案列表，例如: [{uid: '-1', name: 'feature_image_url.png', status: 'done', url: 'https://example.com/image.png'}]
 * @param {React.Dispatch<React.SetStateAction<UploadFile<any>[]>>} props.setFileList - 設定檔案列表
 * @param {FormItemProps} props.formItemProps - 前端傳給後端的欄位設定，預設 { name: ['images'] }
 * @param {number} props.aspect - 圖片裁切比例，預設為 1，例如 16:9 可設定為 1.778
 * @param {UploadProps} props.uploadProps - antd Upload 元件的 props
 * @param {ImgCropProps} props.imgCropProps - antd ImgCrop 元件的 props
 * @param {boolean} props.disableImgCrop - 是否停用圖片裁切功能
 * @returns {JSX.Element} FileUpload 元件
 */
export const FileUpload = memo(FileUploadComponent)
