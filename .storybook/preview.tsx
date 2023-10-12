import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from "@storybook/blocks";
import "../lib/assets/scss/index.scss";
import "./preview.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    docs: {
      toc: {
        title: "目錄",
        disable: false,
        headingSelector: "h1, h2, h3, h4, h5, h6",
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /date$/,
        boolean: /enabled$/,
        text: /className$/,
        number: /amount$/,
        object: /^[a-zA-Z]*[Pp]rops$/,
      },
    },
    status: {
      statuses: {
        dev: {
          color: "#c41d7f",
          background: "#fff0f6",
          description: "組件 / 文件還在開發中",
        },
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
};

export default preview;
