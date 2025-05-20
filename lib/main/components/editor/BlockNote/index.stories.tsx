import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNote, useBlockNote } from './index'
import { refineDecorator, ENV } from '../../../../stories'

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
		content: '一般文字',
	},
	{
		type: 'alert',
		content: 'Welcome to this demo!',
	},
	{
		type: 'paragraph',
		content: [
			{
				type: 'text',
				text: 'Blocks:',
				styles: { bold: true },
			},
		],
	},
	{
		type: 'paragraph',
		content: 'Paragraph',
	},
	{
		type: 'heading',
		content: 'Heading',
	},
	{
		type: 'bulletListItem',
		content: 'Bullet List Item',
	},
	{
		type: 'numberedListItem',
		content: 'Numbered List Item',
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
		apiConfig: {
			apiEndpoint: ENV.UPLOAD_API,
			headers: new Headers({
				Authorization: 'Basic ' + btoa(ENV.USERNAME + ':' + ENV.PASSWORD),
			}),
		},
	})

	const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
		useBlockNote({
			options: {} as any,
			apiConfig: {
				apiEndpoint: ENV.UPLOAD_API,
				headers: new Headers({
					Authorization: 'Basic ' + btoa(ENV.USERNAME + ':' + ENV.PASSWORD),
				}),
			},
		})
	const editor2 = blockNoteViewProps2.editor

	useEffect(() => {
		let isMounted = true

		async function loadInitialHTML() {
			try {
				const blocksFromHTML = await editor2.tryParseHTMLToBlocks(html)
				if (isMounted) {
					editor2.replaceBlocks(editor2.document, blocksFromHTML)
				}
			} catch (error) {
				console.error('Failed to parse HTML to blocks:', error)
			}
		}

		loadInitialHTML()

		return () => {
			isMounted = false
		}
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
				<p>serialize HTML</p>
				<pre className="at-my-4 prismjs at-bg-gray-100 at-p-4 at-rounded-md at-whitespace-normal">
					{html}
				</pre>
				<p>
					render HTML (需用 <code>.bn-container</code> 包住)
				</p>
				<div
					className="bn-editor bn-default-styles bn-container at-border at-border-solid at-border-gray-400"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p>unserialize 上方的HTML</p>
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
		</>
	),
	decorators: [refineDecorator],
}
