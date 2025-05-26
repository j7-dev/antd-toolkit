import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNote, useBlockNote } from './index'
import { refineDecorator, ENV } from '../../../../stories'
import { MediaLibraryNotification as BunnyMediaLibraryNotification } from '../../../../refine/bunny/MediaLibraryNotification'
import { MediaLibraryNotification as WPMediaLibraryNotification } from '../../../../wp/components/general/MediaLibraryNotification'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof BlockNote> & {
	argTypes: any
} = {
	title: 'MAIN/Editor/BlockNote',
	component: BlockNote,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

const INIT: any = [
	{
		type: 'heading',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
			level: 1,
		},
		content: '標題1 Heading1',
	},
	{
		type: 'heading',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
			level: 2,
		},
		content: '標題2 Heading2',
	},
	{
		type: 'heading',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
			level: 3,
		},
		content: '標題3 Heading3',
	},
	// {
	// 	id: 'cf94c4d9-ce47-4b4a-bfeb-440b599e3d4e',
	// 	type: 'mediaLibrary',
	// 	props: {
	// 		vId: '',
	// 	},
	// 	children: [],
	// },
	{
		type: 'paragraph',
		content: '段落 Paragraph',
	},
	{
		type: 'paragraph',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		},
		content: [
			{
				type: 'text',
				text: '💯 ✅ ',
				styles: {},
			},
		],
	},
	{
		type: 'quote',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
		},
		content: [
			{
				type: 'text',
				text: '引用 Quote',
				styles: {},
			},
		],
	},
	{
		type: 'alert',
		content: '警報 Alert',
	},
	{
		type: 'bulletListItem',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		},
		content: [
			{
				type: 'text',
				text: '無序列表 bulletListItem',
				styles: {},
			},
		],
	},
	{
		type: 'bulletListItem',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		},
		content: [
			{
				type: 'text',
				text: '無序列表 bulletListItem',
				styles: {},
			},
		],
	},
	{
		type: 'numberedListItem',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		},
		content: [
			{
				type: 'text',
				text: '有序列表 numberedListItem',
				styles: {},
			},
		],
	},
	{
		type: 'numberedListItem',
		props: {
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		},
		content: [
			{
				type: 'text',
				text: '有序列表 numberedListItem',
				styles: {},
			},
		],
	},
	// {
	// 	type: 'checkListItem',
	// 	content: 'Check List Item',
	// },
	{
		type: 'table',
		content: {
			type: 'tableContent',
			rows: [
				{
					cells: ['Table Cell', 'Table Cell', 'Table Cell'],
				},
				{
					cells: ['Table Cell', 'Table Cell', 'Table Cell'],
				},
				{
					cells: ['Table Cell', 'Table Cell', 'Table Cell'],
				},
			],
		},
	},
	{
		type: 'codeBlock',
		props: {
			language: 'text',
		},
		content: [
			{
				type: 'text',
				text: '<div>程式碼區塊 CodeBlock</div>',
				styles: {},
			},
		],
	},
	{
		type: 'mediaLibrary',
		props: {
			widthValue: 30,
			widthUnit: '%',
			align: 'center',
			title: '了解',
			url: 'http://test.local/wp-content/uploads/2025/05/了解.jpg',
			fileType: 'image',
		},
	},
	{
		type: 'mediaLibrary',
		props: {
			title: 'sample-2-sample-2-2.csv',
			url: 'http://test.local/wp-content/uploads/2025/02/sample-2-sample-2-2.csv',
			fileType: 'other',
		},
	},
	{
		type: 'bunnyVideo',
		props: {
			vId: '0c2f90dd-d6a2-49be-8b72-e29ad111097a',
		},
	},

	// {
	//   type: 'file',
	// },
	// {
	//   type: 'image',
	//   props: {
	//     url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
	//     caption:
	//       'From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
	//   },
	// },

	// {
	//   type: 'video',
	//   props: {
	//     url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
	//     caption:
	//       'From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
	//   },
	// },
	// {
	//   type: 'audio',
	//   props: {
	//     url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
	//     caption:
	//       'From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
	//   },
	// },
	// {
	//   type: 'paragraph',
	// },
	// {
	//   type: 'paragraph',
	//   content: [
	//     {
	//       type: 'text',
	//       text: 'Inline Content:',
	//       styles: { bold: true },
	//     },
	//   ],
	// },
	// {
	//   type: 'paragraph',
	//   content: [
	//     {
	//       type: 'text',
	//       text: 'Styled Text',
	//       styles: {
	//         bold: true,
	//         italic: true,
	//         textColor: 'red',
	//         backgroundColor: 'blue',
	//       },
	//     },
	//     {
	//       type: 'text',
	//       text: ' ',
	//       styles: {},
	//     },
	//     {
	//       type: 'link',
	//       content: 'Link',
	//       href: 'https://www.blocknotejs.org',
	//     },
	//   ],
	// },
	// {
	//   type: 'paragraph',
	// },
]

