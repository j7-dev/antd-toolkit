import { memo } from 'react'
import { CopyText, ExtIcon } from '@/main/components'
import { Button, Tooltip, Form, Input } from 'antd'
import { CopyOutlined, ExportOutlined } from '@ant-design/icons'
import { DeleteButton } from '@refinedev/antd'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'
import {
	keyToWord,
	isImageFile,
	isVideoFile,
	isAudioFile,
	getFileExtension,
	useEnv,
	valueStringify,
} from '@/main'
import { useUpdate } from '@refinedev/core'
import { notificationProps } from '@/refine'
import { FaWordpress } from 'react-icons/fa'
import { TImage } from '@/wp'
const { Item } = Form

const ItemInfo = ({ item }: { item: TAttachment | TImage }) => {
	const [form] = Form.useForm()
	const { SITE_URL } = useEnv()

	// @ts-ignore
	const { id, url, img_url = '', type = '', slug = '' } = item
	const { mutate: update, isLoading } = useUpdate({
		resource: 'posts',
	})

	// 是 TAttachment 才顯示
	if (!slug) {
		return null
	}

	const handleSave = () => {
		const values = form.getFieldsValue()
		update({
			id,
			values,
			...notificationProps,
		})
	}

	const ext = getFileExtension(url)
	const isImage = isImageFile(url)
	const isVideo = isVideoFile(url)
	const isAudio = isAudioFile(url)
	const isOther = !isImage && !isVideo && !isAudio

	return (
		<>
			{isImage && (
				<img
					className="at-w-full at-rounded-md at-aspect-square at-object-contain"
					src={img_url}
				/>
			)}
			{isVideo && (
				<video
					preload="metadata"
					src={url}
					controls
					className="at-w-full at-rounded-md"
				/>
			)}
			{isAudio && (
				<audio
					preload="metadata"
					src={url}
					controls
					className="at-w-full at-rounded-md"
				/>
			)}
			{isOther && (
				<div className="at-w-full at-rounded-md at-text-center at-object-contain">
					<ExtIcon ext={ext} className="at-size-3/4" />
				</div>
			)}

			<div className="at-flex at-gap-2 at-my-4">
				<CopyText text={url}>
					<Button type="default" icon={<CopyOutlined />} iconPosition="end">
						複製下載連結
					</Button>
				</CopyText>
				<Tooltip title="新分頁打開">
					<Button icon={<ExportOutlined />} href={url} target="_blank" />
				</Tooltip>
				<Tooltip title="傳統介面檢視">
					<Button
						icon={<FaWordpress className="at-text-gray-400" />}
						href={`${SITE_URL}/wp-admin/upload.php?item=${id}`}
						target="_blank"
					/>
				</Tooltip>
				<Tooltip title="刪除檔案">
					<DeleteButton
						hideText
						resource="posts"
						recordItemId={id}
						confirmTitle="確認刪除檔案嗎?"
						confirmOkText="確認"
						confirmCancelText="取消"
					/>
				</Tooltip>
			</div>

			<Form form={form}>
				<table className="table table-xs table-vertical at-mb-4 [&_th]:at-text-left at-w-full">
					<tbody>
						{Object.entries(item).map(([key, value], i) => {
							if ('img_url' === key) {
								return null
							}
							if ('_wp_attachment_image_alt' === key && isImage) {
								return null
							}

							const keyMapper = {
								_wp_attachment_image_alt: 'alt',
								short_description: 'caption',
							}

							return (
								<tr key={key}>
									<th>
										<div>
											{
												// @ts-ignore
												keyToWord(keyMapper?.[key] || key)
											}
										</div>
									</th>
									<td className="at-break-all">
										{displayValue(key, value, i)}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<div className="at-flex at-justify-end">
					<Button
						variant="solid"
						color="primary"
						onClick={handleSave}
						loading={isLoading}
					>
						儲存
					</Button>
				</div>
			</Form>
		</>
	)
}

function displayValue(key: string, value: any, i: number) {
	if ('author' === key) {
		return <>由 {value?.name} 上傳</>
	}

	if (
		['_wp_attachment_image_alt', 'short_description', 'description'].includes(
			key,
		)
	) {
		return (
			<Item name={key} noStyle>
				<Input size="small" />
			</Item>
		)
	}
	return <>{valueStringify(value)}</>
}

export default memo(ItemInfo)
