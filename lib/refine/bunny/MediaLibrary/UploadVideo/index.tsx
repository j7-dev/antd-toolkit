import { UploadProps } from 'antd'
import { Upload } from '@/wp/components/general'

const UploadVideo = (bunnyUploadProps: UploadProps) => {
	return (
		<div className="at-w-full at-h-full at-max-h-[30rem]">
			<Upload uploadProps={bunnyUploadProps} />
		</div>
	)
}

export default UploadVideo
