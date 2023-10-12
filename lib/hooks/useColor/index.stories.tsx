import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title, Subtitle, Description } from "@storybook/blocks";

import { Components } from "./Components";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Components> & {
  argTypes: any;
} = {
  title: "HOOKS/useColor",
  component: Components,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
對 antd 的 useColor 做簡易封裝，目的是減少代碼量，可以直接拿顏色出來

<a href="https://ant.design/docs/react/customize-theme-cn#aliastoken" target="_blank">antd 所有主題色</a>
<br /><br />

---

<br />

#### 範例:

\`\`\`tsx
export const Components = () => {
  const { colorPrimary } = useColor();

  return <div style={{ color: colorPrimary }}>Components</div>;
};
\`\`\`

				`, // 可以寫 markdown
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <h4>結果:</h4>
          <div className="preview-block">
            <div>
              <Components />
            </div>
          </div>
        </>
      ),
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Components>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const General: Story = {
  name: " ",
  args: {},
};
