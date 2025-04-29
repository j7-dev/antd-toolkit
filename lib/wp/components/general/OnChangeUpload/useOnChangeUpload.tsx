import { useState } from 'react'
import { UploadFile, UploadProps } from 'antd'
import { useApiUrl } from '@refinedev/core'
import { useEnv } from '@/main'

type TAttachment = {
	id: string
	url: string
	type: string
	name: string
	size: number
	width: number
	height: number
}

/**
 * 用於 onChange 時，處理上傳功能的自定義 Hook
 * 與 antd Upload 搭配使用
 *
 * 此 Hook 提供檔案上傳的狀態管理和處理邏輯，包括：
 * - 檔案列表管理
 * - 上傳狀態追蹤
 * - 附件 ID 管理
 * - 整合 WordPress 媒體庫上傳
 *
 * @param {UploadProps} [options.uploadProps] - 可選的 antd Upload 組件屬性
 * @returns {Object} 上傳相關的狀態和方法
 * @returns {UploadProps} returns.uploadProps - 合併後的 Upload 組件屬性
 * @returns {UploadFile[]} returns.fileList - 當前上傳的檔案列表
 * @returns {React.Dispatch<React.SetStateAction<UploadFile[]>>} returns.setFileList - 設置檔案列表的函數
 * @returns {number|undefined} returns.attachmentId - 上傳的 WordPress 媒體庫中的附件 ID
 * @returns {boolean} returns.isUploading - 上傳狀態
 */
export const useOnChangeUpload = (props?: {
	uploadProps?: UploadProps
	onUploadSuccess?: (_data: TAttachment) => void
}) => {
	const { uploadProps, onUploadSuccess } = props || {}
	const { NONCE } = useEnv()
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [attachmentId, setAttachmentId] = useState<number | undefined>(
		undefined,
	)
	const [isUploading, setIsUploading] = useState(false)

	const apiUrl = useApiUrl()

	const onChange: UploadProps['onChange'] = ({ file }) => {
		const { status } = file
		setFileList([file])
		setIsUploading(true)

		if ('done' !== status) return

		const data = file?.response?.data as TAttachment
		const url = data?.url
		const attachmentId = Number(data?.id) || undefined

		setFileList([
			{
				...file,
				url,
			},
		])

		setAttachmentId(attachmentId)
		setIsUploading(false)
		if (onUploadSuccess) {
			onUploadSuccess(data)
		}
	}

	const mergedUploadProps: UploadProps = {
		name: 'files',
		accept: 'image/*',
		action: `${apiUrl}/upload`,
		headers: {
			'X-WP-Nonce': NONCE,
		},
		maxCount: 1,
		withCredentials: true,
		fileList,
		onChange,
		showUploadList: false,
		...uploadProps,
	}

	return {
		uploadProps: mergedUploadProps,
		fileList,
		setFileList,
		attachmentId,
		isUploading,
	}
}
