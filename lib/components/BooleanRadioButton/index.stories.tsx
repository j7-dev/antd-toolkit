import type { Meta, StoryObj } from "@storybook/react";
import { BooleanRadioButton } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BooleanRadioButton> & {
  argTypes: any;
} = {
  title: "表單控件/BooleanRadioButton",
  component: BooleanRadioButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `

通常用於 Filter 組件表單，可以搜尋 ALL / TRUE / FALSE

如果選擇 ALL， \`form.getFieldValue()\` 時會回傳 undefined



				`, // 可以寫 markdown
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    formItemProps: {
      description:
        "<a href='https://ant.design/components/form-cn#formitem' target='_blank'>antd Form.Item props</a>",
    },
    averageWidth: {
      description: "是否平均寬度，否寬度為 auto",
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BooleanRadioButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const AverageWidth: Story = {
  name: "平均寬度",
  args: {
    formItemProps: {
      className: "w-40",
    },
  },
};
export const AutoWidth: Story = {
  name: "自動寬度",
  args: {
    formItemProps: {
      className: "w-40",
    },
    averageWidth: false,
  },
};
