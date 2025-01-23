import { useState } from 'react'
import { message, GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

/**
 * useUpload Hook 的參數介面
 * @interface TUseUploadParams
 * @property {string} apiUrl - 上傳檔案的 API 端點
 * @property {string} [accept] - 允許上傳的檔案類型 '.jpg,.png' , 'image/*', 'video/*', 'audio/*', 'image/png,image/jpeg', '.pdf, .docx, .doc, .xml'
 * @property {UploadProps} [uploadProps] - 額外的 antd Upload 組件 props
 */
type TUseUploadParams = {
	/** 上傳檔案的 API 端點 */
	apiUrl: string
	/**
	 * 允許上傳的檔案類型
	 * @default 'image/*'
	 * @example
	 * - '.jpg,.png' - 特定副檔名
	 * - 'image/*' - 所有圖片檔案
	 * - 'video/*' - 所有影片檔案
	 * - 'audio/*' - 所有音訊檔案
	 * - 'image/png,image/jpeg' - 特定 MIME 類型
	 * - '.pdf,.docx,.doc,.xml' - 多種文件類型
	 */
	accept?: string
	/** 額外的 antd Upload 組件設定 */
	uploadProps?: UploadProps
}

/**
 * 上傳檔案的回傳值介面
 * @interface TUseUploadReturn
 * @property {UploadProps} uploadProps - 合併後的上傳組件 props
 */
type TUseUploadReturn = {
	uploadProps: UploadProps
}

/**
 * 上傳檔案的自定義 Hook
 * @param {TUseUploadParams} params - Hook 的參數
 * @returns {{ uploadProps: UploadProps }} 回傳上傳組件所需的 props
 */
export const useUpload = ({
	apiUrl,
	accept = 'image/*',
	uploadProps,
}: TUseUploadParams): TUseUploadReturn => {
	/**
	 * 檔案列表狀態
	 * @type {UploadFile[]}
	 * @example
	 * [
	 *   {
	 *     uid: '-1',
	 *     name: 'image.png',
	 *     status: 'done',
	 *     url: 'https://example.com/image.png',
	 *   }
	 * ]
	 */
	const [fileList, setFileList] = useState<UploadFile[]>([])

	/**
	 * 合併預設值和使用者提供的上傳設定
	 */
	const mergedUploadProps: UploadProps = {
		/** 上傳欄位的名稱 */
		name: 'file',
		/** 允許的檔案類型 */
		accept,
		/** 是否允許多檔上傳 */
		multiple: false,
		/** 上傳的目標 URL */
		action: apiUrl,
		/** HTTP 請求方法 */
		method: 'post',
		/**
		 * 檔案狀態改變的處理函數
		 * @param {object} info - 上傳資訊
		 * @param {UploadFile} info.file - 當前操作的檔案
		 * @param {UploadFile[]} info.fileList - 檔案列表
		 */
		onChange({ file, fileList: theFileList }) {
			const { status, name } = file
			console.log('uploading', { file, theFileList, status })

			if (status !== 'uploading') {
			}
			if (status === 'done') {
				message.success(`${name} file uploaded successfully.`)
			} else if (status === 'error') {
				message.error(`${name} file upload failed.`)
			}
			setFileList(theFileList)
		},
		/**
		 * 預覽檔案的處理函數
		 * @param {UploadFile} file - 要預覽的檔案
		 */
		onPreview: async (file: UploadFile) => {
			let src = file.url as string
			if (!src) {
				src = await new Promise((resolve) => {
					const reader = new FileReader()
					reader.readAsDataURL(file.originFileObj as FileType)
					reader.onload = () => resolve(reader.result as string)
				})
			}
			const image = new Image()
			image.src = src
			const imgWindow = window.open(src)
			imgWindow?.document.write(image.outerHTML)
		},
		/**
		 * 拖放檔案的處理函數
		 * @param {React.DragEvent} e - 拖放事件
		 */
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files)
		},
		/** 檔案列表的展示方式 */
		listType: 'picture',
		/** 檔案列表 */
		fileList,
		...uploadProps,
	}

	return { uploadProps: mergedUploadProps }
}
