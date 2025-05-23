import React, { FC, memo } from 'react'
import { Progress, Tooltip } from 'antd'
import { TFileInQueue } from '@/refine/bunny/types'
import { CodeOutlined } from '@ant-design/icons'
import { MdFileUpload } from 'react-icons/md'

const FileUploadProgress: FC<{
	fileInQueue: TFileInQueue
}> = ({ fileInQueue }) => {
	const { status, uploadProgress, isEncoding, encodeProgress, file } =
		fileInQueue
	const { name } = file
	const statusMapper = {
		uploading: 'active',
		done: 'success',
		error: 'exception',
		removed: 'normal',
	}
	return (
		<div className="at-grid at-grid-cols-2 at-place-content-center at-mb-2">
			<Tooltip
				title={isEncoding ? 'Bunny 編碼中' : '檔案上傳中'}
				zIndex={10000}
				className="at-flex at-items-center at-gap-2"
			>
				{isEncoding ? <CodeOutlined /> : <MdFileUpload />}
				<p className="at-m-0 at-text-xs at-truncate">{name}</p>
			</Tooltip>

			<Progress
				size="small"
				percent={isEncoding ? encodeProgress : uploadProgress}
				// @ts-ignore
				status={statusMapper[status] || 'active'}
			/>
		</div>
	)
}

export default memo(FileUploadProgress)
