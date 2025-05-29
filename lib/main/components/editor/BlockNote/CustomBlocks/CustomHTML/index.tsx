import {
	defaultProps,
	insertOrUpdateBlock,
	CustomBlockConfig,
} from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { schema } from '../../useBlockNote'
import { ImEmbed2 } from 'react-icons/im'
import { renderHTML } from '@/main'

const CONFIG: CustomBlockConfig = {
	type: 'customHTML',
	propSchema: {
		html: {
			default: '',
		},
	},
	content: 'none',
}

export const customHTMLMenuItem = (editor: typeof schema.BlockNoteEditor) => ({
	key: CONFIG.type,
	title: '自訂 HTML', // 選單中文
	subtext: '支援 HTML、CSS、JavaScript、iframe 等...', // 說明文字
	onItemClick: () => {
		insertOrUpdateBlock(editor, {
			type: CONFIG.type,
		})
	},
	aliases: ['html'],
	group: 'Advanced',
	icon: <ImEmbed2 className="at-size-[1.125rem]" />,
})

export const CustomHTML = createReactBlockSpec(CONFIG, {
	render: (props) => {
		const value = props.block.props.html

		return (
			<div
				data-block-key={props.block?.type}
				className={'at-w-full'}
				style={{
					contain: 'layout paint paint',
				}}
			>
				<textarea
					className="at-w-full at-rounded-sm at-outline-none at-border-2 at-border-solid at-border-gray-100 at-bg-gray-100 at-p-2 at-whitespace-pre-wrap"
					rows={10}
					onChange={(e) => {
						props.editor.updateBlock(props.block, {
							type: 'customHTML',
							props: { html: e.target.value as any },
						})
					}}
					value={value}
				/>
			</div>
		)
	},

	// ❗parse 是例如，將剪貼簿複製到編輯器時，要怎麼解析 HTML 轉換為 BLOCK
	// @ts-ignore
	parse: (element: HTMLElement) => {
		// 取得節點上的 data-block-key
		const blockType = element.getAttribute('data-block-key')
		if (CONFIG.type !== blockType) return
		// 找 element 底下一層的 div
		const childDiv = element.querySelector(':scope > div')
		if (!childDiv) {
			return {
				html: element.innerHTML,
			}
		}
		const innerHTML = childDiv.innerHTML
		return {
			html: innerHTML,
		}
	},

	// ❗toExternalHTML 是例如，將區塊複製到剪貼簿到外部時，會複製的 內容，如果沒有定義就使用 render
	toExternalHTML: ({ block }) => {
		const value = block?.props?.html
		return <div data-block-key={block?.type}>{renderHTML(value, true)}</div>
	},
})
