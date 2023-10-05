import type { Meta, StoryObj } from "@storybook/react";
import { Amount } from "./index";
declare const meta: Meta<typeof Amount> & {
    argTypes: any;
};
export default meta;
type Story = StoryObj<typeof Amount>;
export declare const WithSymbol: Story;
export declare const WithoutSymbol: Story;
