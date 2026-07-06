import { FC, useEffect, memo, useState } from 'react'
import {
	Button,
	Form,
	Alert,
	Radio,
	message,
	FormItemProps,
	ButtonProps,
} from 'antd'
import { ExportOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useUpdate } from '@refinedev/core'
import { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'
import {
	preTransformLegacyHtml,
	detectContentLoss,
} from '@/main/components/editor/BlockNote/utils/legacyHtml'
import {
	useEnv,
	useBlockNote,
	BlockNote,
	SimpleDrawer,
	useSimpleDrawer,
	cn,
} from '@/main'
import { notificationProps } from '@/refine'
import { useLocale } from '@/main/components/LocaleProvider'

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
	const t = useLocale('EditorDrawer')
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

	// 偵測到初始內容可能無法被完整解析時為 true，儲存前會再次向使用者確認
	const [lossDetected, setLossDetected] = useState(false)

	const handleSaveContent = async () => {
		// 有潛在內容遺失風險時，覆蓋原始內容前先讓使用者確認
		if (lossDetected) {
			const confirmed = window.confirm(
				'偵測到部分內容可能無法被 Power 編輯器完整解析，繼續儲存將以目前編輯器內容覆蓋原始內容。確定要繼續嗎？',
			)
			if (!confirmed) return
		}

		const nameString = getNameString(name)

		// 序列化失敗時直接中止，不打 API，避免把空字串存進去覆蓋原本內容
		let html: string
		try {
			html = await getEditorHtml(editor as any)
		} catch (error) {
			console.error('BlockNote 序列化失敗，已中止儲存:', error)
			message.error('儲存失敗:內容序列化錯誤,請重新載入編輯器後再試')
			return
		}

		const rawValues = form.getFieldsValue()
		const values = parseData({
			...rawValues,
			[nameString]: html,
		})
		update(
			{
				id: watchId,
				values,
			},
			{
				onSuccess: () => {
					// 回寫外層主表單的 hidden Form.Item，否則主表單之後儲存時
					// 會用頁面載入的舊值（常為空字串）覆蓋掉這次剛存的內容
					form.setFieldValue(name, html)
					close()
				},
			},
		)
	}

	useEffect(() => {
		if (watchId && open && editor) {
			const description = form.getFieldValue(name)
			const descriptionString =
				typeof description === 'string' ? description : ''

			const loadInitialHTML = async () => {
				// 先把傳統／頁面編輯器的裸 <img>、<iframe> 等改寫成 custom block 認得的結構
				const transformedHTML = preTransformLegacyHtml(descriptionString)
				const blocks = await editor.tryParseHTMLToBlocks(transformedHTML)
				editor.replaceBlocks(editor.document, blocks)

				// 比對解析前後的文字量與媒體數，偵測潛在內容遺失
				setLossDetected(detectContentLoss(descriptionString, blocks))
			}

			// async rejection 無法被同步 try/catch 捕捉，故用 .catch；
			// 載入失敗只記 log，不清空 editor 以免破壞既有內容
			loadInitialHTML().catch((error) => {
				console.error('BlockNote 初始內容載入失敗:', error)
			})
		}

		if (!watchId && open && editor) {
			editor.removeBlocks(editor.document)
			setLossDetected(false)
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
						label={t.editContent}
						tooltip={getTooltipTitle(ELEMENTOR_ENABLED)}
						{...editorFormItemProps}
					>
						<Radio.Group
							block
							options={[
								{
									label: t.powerEditor,
									value: 'power-editor',
								},
								{
									label: t.elementorEditor,
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
					{t.startEditing}
				</Button>

				<p
					className={cn(
						'at-text-red-500 at-text-sm at-my-2',
						editorChanged ? 'at-opacity-100' : 'at-opacity-0',
					)}
				>
					<ExclamationCircleFilled /> {t.switchEditorWarning}
				</p>
			</div>
			<Item name={name} label={t.fullIntro} hidden />
			<Item name={['_elementor_edit_mode']} hidden />

			<SimpleDrawer
				{...drawerProps}
				closeConfirm
				title={t.editContent}
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
				{lossDetected && (
					<Alert
						className="at-mb-4"
						message="內容相容性警告"
						description="偵測到部分內容可能無法被 Power 編輯器完整解析（可能包含來自傳統編輯器或頁面編輯器的元素），繼續儲存將以目前編輯器內容覆蓋原始內容。"
						type="warning"
						showIcon
					/>
				)}
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
