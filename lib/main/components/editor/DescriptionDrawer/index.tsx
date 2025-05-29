import { FC, useEffect, memo } from 'react'
import { Button, Form, Alert, Radio, FormItemProps } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useUpdate } from '@refinedev/core'
import { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'
import {
	useEnv,
	useBlockNote,
	BlockNote,
	SimpleDrawer,
	useSimpleDrawer,
} from '@/main'
import { notificationProps } from '@/refine'

const { Item } = Form

type TDescriptionDrawerProps = {
	name?: FormItemProps['name']
	resource?: string
	editorFormItemProps?: FormItemProps
}
const DescriptionDrawerComponent: FC<TDescriptionDrawerProps> = ({
	name = ['description'],
	resource = 'posts',
	editorFormItemProps,
}) => {
	const { SITE_URL, ELEMENTOR_ENABLED } = useEnv()
	const form = Form.useFormInstance()
	const { mutate: update, isLoading } = useUpdate({
		resource,
		...notificationProps,
	})
	const watchId = Form.useWatch(['id'], form) || 0
	const watchEditor = Form.useWatch(['editor'], form) || 'power-editor'

	const { blockNoteViewProps } = useBlockNote()

	const { editor } = blockNoteViewProps

	const { drawerProps, show, close } = useSimpleDrawer()
	const open = drawerProps.opacity === 1

	const handleSaveContent = async () => {
		const nameString = getNameString(name)
		const html = await getEditorHtml(editor as any, true)
		update(
			{
				id: watchId,
				values: {
					[nameString]: `<div class="power-editor">${html}</div>`,
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

	return (
		<>
			<div className="at-max-w-[24rem]">
				<div className="at-min-h-[4.5rem]">
					<Item
						name={['editor']}
						label="編輯內容"
						tooltip={getTooltipTitle(ELEMENTOR_ENABLED)}
						{...editorFormItemProps}
					>
						<Radio.Group
							block
							options={[
								{
									label: 'Power 編輯器',
									value: 'power-editor',
								},
								{
									label: 'Elementor 編輯器',
									value: 'elementor',
									disabled: !ELEMENTOR_ENABLED,
								},
							]}
							defaultValue="power-editor"
							optionType="button"
							buttonStyle="solid"
						/>
					</Item>
				</div>

				<Button
					className="at-w-full"
					icon={<ExportOutlined />}
					iconPosition="end"
					onClick={() => {
						if ('power-editor' === watchEditor) {
							show()
							return
						}

						if ('elementor' === watchEditor) {
							window.open(
								`${SITE_URL}/wp-admin/post.php?post=${watchId}&action=elementor`,
								'_blank',
							)
						}
					}}
					color="primary"
					variant="filled"
				>
					開始編輯
				</Button>
			</div>
			<Item name={name} label={`完整介紹`} hidden />
			<SimpleDrawer
				{...drawerProps}
				closeConfirm
				title={`編輯內容`}
				footer={
					<div className="at-flex at-gap-x-4">
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

function getTooltipTitle(canElementor: boolean) {
	if (canElementor) {
		return undefined
	}
	return '您必須安裝並啟用 Elementor 外掛才可以使用 Elementor 編輯'
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

export const DescriptionDrawer = memo(DescriptionDrawerComponent)
