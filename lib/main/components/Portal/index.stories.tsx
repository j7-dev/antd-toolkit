import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Portal } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Portal> & {
	argTypes: any
} = {
	title: 'MAIN/常用/Portal',
	component: Portal,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
被 \`\<Portal\>\` 包起來的元件，預設會被渲染到 \`document\.body\` 上


				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof Portal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {},
	render: (args) => (
		<Portal>
			<div
				style={{
					backgroundColor: 'red',
					width: '100px',
					height: '100px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: 'auto',
				}}
			>
				123
			</div>
		</Portal>
	),
}
