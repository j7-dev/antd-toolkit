import { FC, useEffect, memo, useState } from 'react'
import { Button, Form, Alert, message, FormItemProps, ButtonProps } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useUpdate } from '@refinedev/core'
import { getEditorHtml } from '@/main/components/editor/BlockNote/utils/parse'
import {
	preTransformLegacyHtml,
	detectContentLoss,
} from '@/main/components/editor/BlockNote/utils/legacyHtml'
import { useBlockNote, BlockNote, SimpleDrawer, useSimpleDrawer } from '@/main'
import { notificationProps } from '@/refine'
import { useLocale } from '@/main/components/LocaleProvider'

const { Item } = Form

type TBlockNoteDrawerProps = {
	name?: FormItemProps['name']
	resource?: string
	dataProviderName?: string
	buttonProps?: ButtonProps
	parseData?: (values: any) => any
}
const BlockNoteDrawerComponent: FC<TBlockNoteDrawerProps> = ({
	name = ['short_description'],
	resource = 'posts',
	dataProviderName = 'default',
	buttonProps,
	parseData = (values) => values,
}) => {
	const t = useLocale('EditorDrawer')
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
				{t.startEditing}
			</Button>

			<Item name={name} hidden />
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
							{fullWidth ? t.exitFullscreen : t.fullscreen}
						</Button>
						<Button
							type="default"
							danger
							onClick={() => {
								editor.removeBlocks(editor.document)
							}}
						>
							{t.clearAll}
						</Button>
						<Button
							type="primary"
							onClick={handleSaveContent}
							loading={isLoading}
						>
							{t.saveContent}
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
					message={t.notes}
					description={
						<ol className="at-pl-4">
							<li>{t.shortcodeSupport}</li>
							<li>{t.moreFeatures}</li>
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
