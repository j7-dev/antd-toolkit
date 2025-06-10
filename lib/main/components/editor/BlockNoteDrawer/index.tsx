import { FC, useEffect, memo, useState } from 'react'
import { Button, Form, Alert, FormItemProps, ButtonProps } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useUpdate } from '@refinedev/core'
import { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'
import { useBlockNote, BlockNote, SimpleDrawer, useSimpleDrawer } from '@/main'
import { notificationProps } from '@/refine'

const { Item } = Form

type TBlockNoteDrawerProps = {
	name?: FormItemProps['name']
	resource?: string
	dataProviderName?: string
	buttonProps?: ButtonProps
}
const BlockNoteDrawerComponent: FC<TBlockNoteDrawerProps> = ({
	name = ['short_description'],
	resource = 'posts',
	dataProviderName = 'default',
	buttonProps,
}) => {
	const form = Form.useFormInstance()
	const { mutate: update, isLoading } = useUpdate({
		resource,
		dataProviderName,
		...notificationProps,
	})
	const watchId = Form.useWatch(['id'], form)

	const { blockNoteViewProps } = useBlockNote()

	const { editor } = blockNoteViewProps

	const { drawerProps, show, close } = useSimpleDrawer()
	const open = drawerProps.opacity === 1

	const handleSaveContent = async () => {
		const nameString = getNameString(name)
		const html = await getEditorHtml(editor as any)
		update(
			{
				id: watchId,
				values: {
					[nameString]: html,
				},
			},
			{
				onSuccess: () => {
					close()
				},
			},
		)
	}

	useEffect(() => {
		try {
			if (watchId && open && editor) {
				const description = form.getFieldValue(name)
				const descriptionString =
					typeof description === 'string' ? description : ''

				async function loadInitialHTML() {
					const blocks = await editor.tryParseHTMLToBlocks(descriptionString)
					editor.replaceBlocks(editor.document, blocks)
				}
				loadInitialHTML()
			}

			if (!watchId && open && editor) {
				editor.removeBlocks(editor.document)
			}
		} catch (error) {
			console.error(error)
		}
	}, [watchId, open, editor])

	const [fullWidth, setFullWidth] = useState(false)

	return (
		<>
			<Button
				icon={<ExportOutlined />}
				iconPosition="end"
				onClick={show}
				color="primary"
				variant="filled"
				{...buttonProps}
			>
				開始編輯
			</Button>

			<Item name={name} hidden />
			<SimpleDrawer
				{...drawerProps}
				closeConfirm
				title={`編輯內容`}
				footer={
					<div className="at-flex at-gap-x-4">
						<Button
							type="default"
							onClick={() => {
								setFullWidth((prev) => !prev)
							}}
						>
							{fullWidth ? '退出全螢幕編輯' : '全螢幕編輯'}
						</Button>
						<Button
							type="default"
							danger
							onClick={() => {
								editor.removeBlocks(editor.document)
							}}
						>
							一鍵清空內容
						</Button>
						<Button
							type="primary"
							onClick={handleSaveContent}
							loading={isLoading}
						>
							儲存內容
						</Button>
					</div>
				}
				fullWidth={fullWidth}
			>
				<Alert
					className="at-mb-4"
					message="注意事項"
					description={
						<ol className="at-pl-4">
							<li>可以使用 WordPress shortcode</li>
							<li>未來有新功能持續擴充</li>
						</ol>
					}
					type="warning"
					showIcon
					closable
				/>
				<BlockNote {...blockNoteViewProps} />
			</SimpleDrawer>
		</>
	)
}

function getNameString(name: string | string[]) {
	if (typeof name === 'string') {
		return name
	}
	if (Array.isArray(name)) {
		if (name.length === 1) {
			return name[0]
		}
		const [first, ...rest] = name
		return `${first}[${rest.join('][')}]`
	}
	return JSON.stringify(name)
}

export const BlockNoteDrawer = memo(BlockNoteDrawerComponent)
