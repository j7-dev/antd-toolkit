import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "./index";
import dayjs from "dayjs";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Countdown> & {
  argTypes: any;
} = {
  title: "常用/Countdown",
  component: Countdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `

倒數計時組件

#### 未來優化:

🔲 不同 style 選擇


				`, // 可以寫 markdown
      },
      toc: false,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    width: { control: { type: "range", min: 400, max: 1200, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Countdown>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const AverageWidth: Story = {
  name: "一般用法",
  args: {
    toTime: dayjs().endOf("day"),
    title: <p className="text-xl text-center font-bold">距離晚上 12 點還有</p>,
    width: 800,
    className: "",
  },
};
export const AutoWidth: Story = {
  name: "錯誤處理，型別錯誤",
  args: {
    toTime: "2025-12-12",
    title: "距離晚上 12 點還有",
    width: 600,
    className: "",
  },
};
