import React from 'react'
import {
	useMediaUpload,
	TUseMediaUploadParams,
} from '@/refine/bunny/MediaLibrary/hooks'
import { Upload } from '@/wp/components/general'

const UploadVideo = (params: TUseMediaUploadParams) => {
	const bunnyUploadProps = useMediaUpload(params)
	return (
		<div className="lg:max-w-[80rem]">
			<Upload {...bunnyUploadProps} />
		</div>
	)
}

export default UploadVideo
