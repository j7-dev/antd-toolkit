import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DoubleConfirmSwitch } from "./index";
import { Form } from "antd";

const meta: Meta<typeof DoubleConfirmSwitch> & {
  argTypes: any;
} = {
  title: "表單控件/DoubleConfirmSwitch",
  component: DoubleConfirmSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

加強版 Switch 組件，整合 Tooltip 顯示以及確認提問

可以依照需求自己加入回調函數

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
    popconfirmProps: {
      description:
        "<a href='https://ant.design/components/popconfirm-cn#api' target='_blank'>antd Popconfirm props</a>",
    },
    tooltipProps: {
      description:
        "<a href='https://ant.design/components/tooltip-cn' target='_blank'>antd Tooltip props</a>",
    },
    switchProps: {
      description:
        "<a href='https://ant.design/components/switch-cn' target='_blank'>antd Switch props</a>",
    },
    onClick: {
      description: "點擊後的回調函數",
      control: false,
    },
    onConfirm: {
      description: "確認後的回調函數",
      control: false,
    },
    onCancel: {
      description: "取消後的回調函數",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DoubleConfirmSwitch>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  name: "一般用法",
  args: {
    fromItemProps: {
      name: "isActivated",
    },
  },

  render: (args) => (
    <Form>
      <DoubleConfirmSwitch {...args} />
    </Form>
  ),
};
