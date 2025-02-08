import type { Meta, StoryObj } from '@storybook/react'
import { DateTime } from './index'
import dayjs from 'dayjs'

const meta: Meta<typeof DateTime> & {
	argTypes: any
} = {
	title: 'MAIN/常用/DateTime',
	component: DateTime,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `

因為顯示 日期 + 時間 長度太長了，這樣更為簡潔

可以透過傳入 \`dateProps\` 與 \`timeProps\` 來自訂 icon 與 format，型別如下

\`\`\`typescript
type TDateProps = {
  icon?: React.ReactNode;
  format?: string; // ex: "YYYY-MM-DD"
};
\`\`\`

#### 未來優化:

🔲 不同 style 選擇


				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		date: {
			description: '毫秒數字，共 13 位',
		},
	},
}

export default meta
type Story = StoryObj<typeof DateTime>

export const General: Story = {
	name: '一般用法',
	args: {
		date: dayjs().endOf('day').valueOf(),
		className: '',
	},
}

export const Flex: Story = {
	name: 'Flex 水平布局',
	args: {
		date: dayjs().endOf('day').valueOf(),
		className: 'at-flex at-gap-x-4',
	},
}

export const Small: Story = {
	name: '不同尺寸 & 自訂顏色',
	args: {
		date: dayjs().endOf('day').valueOf(),
		className: 'at-text-base at-text-gray-500',
	},
}

export const HideTime: Story = {
	name: '隱藏時間',
	args: {
		date: dayjs().endOf('day').valueOf(),
		className: 'at-text-xs at-text-gray-500',
		hideTime: true,
	},
}

export const Error: Story = {
	name: '錯誤處理，型別錯誤',
	args: {
		date: 123,
	},
}
