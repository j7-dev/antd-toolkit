import type { Meta, StoryObj } from "@storybook/react";

import { Amount } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Amount> & {
  argTypes: any;
} = {
  title: "多幣別/Amount",
  component: Amount,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
快速顯示多國幣別與千分位使用

#### 未來優化:

🔲 不同國家千分位的顯示好像不同

🔲 可以新增一種是類似 justify-between 的排法，會比較整齊

				`, // 可以寫 markdown
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currency: {
      control: {
        type: "text",
      },
    },
    symbol: {
      control: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Amount>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithoutSymbol: Story = {
  name: "貨幣名稱",
  args: {
    amount: 100000,
    currency: "JPY",
    symbol: false,
  },
};

export const WithSymbol: Story = {
  name: "貨幣符號",
  args: {
    ...WithoutSymbol.args,
    symbol: true,
  },
};
