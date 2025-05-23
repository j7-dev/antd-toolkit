import React, { FC, memo } from 'react'
import { Progress, UploadFile } from 'antd'

/**
 * @example
 * {
 * 	uid: 'rc-upload-1745987120068-9',
 * 	lastModified: 1745320457007,
 * 	lastModifiedDate: new Date('2025-04-22T11:14:17.007Z'),
 * 	name: 'parrot6.gif',
 * 	size: 2375442,
 * 	type: 'image/gif',
 * 	percent: 0,
 * 	originFileObj: {
 * 		uid: 'rc-upload-1745987120068-9',
 * 	},
 * 	status: 'uploading', // error | done | uploading | removed
 * } fileInQueue
 */

const FileUploadProgress: FC<{
	fileInQueue: UploadFile
}> = ({ fileInQueue }) => {
	const { status, percent, name } = fileInQueue
	const statusMapper = {
		uploading: 'active',
		done: 'success',
		error: 'exception',
		removed: 'normal',
	}
	return (
		<div className="at-grid at-grid-cols-2 at-place-content-center at-mb-2">
			<p className="at-m-0 at-text-xs at-truncate">{name}</p>
			<Progress
				size="small"
				percent={percent}
				// @ts-ignore
				status={statusMapper[status] || 'active'}
			/>
		</div>
	)
}

export default memo(FileUploadProgress)
