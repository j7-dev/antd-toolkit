import type { Meta, StoryObj } from "@storybook/react";
import { BooleanIndicator } from "./index";

const meta: Meta<typeof BooleanIndicator> & {
  argTypes: any;
} = {
  title: "常用/BooleanIndicator",
  component: BooleanIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

簡單傳入一個 true / false 的值，就可以顯示對應的圖示

\`tooltipProps\` 用法可以參考 <a href="https://ant.design/components/tooltip-cn#api" target="_blank">antd</a>


				`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tooltipProps: {
      description: "antd Tooltip props",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BooleanIndicator>;

export const WithoutTooltips: Story = {
  name: "無提示",
  args: {
    enabled: false,
  },
};
export const WithTooltips: Story = {
  name: "有提示",
  args: {
    enabled: true,
    tooltipProps: {
      enabled: true,
      title: "啟用狀態",
    },
  },
};

export const CustomClassname: Story = {
  name: "自訂 className",
  args: {
    enabled: true,
    tooltipProps: {
      enabled: true,
      title: "啟用狀態",
    },
    className: "rounded-none h-8 w-8",
  },
};
