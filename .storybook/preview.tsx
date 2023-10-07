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
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
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
