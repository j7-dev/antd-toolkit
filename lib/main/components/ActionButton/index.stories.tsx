import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ActionButton } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ActionButton> & {
	argTypes: any
} = {
	title: 'MAIN/表單控件/ActionButton',
	component: ActionButton,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示 \`編輯\` / \`儲存\` / \`取消\` / \`刪除\` 功能的按鈕

推薦向右對齊，維持畫面一致性不會跳動
        				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		canDelete: {
			description: '是否顯示刪除按鈕',
		},
		buttonProps: {
			description:
				"同 <a href='https://ant.design/components/button-cn#api' target='_blank'>antd Button props</a>",
		},
		onDelete: {
			description: '按下刪除後的回調',
		},
		onSave: {
			description: '按下儲存後的回調',
		},
		onEdit: {
			description: '按下編輯後的回調',
		},
		onCancel: {
			description: '按下取消後的回調',
		},
	},
	decorators: [
		(Story) => (
			<div className="at-flex at-justify-end at-w-[300px]">
				<Story />
			</div>
		),
	],
}

export default meta
type Story = StoryObj<typeof ActionButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
}

export const TextOnlyRound: Story = {
	name: '文字 & 圓角',
	args: {
		type: 'text',
		buttonProps: {
			shape: 'round',
		},
	},
}

export const IconOnlyCircle: Story = {
	name: 'icon & 圓形',
	args: {
		type: 'icon',
		buttonProps: {
			shape: 'circle',
		},
	},
}

export const CanNotDelete: Story = {
	name: '不能刪除',
	args: {
		canDelete: false,
	},
}
