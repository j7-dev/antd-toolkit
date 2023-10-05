import type { Meta, StoryObj } from "@storybook/react";
import { BooleanIndicator } from "./index";
declare const meta: Meta<typeof BooleanIndicator> & {
    argTypes: any;
};
export default meta;
type Story = StoryObj<typeof BooleanIndicator>;
export declare const WithoutTooltips: Story;
export declare const WithTooltips: Story;
export declare const CustomClassname: Story;
