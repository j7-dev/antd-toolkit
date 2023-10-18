import type { Meta, StoryObj } from "@storybook/react";
import { ObjectTable } from "./index";
import { Form } from "antd";

const meta: Meta<typeof ObjectTable> & {
  argTypes: any;
} = {
  title: "表格/ObjectTable ⛏️⛏️⛏️ WIP",
  component: ObjectTable,
  parameters: {
    status: {
      type: "dev",
    },
    layout: "centered",
    docs: {
      description: {
        component: `

傳入一個 \`object\` 顯示 key value 的表格

\`record\` 可以傳入任意的 \`object\` ，會自動轉換處理，但如果 value 是 \`object\` 或是複雜 \`array\` 的話，會被過濾掉，不會顯示

如果你的物件有深層的 \`object\` 或是複雜的 \`array\` ，可以自己傳入 \`columns\` 來自定義 \`render\` function，


#### 未來優化:

🔲 可以加入 \`editing\` 狀態，可以編輯 value 的值



				`, // 可以寫 markdown
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    record: {
      description: "任意 key value 的物件",
    },
    isEditing: {
      description: "是否為編輯模式",
    },
    columns: {
      description: "自定義 column 顯示，API 跟 antd 的 Table 相比略為簡化",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ObjectTable>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const record = {
  name: "John",
  age: 18,
  address: "test address",
  interests: ["basketball", "football", "movie", "dance", "sing"],
  isMale: true,
  isFemale: false,
  orders: [
    {
      orderId: "#1",
      items: "item1",
    },
    {
      orderId: "#2",
      items: "item2",
    },
  ],
};

export const General: Story = {
  name: "一般用法",
  args: {
    record,
  },
};

export const Editing: Story = {
  name: "編輯模式",
  args: {
    record,
    editable: true,
  },
  decorators: [
    (Story) => (
      <Form>
        <Story />
      </Form>
    ),
  ],
};
