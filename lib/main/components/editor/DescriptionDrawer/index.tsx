import { FC, useEffect, memo, useState } from 'react'
import { Button, Form, Alert, Radio, FormItemProps, ButtonProps } from 'antd'
import { ExportOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useUpdate } from '@refinedev/core'
import { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'
import {
	useEnv,
	useBlockNote,
	BlockNote,
	SimpleDrawer,
	useSimpleDrawer,
	cn,
} from '@/main'
import { notificationProps } from '@/refine'

const { Item } = Form

type TDescriptionDrawerProps = {
	name?: FormItemProps['name']
	resource?: string
	dataProviderName?: string
	editorFormItemProps?: FormItemProps
	buttonProps?: ButtonProps
	initialEditor?: 'power-editor' | 'elementor'
	parseData?: (values: any) => any
}
const DescriptionDrawerComponent: FC<TDescriptionDrawerProps> = ({
	name = ['description'],
	resource = 'posts',
	dataProviderName = 'default',
	editorFormItemProps,
	buttonProps,
	initialEditor,
	parseData = (values) => values,
}) => {
	const { SITE_URL, ELEMENTOR_ENABLED } = useEnv()
	const form = Form.useFormInstance()
	const { mutate: update, isLoading } = useUpdate({
		resource,
		dataProviderName,
		...notificationProps,
	})
	const watchId = Form.useWatch(['id'], form) || 0
	const watchEditor = Form.useWatch(['editor'], form) || 'power-editor'
	const editorChanged =
		initialEditor === undefined ? false : initialEditor !== watchEditor

	const { blockNoteViewProps } = useBlockNote()

	const { editor } = blockNoteViewProps

	const { drawerProps, show, close } = useSimpleDrawer()
	const open = drawerProps.opacity === 1

	const handleSaveContent = async () => {
		const nameString = getNameString(name)
		const html = await getEditorHtml(editor as any)
		const rawValues = form.getFieldsValue()
		const values = parseData({
			...rawValues,
			[nameString]: html,
		})
		update(
			{
				id: watchId,
				values
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

	useEffect(() => {
		form.setFieldValue(
			['_elementor_edit_mode'],
			watchEditor === 'elementor' ? 'builder' : '',
		)
	}, [watchEditor])

	const [fullWidth, setFullWidth] = useState(false)

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
							optionType="button"
							buttonStyle="solid"
						/>
					</Item>
				</div>

				<Button
					disabled={editorChanged}
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
					{...buttonProps}
				>
					開始編輯
				</Button>

				<p
					className={cn(
						'at-text-red-500 at-text-sm at-my-2',
						editorChanged ? 'at-opacity-100' : 'at-opacity-0',
					)}
				>
					<ExclamationCircleFilled /> 切換編輯器後請務必先儲存再開始編輯
				</p>
			</div>
			<Item name={name} label={`完整介紹`} hidden />
			<Item name={['_elementor_edit_mode']} hidden />

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
