import { FC, useEffect, Suspense, memo } from 'react'
import {
	Button,
	Form,
	Drawer,
	Input,
	Alert,
	Dropdown,
	Tooltip,
	FormItemProps,
} from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown/dropdown-button'
import { LoadingOutlined } from '@ant-design/icons'
import { useBlockNoteDrawer } from './useBlockNoteDrawer'
import { useBlockNote } from '@/main'
import { TUseBlockNoteParams } from '@/main/components/editor/BlockNote/types'
import { PluginProvider, BlockNote } from '@/main'

const { Item } = Form

type TBlockNoteDrawerProps = {
	formItemProps?: FormItemProps
	dropdownButtonProps?: DropdownButtonProps
	useBlockNoteParams: TUseBlockNoteParams
}

const BlockNoteDrawerComponent: FC<TBlockNoteDrawerProps> = ({
	formItemProps = { name: ['description'], label: '' },
	dropdownButtonProps,
	useBlockNoteParams,
}) => {
	const { name, label } = formItemProps
	const { SITE_URL = '' } = PluginProvider.usePlugin()
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)
	const { blockNoteViewProps, html, setHTML } = useBlockNote(useBlockNoteParams)
	const { editor } = blockNoteViewProps

	const { drawerProps, show, close, open } = useBlockNoteDrawer()

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

	const parsedDropdownButtonProps: DropdownButtonProps = {
		trigger: ['click'],
		placement: 'bottomLeft',
		menu: {
			items: [
				{
					key: 'elementor',
					label: watchId ? (
						<a
							href={`${SITE_URL}/wp-admin/post.php?post=${watchId}&action=elementor`}
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
		},
		onClick: show,
		...dropdownButtonProps,
	}

	return (
		<div>
			<p className="mb-2">編輯{label}</p>
			{!!parsedDropdownButtonProps?.menu?.items?.length ? (
				<Dropdown.Button {...parsedDropdownButtonProps}>
					使用 Power 編輯器
				</Dropdown.Button>
			) : (
				<Button type="default" onClick={show}>
					使用 Power 編輯器
				</Button>
			)}

			<Item hidden {...formItemProps}>
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
								{label}
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
