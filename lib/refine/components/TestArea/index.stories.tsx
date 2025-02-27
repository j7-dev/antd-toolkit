import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TestArea } from './index'
import TestComponent from './TestComponent'
import { refineDecorator } from '../../../stories'

const meta: Meta<typeof TestArea> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/TestArea',
	component: TestArea,
	parameters: {
		status: {
			type: 'dev',
		},
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

export default meta
type Story = StoryObj<typeof TestArea>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => <TestComponent />,
	decorators: [
		refineDecorator,
	],
}
