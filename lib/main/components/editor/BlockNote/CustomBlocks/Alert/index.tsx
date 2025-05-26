import {
	defaultProps,
	insertOrUpdateBlock,
	CustomBlockConfig,
} from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { Menu } from '@mantine/core'
import { MdCancel, MdCheckCircle, MdError, MdInfo } from 'react-icons/md'
import { schema } from '../../useBlockNote'
import { RiAlertFill } from 'react-icons/ri'
import { isLegacy } from '@/main/components/editor/BlockNote/utils'

const CONFIG: CustomBlockConfig = {
	type: 'alert',
	propSchema: {
		textAlignment: defaultProps.textAlignment,
		textColor: defaultProps.textColor,
		type: {
			default: 'warning',
			values: ['warning', 'error', 'info', 'success'],
		},
	},
	content: 'inline',
}

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
		const alertType = alertTypes.find(
			(a) => a.value === props.block.props?.type,
		)!
		const Icon = alertType.icon
		return (
			<div
				className={'alert'}
				data-block-key={props.block?.type}
				data-alert-type={props.block.props?.type}
			>
				{/*Icon which opens a menu to choose the Alert type*/}
				<Menu withinPortal={false} zIndex={999999}>
					<Menu.Target>
						<div className={'alert-icon-wrapper'} contentEditable={false}>
							<Icon
								className={'alert-icon'}
								data-alert-icon-type={props.block.props?.type}
								size={32}
							/>
						</div>
					</Menu.Target>
					{/*Dropdown to change the Alert type*/}
					<Menu.Dropdown>
						<Menu.Label>Alert Type</Menu.Label>
						<Menu.Divider />
						{alertTypes.map((type) => {
							const ItemIcon = type.icon

							return (
								<Menu.Item
									key={type.value}
									leftSection={
										<ItemIcon
											className={'alert-icon'}
											data-alert-icon-type={type.value}
										/>
									}
									onClick={() =>
										props.editor.updateBlock(props.block, {
											type: 'alert',
											// @ts-ignore
											props: { type: type.value },
										})
									}
								>
									{type.title}
								</Menu.Item>
							)
						})}
					</Menu.Dropdown>
				</Menu>
				{/*Rich text field for user to type in className 必須是 bn-inline-content*/}
				<div className="bn-inline-content" ref={props.contentRef} />
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
