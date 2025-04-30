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
 * @param {Object} props - 配置選項
 * @param {UploadProps} [props.uploadProps] - 可選的 antd Upload 組件屬性
 * @param {Function} [props.beforeUpload] - 上傳前的處理函數
 * @param {Function} [props.onUploading] - 上傳中的回調函數，參數為上傳中的檔案
 * @param {Function} [props.onDone] - 上傳完成的回調函數，參數為上傳成功的附件資料
 * @param {Function} [props.onError] - 上傳錯誤的回調函數，參數為錯誤的檔案
 * @param {Function} [props.onRemoved] - 檔案被移除時的回調函數，參數為被移除的檔案
 * @returns {Object} 上傳相關的狀態和方法
 * @returns {UploadProps} returns.uploadProps - 合併後的 Upload 組件屬性
 * @returns {UploadFile[]} returns.fileList - 當前上傳的檔案列表
 * @returns {React.Dispatch<React.SetStateAction<UploadFile[]>>} returns.setFileList - 設置檔案列表的函數
 * @returns {number|undefined} returns.attachmentId - 上傳的 WordPress 媒體庫中的附件 ID
 * @returns {boolean} returns.isUploading - 上傳狀態
 */
export const useOnChangeUpload = (props?: {
	uploadProps?: UploadProps
	onUploading?: (_file: UploadFile<any>) => void
	onDone?: (_file: UploadFile<any>, _attachment: TAttachment) => void
	onError?: (_file: UploadFile<any>) => void
	onRemoved?: (_file: UploadFile<any>) => void
}) => {
	const { uploadProps, onDone, onError, onRemoved, onUploading } = props || {}
	const { USERNAME, PASSWORD, NONCE } = useEnv()
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [attachmentId, setAttachmentId] = useState<number | undefined>(
		undefined,
	)
	const [isUploading, setIsUploading] = useState(false)

	const apiUrl = useApiUrl()

	const onChange: UploadProps['onChange'] = ({ file }) => {
		const { status } = file

		if ('uploading' === status) {
			if (onUploading) {
				onUploading(file)
			}
			setFileList([file])
			setIsUploading(true)
		}

		if ('done' === status) {
			const data = file?.response?.data as TAttachment
			const attachmentId = Number(data?.id) || undefined

			setFileList([])

			setAttachmentId(attachmentId)
			setIsUploading(false)
			if (onDone) {
				onDone(file, data)
			}
		}

		if ('error' === status) {
			setFileList([])
			setIsUploading(false)
			if (onError) {
				onError(file)
			}
		}

		if ('removed' === status) {
			setFileList([])
			setIsUploading(false)
			if (onRemoved) {
				onRemoved(file)
			}
		}
	}

	const mergedUploadProps: UploadProps = {
		name: 'files',
		accept: 'image/*',
		action: `${apiUrl}/upload`,
		headers: {
			// 'Content-Type': 'multipart/form-data', // 不需要手動設置 multipart/form-data 不然會得到 "Missing boundary in multipart/form-data POST data" 錯誤
			// Authorization: `Basic ${btoa(USERNAME + ':' + PASSWORD)}`, // WP 網站的話用 cookie 驗證就OK
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
