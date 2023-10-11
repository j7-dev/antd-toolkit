import type { Meta, StoryObj } from "@storybook/react";

import { LoadingPage } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoadingPage> & {
  argTypes: any;
} = {
  title: "Loading/LoadingPage",
  component: LoadingPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
#### 其他款式
 - <a href="https://codepen.io/psyonline/pen/yayYWg" target="_blank">https://codepen.io/psyonline/pen/yayYWg</a>

 - <a href="https://codepen.io/jackrugile/pen/GROaam" target="_blank">https://codepen.io/jackrugile/pen/GROaam</a>

`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoadingPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const General: Story = {
  name: "一般",
  args: {},
};