const BlockNoteWithHooks = () => {
	const { blockNoteViewProps, blocks, html } = useBlockNote({
		options: {
			initialContent: INIT,
		} as any,
	})

	const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
		useBlockNote()
	const editor2 = blockNoteViewProps2.editor

	useEffect(() => {
		async function loadInitialHTML() {
			try {
				const blocksFromHTML = await editor2.tryParseHTMLToBlocks(html) // 解析初始 HTML 字串 [1, 2]
				// console.log('⭐ blocks:', blocks)
				// console.log('⭐ blocksFromHTML:', blocksFromHTML)
				editor2.replaceBlocks(editor2.document, blocksFromHTML)
			} catch (error) {
				console.error('Failed to parse HTML to blocks:', error)
			}
		}
		loadInitialHTML()
	}, [html])

	return (
		<>
			<div className="at-w-full at-max-w-[50rem] at-max-h-[75vh] at-overflow-x-hidden at-overflow-y-auto">
				<BlockNote {...blockNoteViewProps} />

				<hr className="at-bg-gray-200 at-w-full at-h-[1px] at-mb-6" />
				<p>數據結構</p>
				<pre className="at-my-4 at-prismjs at-bg-gray-100 at-p-4 at-rounded-md at-h-[20rem] at-overflow-y-auto">
					{JSON.stringify(blocks, null, 2)}
				</pre>
				<p> ▼ serialize HTML</p>
				<pre className="at-my-4 prismjs at-bg-gray-100 at-p-4 at-rounded-md at-whitespace-normal">
					{html}
				</pre>
				<p>
					▼ render HTML (需用 <code>.bn-container</code> 包住)
				</p>
				<div
					className="bn-editor bn-default-styles bn-container at-border at-border-solid at-border-gray-400"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p> ▼ unserialize 上方的HTML</p>
				<BlockNote {...blockNoteViewProps2} />

				{/* <pre className="at-my-4 at-prismjs at-bg-gray-100 at-p-4 at-rounded-md">
					{JSON.stringify(blocks2, null, 2)}
				</pre> */}
			</div>
		</>
	)
}

export default meta
type Story = StoryObj<typeof BlockNote>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	render: () => (
		<>
			<BlockNoteWithHooks />
			<BunnyMediaLibraryNotification />
			<WPMediaLibraryNotification />
		</>
	),
	decorators: [refineDecorator],
}

export const ParseHTML: Story = {
	name: '解析 HTML',
	args: {},
	render: () => {
		const [html, setHtml] = useState('')
		const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
			useBlockNote()

		const editor2 = blockNoteViewProps2.editor

		useEffect(() => {
			async function loadInitialHTML() {
				try {
					const blocksFromHTML = await editor2.tryParseHTMLToBlocks(html) // 解析初始 HTML 字串 [1, 2]
					// console.log('⭐ blocks:', blocks)
					// console.log('⭐ blocksFromHTML:', blocksFromHTML)
					editor2.replaceBlocks(editor2.document, blocksFromHTML)
				} catch (error) {
					console.error('Failed to parse HTML to blocks:', error)
				}
			}
			loadInitialHTML()
		}, [html])

		return (
			<>
				<p> ▼ 輸入 HTML</p>
				<Input.TextArea
					rows={10}
					value={html}
					onChange={(e) => setHtml(e.target.value)}
				/>

				<p>
					▼ render HTML (需用 <code>.bn-container</code> 包住)
				</p>
				<div
					className="bn-editor bn-default-styles bn-container at-border at-border-solid at-border-gray-400"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p> ▼ unserialize 上方的HTML</p>
				<BlockNote {...blockNoteViewProps2} />
			</>
		)
	},
	decorators: [refineDecorator],
}
