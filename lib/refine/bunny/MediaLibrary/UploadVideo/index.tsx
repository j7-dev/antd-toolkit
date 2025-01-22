import React from 'react'
import { UploadProps } from 'antd'
import { Upload } from '@/wp/components/general'

const UploadVideo = (bunnyUploadProps: UploadProps) => {
	return (
		<div className="lg:max-w-[80rem]">
			<Upload uploadProps={bunnyUploadProps} />
		</div>
	)
}

export default UploadVideo
