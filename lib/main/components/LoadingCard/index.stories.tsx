import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { LoadingCard } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof LoadingCard> & {
	argTypes: any
} = {
	title: 'MAIN/Loading/LoadingCard',
	component: LoadingCard,
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

export default meta
type Story = StoryObj<typeof LoadingCard>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般標題',
	args: {
		children: 'LOADING...',
	},
	decorators: [
		(Story) => (
			<div className="at-w-[10rem]">
				<Story />
			</div>
		),
	],
}
