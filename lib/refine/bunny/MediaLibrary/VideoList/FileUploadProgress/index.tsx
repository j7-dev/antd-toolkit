import React, { FC } from 'react'
import { Progress } from 'antd'
import { TFileInQueue } from '@/refine'

/**
  ⭐  file:
  uid: "rc-upload-1719294531448-7",
  name: "chrome_mhvwHxR3VI.mp4",
  lastModified: 1717750071360,
  webkitRelativePath: "",
  size: 3284342,
  type: "video/mp4"
 */

const FileUploadProgress: FC<{
	fileInQueue: TFileInQueue
}> = ({ fileInQueue }) => {
	const { status = 'active', uploadProgress } = fileInQueue

	return (
		<>
			<p className="at-m-2 at-text-xs">影片上傳中</p>
			<Progress
				percent={uploadProgress}
				percentPosition={{ align: 'center', type: 'outer' }}
				status={status}
			/>
		</>
	)
}

export default FileUploadProgress
