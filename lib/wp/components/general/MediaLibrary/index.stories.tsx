import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibrary } from './index'
import { refineDecorator } from '../../../../stories'
import { TAttachment } from './types'

const meta: Meta<typeof MediaLibrary> & {
	argTypes: any
} = {
	title: 'WordPress/組件/MediaLibrary',
	component: MediaLibrary,
	parameters: {
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
type Story = StoryObj<typeof MediaLibrary>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		const [selectedItems, setSelectedItems] = useState<TAttachment[]>([])

		return (
			<>
				<MediaLibrary
					selectedItems={selectedItems}
					setSelectedItems={setSelectedItems}
				/>
			</>
		)
	},
	decorators: [refineDecorator],
}
