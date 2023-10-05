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
  args: {
    enabled: false,
  },
};
export const WithTooltips: Story = {
  args: {
    enabled: true,
    tooltipProps: {
      enabled: true,
      title: "啟用狀態",
    },
  },
};

export const CustomClassname: Story = {
  args: {
    enabled: true,
    tooltipProps: {
      enabled: true,
      title: "啟用狀態",
    },
    className: "rounded-none h-8 w-8",
  },
};
