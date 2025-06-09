import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNote, useBlockNote } from './index'
import { renderHTML } from '../../../utils'
import { getEditorHtml } from './utils/parse'
import { refineDecorator } from '../../../../stories'
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
		props: {
			type: 'info',
		},
		content: [
			{
				type: 'text',
				text: 'Alert',
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
			url: 'http://test.local/wp-content/uploads/2025/06/beanie-with-logo-1.jpg',
			fileType: 'image',
		},
	},
	{
		type: 'mediaLibrary',
		props: {
			title: 'sample-2-sample-2-2.csv',
			url: 'http://test.local/wp-content/uploads/2025/02/sample-2-sample-2-2.csv',
			fileType: 'audio',
			widthValue: 30,
			widthUnit: '%',
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
	const { blockNoteViewProps, blocks } = useBlockNote({
		options: {
			initialContent: INIT,
		} as any,
	})

	const [html, setHtml] = useState<string>('')

	const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
		useBlockNote()
	const editor2 = blockNoteViewProps2.editor

	useEffect(() => {
		const delay = setTimeout(() => {
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
		}, 500)

		return () => clearTimeout(delay)
	}, [html])

	const handleGetHTML = async () => {
		const html = await getEditorHtml(blockNoteViewProps?.editor as any)
		setHtml(html)
	}

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
				<Button type="primary" onClick={handleGetHTML}>
					產生 HTML
				</Button>
				<pre className="at-my-4 prismjs at-bg-gray-100 at-p-4 at-rounded-md at-whitespace-normal">
					{html}
				</pre>
				<p>
					▼ render HTML (需用 <code>.power-editor</code> 包住)
				</p>
				<div className="bn-editor bn-default-styles power-editor at-border at-border-solid at-border-gray-400">
					{renderHTML(html)}
				</div>
				<p> ▼ unserialize 上方的HTML</p>
				{/* <BlockNote {...blockNoteViewProps2} /> */}

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

const DEFAULT_HTML_LEGACY = `<div class="bn-block-group" data-node-type="blockGroup">
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="e0011fd6-408a-4fa1-85de-570026f0859e">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="e0011fd6-408a-4fa1-85de-570026f0859e">
			<div class="bn-block-content" data-content-type="paragraph">
				<p class="bn-inline-content">123</p>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="0ab5a166-19e7-440d-ac1e-9d8582e57935">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="0ab5a166-19e7-440d-ac1e-9d8582e57935">
			<div class="bn-block-content" data-content-type="paragraph">
				<p class="bn-inline-content">456</p>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="3e8faf08-8249-4a58-bf6e-b484756ba281">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="3e8faf08-8249-4a58-bf6e-b484756ba281">
			<div class="bn-block-content" data-content-type="codeBlock">
				<pre><code class="bn-inline-content language-javascript">21212</code></pre>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="7fca5f73-072a-4105-8835-c2b746cf987c">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="7fca5f73-072a-4105-8835-c2b746cf987c">
			<div class="bn-block-content" data-content-type="customHTML" data-html="html"
				data-node-view-wrapper="" style="white-space: normal;">
				<div>html</div>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="6d15d659-7c6c-4cc7-aef5-efdb269949f9">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="6d15d659-7c6c-4cc7-aef5-efdb269949f9">
			<div class="bn-block-content" data-content-type="image"
				data-name="images?q=tbn:ANd9GcSVZNzrVO-IM0AvficLG0DBPpzuBchDMKigzQ&amp;s"
				data-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZNzrVO-IM0AvficLG0DBPpzuBchDMKigzQ&amp;s"
				data-file-block="">
				<div class="bn-file-block-content-wrapper" style="width: 512px;">
					<div class="bn-visual-media-wrapper"><img class="bn-visual-media"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZNzrVO-IM0AvficLG0DBPpzuBchDMKigzQ&amp;s"
							alt="images?q=tbn:ANd9GcSVZNzrVO-IM0AvficLG0DBPpzuBchDMKigzQ&amp;s"
							contenteditable="false" draggable="false"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="cf7bb2f3-8e1a-48fb-8e68-026a2051070f">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="cf7bb2f3-8e1a-48fb-8e68-026a2051070f">
			<div class="bn-block-content" data-content-type="file" data-name="sample-2-sample-2-2 (1).csv"
				data-url="http://test.local/wp-content/uploads/2025/05/sample-2-sample-2-2-1-1.csv"
				data-file-block="">
				<div class="bn-file-block-content-wrapper">
					<div class="bn-file-name-with-icon">
						<div class="bn-file-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								fill="currentColor">
								<path
									d="M3 8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8ZM10 4V9H5V20H19V4H10Z">
								</path>
							</svg></div>
						<p class="bn-file-name">sample-2-sample-2-2 (1).csv</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="6f341ebb-2421-4214-87ec-331277e56533">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="6f341ebb-2421-4214-87ec-331277e56533">
			<div class="bn-block-content" data-content-type="alert" data-node-view-wrapper=""
				style="white-space: normal;">
				<div class="alert" data-alert-type="warning">
					<div class="alert-icon-wrapper" contenteditable="false" aria-haspopup="menu"
						aria-expanded="false" aria-controls="mantine-bcqyujlhm-dropdown"
						id="mantine-bcqyujlhm-target"><svg stroke="currentColor" fill="currentColor"
							stroke-width="0" viewBox="0 0 24 24" class="alert-icon" data-alert-icon-type="warning"
							height="32" width="32" xmlns="http://www.w3.org/2000/svg">
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
							</path>
						</svg></div>
					<div class="bn-inline-content" data-editable="">11</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="9128bba8-679a-491c-9544-1efd923d58a6">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="9128bba8-679a-491c-9544-1efd923d58a6">
			<div class="bn-block-content" data-content-type="bunnyVideo"
				data-v-id="dcc35759-e1b3-4f09-a0dd-f5a67afa2e92" data-node-view-wrapper=""
				style="white-space: normal;"><iframe class="border-0 w-full aspect-video rounded-xl"
					src="https://iframe.mediadelivery.net/embed/244459/dcc35759-e1b3-4f09-a0dd-f5a67afa2e92?autoplay=false&amp;loop=false&amp;muted=false&amp;preload=true&amp;responsive=true"
					loading="lazy" allow="encrypted-media;picture-in-picture;" allowfullscreen=""></iframe>
			</div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="be1ff71f-95f9-4c22-b58e-028e0d220ea9">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="be1ff71f-95f9-4c22-b58e-028e0d220ea9">
			<div class="bn-block-content" data-content-type="bunnyAudio"
				data-v-id="e1989a5e-c54c-46c6-9ba5-df8fcca2ee3e" data-node-view-wrapper=""
				style="white-space: normal;"><audio id="audioPlayer"
					data-src="https://vz-da633ab8-b36.b-cdn.net/e1989a5e-c54c-46c6-9ba5-df8fcca2ee3e/playlist.m3u8"
					controls=""></audio></div>
		</div>
	</div>
	<div class="bn-block-outer" data-node-type="blockOuter"
		data-id="0af01dd3-13a5-411a-b7f0-ec2be4dca471">
		<div class="bn-block" data-node-type="blockContainer"
			data-id="0af01dd3-13a5-411a-b7f0-ec2be4dca471">
			<div class="bn-block-content" data-content-type="paragraph">
				<p class="bn-inline-content"></p>
			</div>
		</div>
	</div>
</div>`

export const ParseHTMLLegacy: Story = {
	name: '解析舊版 BlockNote 的 HTML',
	args: {},
	render: () => {
		const [html, setHtml] = useState(DEFAULT_HTML_LEGACY)
		const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
			useBlockNote()

		const editor2 = blockNoteViewProps2.editor

		useEffect(() => {
			async function loadInitialHTML() {
				try {
					const blocksFromHTML = await editor2.tryParseHTMLToBlocks(html) // 解析初始 HTML 字串 [1, 2]
					// console.log('⭐ blocks:', blocks)
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
					▼ render HTML (需用 <code>.power-editor</code> 包住)
				</p>
				<div
					className="bn-editor bn-default-styles power-editor at-border at-border-solid at-border-gray-400"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p> ▼ unserialize 上方的HTML</p>
				<BlockNote {...blockNoteViewProps2} />
			</>
		)
	},
	decorators: [refineDecorator],
}

const DEFAULT_HTML = `<div class="power-editor"><p>d060502030301PP</p><p>&nbsp;</p><p>&nbsp;</p><p></p><p>1501050</p><p>AAA</p><div data-block-key="mediaLibrary" data-url="https://test.local/wp-content/uploads/2025/05/頗機八.jpg" data-width-value="1024" data-width-unit="px" data-align="start" data-link="" data-target="_self" data-alt="頗機八" data-title="頗機八" data-caption="" data-file-type="image" style="display: flex; width: 100%; flex-direction: column; justify-content: center; align-items: start;"><img alt="頗機八" title="頗機八" style="width: 1024px; max-width: 100%;" src="https://test.local/wp-content/uploads/2025/05/頗機八.jpg"></div><p>BBB</p><div data-block-key="mediaLibrary" data-url="http://test.local/wp-content/uploads/2025/03/壹碳學院_碳管理人才實戰班_階段二作業.pdf" data-width-value="100" data-width-unit="%" data-align="start" data-link="" data-target="_self" data-alt="" data-title="壹碳學院_碳管理人才實戰班_階段二作業.pdf" data-caption="" data-file-type="other" style="display: flex; width: 100%; flex-direction: column; justify-content: center; align-items: start;"><div style="display: flex; align-items: center; column-gap: 0.5rem;"><svg class="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill="#E2E5E7" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"></path> <path fill="#B0B7BD" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"></path> <polygon fill="#CAD1D8" points="480,224 384,128 480,128 "></polygon> <path fill="#F15642" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16 V416z"></path> <g> <path fill="#FFFFFF" d="M101.744,303.152c0-4.224,3.328-8.832,8.688-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48 c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.688-3.184-8.688-8.816V303.152z M118.624,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504c0-8.944-6.784-16.368-15.36-16.368H118.624z"></path> <path fill="#FFFFFF" d="M196.656,384c-4.224,0-8.832-2.304-8.832-7.92v-72.672c0-4.592,4.608-7.936,8.832-7.936h29.296 c58.464,0,57.184,88.528,1.152,88.528H196.656z M204.72,311.088V368.4h21.232c34.544,0,36.08-57.312,0-57.312H204.72z"></path> <path fill="#FFFFFF" d="M303.872,312.112v20.336h32.624c4.608,0,9.216,4.608,9.216,9.072c0,4.224-4.608,7.68-9.216,7.68 h-32.624v26.864c0,4.48-3.184,7.92-7.664,7.92c-5.632,0-9.072-3.44-9.072-7.92v-72.672c0-4.592,3.456-7.936,9.072-7.936h44.912 c5.632,0,8.96,3.344,8.96,7.936c0,4.096-3.328,8.704-8.96,8.704h-37.248V312.112z"></path> </g> <path fill="#CAD1D8" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"></path> </g></svg><a href="http://test.local/wp-content/uploads/2025/03/壹碳學院_碳管理人才實戰班_階段二作業.pdf" target="_self" rel="noopener noreferrer" style="display: contents; font-size: 0.875rem;">壹碳學院_碳管理人才實戰班_階段二作業.pdf</a></div></div><p>22200303</p><div data-block-key="bunnyVideo" data-width-value="100" data-width-unit="%" data-align="start" data-player="video" data-aspect-ratio="1.7778" data-v-id="1b8985b8-f083-4bce-9a81-e020c50d0e22" style="display: flex; width: 100%; flex-direction: column; justify-content: center; align-items: start;"><iframe style="border: medium; outline: none; border-radius: 0.75rem; width: 100%; max-width: 100%; aspect-ratio: 1.7778 / 1;" src="https://iframe.mediadelivery.net/embed/279801/1b8985b8-f083-4bce-9a81-e020c50d0e22?autoplay=false&amp;loop=false&amp;muted=false&amp;preload=true&amp;responsive=true" loading="lazy" allow="encrypted-media;picture-in-picture;" allowfullscreen=""></iframe></div><p></p></div>`

export const ParseHTML: Story = {
	name: '解析 HTML',
	args: {},
	render: () => {
		const [html, setHtml] = useState(DEFAULT_HTML)
		const { blockNoteViewProps: blockNoteViewProps2, blocks: blocks2 } =
			useBlockNote()

		const editor2 = blockNoteViewProps2.editor

		useEffect(() => {
			async function loadInitialHTML() {
				try {
					const blocksFromHTML = await editor2.tryParseHTMLToBlocks(html) // 解析初始 HTML 字串 [1, 2]
					console.log('⭐ blocksFromHTML:', blocksFromHTML)
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
					▼ render HTML (需用 <code>.power-editor</code> 包住)
				</p>
				<div
					className="bn-editor bn-default-styles power-editor at-border at-border-solid at-border-gray-400"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p> ▼ unserialize 上方的HTML</p>
				<BlockNote {...blockNoteViewProps2} />
			</>
		)
	},
	decorators: [refineDecorator],
}
