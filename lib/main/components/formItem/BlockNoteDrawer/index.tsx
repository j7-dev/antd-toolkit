import { FC, useEffect, memo } from 'react'
import {
	Button,
	Form,
	Drawer,
	Input,
	Dropdown,
	Tooltip,
	FormItemProps,
	FormInstance,
} from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown/dropdown-button'
import { useBlockNoteDrawer } from './useBlockNoteDrawer'
import { useBlockNote } from '@/main'
import { TUseBlockNoteParams } from '@/main/components/editor/BlockNote/types'
import { useEnv, BlockNote } from '@/main'

const { Item } = Form

type TBlockNoteDrawerProps = {
	// form: FormInstance
	formItemProps?: FormItemProps
	dropdownButtonProps?: DropdownButtonProps
	useBlockNoteParams: TUseBlockNoteParams
	renderBefore?: React.ReactNode
	renderAfter?: React.ReactNode
}

const BlockNoteDrawerComponent: FC<TBlockNoteDrawerProps> = ({
	// form,
	formItemProps = { name: ['description'], label: '' },
	dropdownButtonProps,
	useBlockNoteParams,
	renderBefore,
	renderAfter,
}) => {
	const { name, label } = formItemProps
	const { SITE_URL = '' } = useEnv()
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)
	const { blockNoteViewProps, html, setHTML } = useBlockNote(useBlockNoteParams)
	const { editor } = blockNoteViewProps

	const { drawerProps, show, close, open } = useBlockNoteDrawer()

	const handleConfirm = () => {
		form.setFieldValue(name, html)
		// TEST
		console.log('⭐ handleConfirm setFieldValue:', html)
		close()
	}

	useEffect(() => {
		console.log('⭐  form:', form)
		if (watchId && open && form) {
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
	}, [watchId, open, form])

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
				{renderBefore ? renderBefore : null}
				<BlockNote {...blockNoteViewProps} />
				{renderAfter ? renderAfter : null}
			</Drawer>
		</div>
	)
}

export const BlockNoteDrawer = memo(BlockNoteDrawerComponent)
