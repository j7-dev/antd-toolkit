import type { Meta, StoryObj } from "@storybook/react";

import { EditorJs } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditorJs> & {
  argTypes: any;
} = {
  title: "編輯器/EditorJs",
  component: EditorJs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `


				`, // 可以寫 markdown
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof EditorJs>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithoutSymbol: Story = {
  name: "一般用法",
  args: {

  },
};
