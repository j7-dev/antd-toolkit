import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@etchteam/storybook-addon-status",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "使用手冊",
  },
  // 隱藏 HOOKS 底下的 story
  managerHead: (head) => `
    ${head}

		<style>
		.sidebar-container a[id^="hooks-"]:not([id$="使用手冊"]),
		.sidebar-container a[id^="functions-"]:not([id$="使用手冊"]),
		.sidebar-container a[id^="stories-example-"],
		.sidebar-container #stories{
			display: none !important;
		}
		</style>
  `,
};
export default config;
