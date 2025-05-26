import { useState } from 'react'
import { insertOrUpdateBlock, CustomBlockConfig } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { MdCancel, MdCheckCircle, MdError, MdInfo } from 'react-icons/md'
import { schema } from '../../useBlockNote'
import { Alert as AntdAlert, Select } from 'antd'
import {
	InfoCircleFilled,
	CheckCircleFilled,
	ExclamationCircleFilled,
	CloseCircleFilled,
} from '@ant-design/icons'
import { RiAlertFill } from 'react-icons/ri'
import { isLegacy } from '@/main/components/editor/BlockNote/utils'
import { cn } from '@/main/utils'

const CONFIG: CustomBlockConfig = {
	type: 'alert',
	propSchema: {
		type: {
			default: 'info',
			values: ['warning', 'error', 'info', 'success'],
		},
	},
	content: 'inline',
}

const OPTIONS = [
	{
		label: '資訊',
		value: 'info',
	},
	{
		label: '成功',
		value: 'success',
	},
	{
		label: '警告',
		value: 'warning',
	},
	{
		label: '錯誤',
		value: 'error',
	},
]

export const alertMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
	key: CONFIG.type,
	title: 'Alert',
	subtext: '可製作醒目提醒、注意事項', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: CONFIG.type,
		})
	},
	aliases: [
		'alert',
		'notification',
		'emphasize',
		'warning',
		'error',
		'info',
		'success',
	],
	group: 'Other',
	icon: <RiAlertFill />,
})

// The types of alerts that users can choose from.
export const alertTypes = [
	{
		title: 'Warning',
		value: 'warning',
		icon: MdError,
		color: '#e69819',
		backgroundColor: {
			light: '#fff6e6',
			dark: '#805d20',
		},
	},
	{
		title: 'Error',
		value: 'error',
		icon: MdCancel,
		color: '#d80d0d',
		backgroundColor: {
			light: '#ffe6e6',
			dark: '#802020',
		},
	},
	{
		title: 'Info',
		value: 'info',
		icon: MdInfo,
		color: '#507aff',
		backgroundColor: {
			light: '#e6ebff',
			dark: '#203380',
		},
	},
	{
		title: 'Success',
		value: 'success',
		icon: MdCheckCircle,
		color: '#0bc10b',
		backgroundColor: {
			light: '#e6ffe6',
			dark: '#208020',
		},
	},
] as const

/**
 * @see https://www.blocknotejs.org/docs/custom-schemas/custom-blocks
 * 可自訂 toExternalHTML & parse
 */
export const Alert = createReactBlockSpec(CONFIG, {
	render: (props) => {
		const currentBlock = props.editor.getBlock(props.block)
		const currentBlockProps = currentBlock?.props || props.block.props

		const alertType = alertTypes.find(
			(a) => a.value === props.block.props?.type,
		)!

		const [showTool, setShowTool] = useState<boolean>(false)

		return (
			<div
				data-block-key={props.block?.type}
				data-alert-type={props.block.props?.type}
				onMouseEnter={() => setShowTool(true)}
				onMouseLeave={() => setShowTool(false)}
			>
				<AntdAlert
					className="at-w-full"
					message={<div className="bn-inline-content" ref={props.contentRef} />}
					type={currentBlockProps?.type}
					showIcon
				/>
				<div
					className={cn(
						'at-py-1 at-px-2 at-bg-gray-100 at-rounded-md at-transition-opacity at-duration-300',
						showTool ? 'at-opacity-100' : 'at-opacity-30',
					)}
				>
					<div className="at-flex at-justify-center">
						<Select
							size="small"
							defaultValue={currentBlockProps.type}
							onChange={(value) => {
								props.editor.updateBlock(props.block, {
									props: {
										...currentBlockProps,
										type: value,
									} as any,
								})
							}}
							className="at-w-24"
							options={OPTIONS}
						/>
					</div>
				</div>
			</div>
		)
	},

	// @ts-ignore
	parse: (element: HTMLElement) => {
		if (isLegacy(element)) {
			return parseLegacy(element)
		}

		// 取得節點上的 data-block-key
		const blockType = element.getAttribute('data-block-key')
		if (CONFIG.type !== blockType) return

		const type = (element.getAttribute('data-alert-type') || 'warning') as
			| 'warning'
			| 'error'
			| 'info'
			| 'success'

		return {
			type: type || 'warning',
		}
	},

	toExternalHTML: ({ block, editor, contentRef }) => {
		const alertType = block.props?.type

		return (
			<div
				data-block-key={block?.type}
				className="alert"
				data-alert-type={alertType}
			>
				<div className="alert-icon-wrapper">
					{alertType === 'info' && <InfoCircleFilled className="alert-icon" />}
					{alertType === 'warning' && (
						<ExclamationCircleFilled className="alert-icon" />
					)}
					{alertType === 'error' && (
						<CloseCircleFilled className="alert-icon" />
					)}
					{alertType === 'success' && (
						<CheckCircleFilled className="alert-icon" />
					)}
				</div>
				<div className="bn-inline-content">
					{/* @ts-ignore */}
					{block?.content?.[0]?.text || ''}
				</div>
			</div>
		)
	},
})

function parseLegacy(element: HTMLElement) {
	const contentType = element.getAttribute('data-content-type')
	if (CONFIG.type !== contentType) return

	const alertType =
		element.querySelector('.alert')?.getAttribute('data-alert-type') ||
		'warning'

	return {
		type: alertType,
	}
}
