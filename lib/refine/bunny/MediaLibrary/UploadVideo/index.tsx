import React from 'react'
import { UploadProps } from 'antd'
import { Upload } from '@/wp/components/general'

const UploadVideo = (bunnyUploadProps: UploadProps) => {
	return (
		<div className="w-full h-full max-h-[30rem]">
			<Upload uploadProps={bunnyUploadProps} />
		</div>
	)
}

export default UploadVideo
