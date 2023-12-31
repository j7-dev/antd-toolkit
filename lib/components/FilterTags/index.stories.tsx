import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterTags } from "./index";
import StoryForm from "./StoryForm";

const meta: Meta<typeof FilterTags> & {
  argTypes: any;
} = {
  title: "表單控件/REFINEDEV✨/FilterTags",
  component: FilterTags,
  parameters: {
    status: {
      type: "dev",
    },
    layout: "centered",
    docs: {
      description: {
        component: `

Filter 組件的 FilterTag 顯示

與 <a href='https://refine.dev/docs/api-reference/antd/hooks/table/useTable/#searchformprops' target='_blank'>Refine \`useTable\` 的 \`searchFormProps\` 搭配使用</a>

把 \`useTable\` return 的 \`searchFormProps\` 傳入即可使用



				`, // 可以寫 markdown
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    formItemProps: {
      description:
        "<a href='https://ant.design/components/form-cn#formitem' target='_blank'>antd Form.Item props</a>",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterTags>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: "一般用法",
  render: () => <StoryForm />,
};
