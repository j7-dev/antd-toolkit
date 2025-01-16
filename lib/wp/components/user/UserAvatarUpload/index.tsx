import { memo, useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, UploadProps, Form, UploadFile } from 'antd'
import { useApiUrl } from '@refinedev/core'

const { Item } = Form

type TUserAvatarUploadProps = {
	endPoint?: string
	nonce: string
	name: string | number | (string | number)[]
}

const UserAvatarUploadComponent = ({
	endPoint,
	nonce,
	name,
}: TUserAvatarUploadProps) => {
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)

	const apiUrl = useApiUrl()

	const onChange: UploadProps['onChange'] = ({
		file,
		fileList: newFileList,
	}) => {
		const { status } = file
		setFileList(newFileList)
		if ('done' !== status) return

		const url = file?.response?.data?.url

		form.setFieldValue(name, url)
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
			const url = form.getFieldValue(name)
			setFileList([
				{
					uid: '-1',
					name: 'user_avatar_url.png',
					status: 'done',
					url,
				},
			])
		}
	}, [watchId])

	return (
		<div className="flex justify-center w-full mb-4">
			<ImgCrop
				quality={1}
				rotationSlider
				showReset
				resetText="重置"
				cropShape="round"
				showGrid
				onModalCancel={(resolve) => {
					resolve(Upload.LIST_IGNORE)
				}}
				modalProps={{
					zIndex: 999999,
				}}
			>
				<Upload
					name="files"
					listType="picture-circle"
					accept="image/*"
					action={`${endPoint ? endPoint : `${apiUrl}/upload`}`}
					headers={{
						'X-WP-Nonce': nonce,
					}}
					maxCount={1}
					withCredentials
					fileList={fileList}
					onChange={onChange}

					// beforeUpload={beforeUpload}
				>
					{fileList.length < 1 && (
						<p className="text-xs">
							建議尺寸
							<br />
							400x400
						</p>
					)}
				</Upload>
			</ImgCrop>
			<Item name={name} hidden />
		</div>
	)
}

export const UserAvatarUpload = memo(UserAvatarUploadComponent)
