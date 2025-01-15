import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterTags } from './index'
import StoryForm from './StoryForm'

const meta: Meta<typeof FilterTags> & {
  argTypes: any
} = {
  title: '✨ REFINEDEV ✨/FilterTags',
  component: FilterTags,
  parameters: {
    status: {
      type: 'dev',
    },
    layout: 'centered',
    docs: {
      description: {
        component: `

Filter 組件的 FilterTag 顯示

與 <a href='https://refine.dev/docs/api-reference/antd/hooks/table/useTable/#searchformprops' target='_blank'>Refine \`useTable\` 的 \`searchFormProps\` 搭配使用</a>

把 \`useTable\` return 的 \`searchFormProps\` 傳入即可使用

但也可以不依賴 refine 單獨使用



				`, // 可以寫 markdown
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    form: {
      description: 'antd form instance',
    },
    keyLabelMapper: {
      description:
        'key 字串轉換函數，將 key 轉換成顯示的文字，預設為 key 本身，也可用於多語系',
    },
    valueLabelMapper: {
      description:
        'value 字串轉換函數，將 value 轉換成顯示的文字，預設為 value 本身，也可用於多語系',
    },
    booleanKeys: {
      description:
        '用來判斷哪些 search key 是 boolean，會將 value 轉換成 boolean 值',
    },
  },
}

export default meta
type Story = StoryObj<typeof FilterTags>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: '一般用法',
  render: () => <StoryForm />,
}
