import { FC } from 'react'
import { UploadProps } from 'antd'
import { Upload } from '@/wp/components/general'

const UploadVideo: FC<{ uploadProps: UploadProps }> = ({ uploadProps }) => {
	return (
		<div className="at-size-full at-max-h-[30rem]">
			<Upload uploadProps={uploadProps} />
		</div>
	)
}

export default UploadVideo
