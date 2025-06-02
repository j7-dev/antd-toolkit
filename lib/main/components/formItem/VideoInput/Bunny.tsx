import { FC, useEffect } from 'react'
import { Form, FormItemProps, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { TVideo } from '@/main/types'
import { useBunny } from '@/refine'
import {
	useMediaLibraryModal,
	MediaLibraryModal,
} from '@/refine/bunny/MediaLibraryModal'

const { Item } = Form
const Bunny: FC<FormItemProps> = (formItemProps) => {
	const { bunny_library_id } = useBunny()
	const form = Form.useFormInstance()

	const name = formItemProps?.name

	// 取得後端傳來的 saved video
	const savedVideo: TVideo | undefined = Form.useWatch(name, form)

	const { show, close, modalProps, ...mediaLibraryProps } =
		useMediaLibraryModal({
			onConfirm: (selectedItems) => {
				form.setFieldValue(name, {
					type: 'bunny-stream-api',
					id: selectedItems?.[0]?.guid || '',
					meta: {},
				})
			},
		})

	useEffect(() => {
		if (!savedVideo?.id) {
			show()
		}
	}, [])

	if (!name) {
		throw new Error('VideoInput name is required')
	}

	const isEmpty = savedVideo?.id === ''

	const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${savedVideo?.id}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`

	const handleDelete = () => {
		form.setFieldValue(name, {
			type: 'none',
			id: '',
			meta: {},
		})
	}

	return (
		<div className="at-relative">
			<Button
				size="small"
				type="link"
				className="at-ml-0 at-mb-2 at-pl-0"
				onClick={show}
			>
				開啟 Bunny 媒體庫
			</Button>
			<Item hidden {...formItemProps} />
			{/* 如果章節已經有存影片，則顯示影片，有瀏覽器 preview，則以 瀏覽器 preview 優先 */}
			{!isEmpty && (
				<div className="at-relative at-aspect-video at-rounded-lg at-border at-border-dashed at-border-gray-300">
					<div className="at-absolute at-size-full at-top-0 at-left-0 at-p-2">
						<div className="at-size-full at-rounded-xl at-overflow-hidden">
							<div
								className={`at-rounded-xl at-bg-gray-200 ${!isEmpty ? 'at-tw-block' : 'at-tw-hidden'}`}
								style={{
									position: 'relative',
									paddingTop: '56.25%',
								}}
							>
								<iframe
									className="at-border-0 at-absolute at-top-0 at-left-0 at-size-full at-rounded-xl"
									src={videoUrl}
									loading="lazy"
									allow="encrypted-media;picture-in-picture;"
									allowFullScreen={true}
								></iframe>

								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-12 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
								>
									<DeleteOutlined className="at-text-red-500 group-hover:at-text-white" />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<MediaLibraryModal
				modalProps={modalProps}
				mediaLibraryProps={{
					...mediaLibraryProps,
				}}
			/>
		</div>
	)
}

export default Bunny
