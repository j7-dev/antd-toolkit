import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MediaLibraryModal } from './index'
import { MediaLibraryNotification } from '../MediaLibraryNotification'
import { refineDecorator } from '../../../../stories'
import { useMediaLibraryModal } from './hooks'
import { Button } from 'antd'

const meta: Meta<typeof MediaLibraryModal> & {
	argTypes: any
} = {
	title: 'WordPress/組件/MediaLibraryModal',
	component: MediaLibraryModal,
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
type Story = StoryObj<typeof MediaLibraryModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		const { show, close, modalProps, ...mediaLibraryProps } =
			useMediaLibraryModal({
				initItems: [
					{
						id: '3222',
						url: 'http://test.local/wp-content/uploads/2024/11/0e7331f3-30b6-49ab-a0ab-fffd23383685-image.png',
					},
				],
			})

		return (
			<>
				<Button type="primary" onClick={show}>
					顯示
				</Button>
				<MediaLibraryModal
					modalProps={modalProps}
					mediaLibraryProps={{
						...mediaLibraryProps,
						limit: 3,
					}}
				/>
				<MediaLibraryNotification />
			</>
		)
	},
	decorators: [refineDecorator],
}
