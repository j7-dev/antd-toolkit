import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title, Subtitle, Description } from "@storybook/blocks";

import { Components } from "./Components";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Components> & {
  argTypes: any;
} = {
  title: "FUNCTIONS",
  component: Components,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `

常用函式

---

<br />

##### renderHTML

> 將 包含 HTML TAG 的 string 轉成 HTML

\`\`\`tsx
renderHTML('<p>test</p>')
\`\`\`

##### filterObjKeys

> 過濾 object 的 key，預設過濾 value 為 \`undefined\` 的 key

> 使用 **遞歸方式** 過濾，因此也適用深層物件

\`\`\`tsx
// 如果 value === undefined 則刪除這個 key

const person = {
	name: 'John',
	age: 18,
	address: undefined,
	isMale: true
}

// 預設 - 過濾 undefined
const filterObj = filterObjKeys(person)
/*
{
	name: 'John',
	age: 18,
	isMale: true
}
*/

// 過濾其他值，接受 array - 過濾 true
const filterObj2 = filterObjKeys(person, [true])
/*
{
	name: 'John',
	age: 18,
	address: undefined,
}
*/
\`\`\`

##### keyToWord

> 傳入 camelCase | snake_case 返回首字母大寫+空格單字

\`\`\`tsx

const label = keyToWord('product_category')
// "Product Category"

const label = keyToWord('productCategory')
// "Product Category"

\`\`\`





				`, // 可以寫 markdown
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
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
