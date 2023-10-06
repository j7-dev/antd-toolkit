import type { Meta, StoryObj } from "@storybook/react";
import { BooleanIndicator } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BooleanIndicator> & {
  argTypes: any;
} = {
  title: "常用/BooleanIndicator",
  component: BooleanIndicator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `

簡單傳入一個 true / false 的值，就可以顯示對應的圖示

tooltipProps 用法可以參考 <a href="https://ant.design/components/tooltip-cn#api" target="_blank">antd</a>


				`, // 可以寫 markdown
      },
      toc: false,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BooleanIndicator>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

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
