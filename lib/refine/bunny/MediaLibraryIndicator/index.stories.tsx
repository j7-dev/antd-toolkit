import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibraryIndicator } from './index'
import { Refine } from '@refinedev/core'
import { bunnyStreamDataProvider, dataProvider } from '../../dataProvider'
import { BunnyProvider } from '../BunnyProvider'
import axios from 'axios'
import { refineDecorator } from '../../../stories'

const meta: Meta<typeof MediaLibraryIndicator> & {
	argTypes: any
} = {
	title: '✨ REFINEDEV ✨/MediaLibraryIndicator',
	component: MediaLibraryIndicator,
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
type Story = StoryObj<typeof MediaLibraryIndicator>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		return <MediaLibraryIndicator />
	},
	decorators: [refineDecorator],
}
