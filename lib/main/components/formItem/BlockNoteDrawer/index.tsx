import { FC, useEffect, lazy, Suspense, memo } from 'react'
import {
	Button,
	Form,
	Drawer,
	Input,
	Alert,
	Dropdown,
	Tooltip,
	DropdownProps,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useBlockNoteDrawer } from './useBlockNoteDrawer'
import { useBlockNote } from '@/main'
import { TUseBlockNoteParams } from '@/main/components/editor/BlockNote/types'
import { usePlugin, BlockNote } from '@/main'

const { Item } = Form

type TBlockNoteDrawerProps = {
	name?: string | number | (string | number)[]
	itemLabel?: string
	dropdownButtonProps?: DropdownProps
	useBlockNoteParams: TUseBlockNoteParams
}

const BlockNoteDrawerComponent: FC<TBlockNoteDrawerProps> = ({
	name = ['description'],
	itemLabel = '',
	dropdownButtonProps,
	useBlockNoteParams,
}) => {
	const { siteUrl = '' } = usePlugin()

	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)
	const { blockNoteViewProps, html, setHTML } = useBlockNote(useBlockNoteParams)

	const { editor } = blockNoteViewProps

	const { drawerProps, show, close, open } = useBlockNoteDrawer({
		itemLabel,
	})

	const handleConfirm = () => {
		form.setFieldValue(name, html)
		close()
	}

	useEffect(() => {
		if (watchId && open) {
			const description = form.getFieldValue(name)

			async function loadInitialHTML() {
				const blocks = await editor.tryParseHTMLToBlocks(description)
				editor.replaceBlocks(editor.document, blocks)
			}
			loadInitialHTML()
		}

		if (!watchId && open) {
			setHTML('')
			editor.removeBlocks(editor.document)
		}
	}, [watchId, open])

	return (
		<div>
			<p className="mb-2">編輯{itemLabel}</p>
			{!!dropdownButtonProps?.menu?.items?.length ? (
				<Dropdown.Button
					trigger={['click']}
					placement="bottomLeft"
					menu={{
						items: [
							{
								key: 'elementor',
								label: watchId ? (
									<a
										href={`${siteUrl}/wp-admin/post.php?post=${watchId}&action=elementor`}
										target="_blank"
										rel="noreferrer"
									>
										或 使用 Elementor 編輯器
									</a>
								) : (
									<Tooltip title="先儲存後就可以使用 Elementor 編輯了">
										或 使用 Elementor 編輯器 🚫
									</Tooltip>
								),
							},
						],
					}}
					onClick={show}
					{...dropdownButtonProps}
				>
					使用 Power 編輯器
				</Dropdown.Button>
			) : (
				<Button type="default" onClick={show}>
					使用 Power 編輯器
				</Button>
			)}

			<Item name={name} label={itemLabel} hidden>
				<Input.TextArea rows={8} disabled />
			</Item>
			<Drawer
				{...drawerProps}
				extra={
					<div className="flex gap-x-4">
						<Button
							type="default"
							danger
							onClick={() => {
								setHTML('')
								editor.removeBlocks(editor.document)
							}}
						>
							一鍵清空內容
						</Button>
						<Button type="primary" onClick={handleConfirm}>
							確認變更
						</Button>
					</div>
				}
			>
				<Alert
					className="mb-4"
					message="注意事項"
					description={
						<ol className="pl-4">
							<li>
								確認變更只是確認內文有沒有變更，您還是需要儲存才會存進
								{itemLabel}
							</li>
							<li>可以使用 WordPress shortcode</li>
							<li>圖片在前台顯示皆為 100% ，縮小圖片並不影響前台顯示</li>
							<li>未來有新功能持續擴充</li>
						</ol>
					}
					type="warning"
					showIcon
					closable
				/>
				<Suspense
					fallback={
						<Button type="text" icon={<LoadingOutlined />}>
							Loading...
						</Button>
					}
				>
					<BlockNote {...blockNoteViewProps} />
				</Suspense>
			</Drawer>
		</div>
	)
}

export const BlockNoteDrawer = memo(BlockNoteDrawerComponent)
