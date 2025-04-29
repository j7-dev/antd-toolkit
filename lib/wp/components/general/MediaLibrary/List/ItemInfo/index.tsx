import { SimpleImage } from '@/main/components'
import { ObjectTable, CopyText } from '@/main/components'
import { Button, Tooltip } from 'antd'
import { CopyOutlined, ExportOutlined } from '@ant-design/icons'
import { DeleteButton } from '@refinedev/antd'
import { TAttachment } from '@/wp/components/general/MediaLibrary/types'

const ItemInfo = ({ item }: { item: TAttachment }) => {
	const { id, url, img_url } = item

	return (
		<>
			<SimpleImage
				className="at-w-full at-rounded-md at-overflow-hidden"
				loadingClassName="at-text-sm at-text-gray-500 at-font-bold"
				ratio="at-aspect-square"
				src={img_url}
			/>
			<div className="at-flex at-gap-4 at-my-4">
				<CopyText text={url}>
					<Button type="default" icon={<CopyOutlined />} iconPosition="end">
						複製下載連結
					</Button>
				</CopyText>
				<Tooltip title="新分頁打開">
					<Button icon={<ExportOutlined />} href={url} target="_blank" />
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
			<ObjectTable className="[&_th]:at-text-left" record={item} />
		</>
	)
}

export default ItemInfo
