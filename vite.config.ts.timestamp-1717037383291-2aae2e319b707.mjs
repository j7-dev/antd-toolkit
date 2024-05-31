// vite.config.ts
import { defineConfig } from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/vite-tsconfig-paths/dist/index.mjs";
import alias from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/@rollup/plugin-alias/dist/es/index.js";
import dts from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/node_modules/glob/dist/esm/index.js";
var __vite_injected_original_dirname = "C:\\Users\\jerry.liu\\Desktop\\test\\antd-toolkit";
var __vite_injected_original_import_meta_url = "file:///C:/Users/jerry.liu/Desktop/test/antd-toolkit/vite.config.ts";
console.log("\u2B50  process.env.BUILD_ENV:", process.env.BUILD_ENV);
var isBuildForStoryBook = process.env.BUILD_ENV === "storybook";
var defaultPlugins = [alias(), react(), tsconfigPaths()];
var plugins = isBuildForStoryBook ? defaultPlugins : [...defaultPlugins, libInjectCss(), dts({ include: ["lib"] })];
var config = {
  plugins,
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "lib")
    }
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "storybook",
        "@refinedev/antd",
        "@refinedev/core",
        "antd",
        "currency-symbol-map",
        "lodash-es",
        "nanoid",
        "react-countdown",
        "react-highlight-words",
        "@storybook/builder-manager@7.4.6",
        "@storybook/cli@7.4.6",
        "@storybook/codemod@7.4.6",
        "@storybook/core-server@7.4.6",
        "@storybook/docs-mdx@0.1.0",
        "@storybook/preview-api@7.4.6"
      ],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}", { ignore: ["lib/**/*.stories.{ts,tsx}"] }).map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative("lib", file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    }
  }
};
if (isBuildForStoryBook) {
  delete config.build;
}
var vite_config_default = defineConfig(config);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqZXJyeS5saXVcXFxcRGVza3RvcFxcXFx0ZXN0XFxcXGFudGQtdG9vbGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcamVycnkubGl1XFxcXERlc2t0b3BcXFxcdGVzdFxcXFxhbnRkLXRvb2xraXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2plcnJ5LmxpdS9EZXNrdG9wL3Rlc3QvYW50ZC10b29sa2l0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5pbXBvcnQgYWxpYXMgZnJvbSBcIkByb2xsdXAvcGx1Z2luLWFsaWFzXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5pbXBvcnQgeyBsaWJJbmplY3RDc3MgfSBmcm9tIFwidml0ZS1wbHVnaW4tbGliLWluamVjdC1jc3NcIjtcclxuaW1wb3J0IHsgZXh0bmFtZSwgcmVsYXRpdmUsIHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbmltcG9ydCB7IGdsb2IgfSBmcm9tIFwiZ2xvYlwiO1xyXG5cclxuLy8gaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG5jb25zb2xlLmxvZyhcIlx1MkI1MCAgcHJvY2Vzcy5lbnYuQlVJTERfRU5WOlwiLCBwcm9jZXNzLmVudi5CVUlMRF9FTlYpO1xyXG5cclxuY29uc3QgaXNCdWlsZEZvclN0b3J5Qm9vayA9IHByb2Nlc3MuZW52LkJVSUxEX0VOViA9PT0gXCJzdG9yeWJvb2tcIjtcclxuXHJcbmNvbnN0IGRlZmF1bHRQbHVnaW5zID0gW2FsaWFzKCksIHJlYWN0KCksIHRzY29uZmlnUGF0aHMoKV07XHJcbmNvbnN0IHBsdWdpbnMgPSBpc0J1aWxkRm9yU3RvcnlCb29rXHJcbiAgPyBkZWZhdWx0UGx1Z2luc1xyXG4gIDogWy4uLmRlZmF1bHRQbHVnaW5zLCBsaWJJbmplY3RDc3MoKSwgZHRzKHsgaW5jbHVkZTogW1wibGliXCJdIH0pXTtcclxuXHJcbmNvbnN0IGNvbmZpZzogVXNlckNvbmZpZyA9IHtcclxuICBwbHVnaW5zLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWJcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvbWFpbi50c1wiKSxcclxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgIFwicmVhY3RcIixcclxuICAgICAgICBcInJlYWN0L2pzeC1ydW50aW1lXCIsXHJcbiAgICAgICAgXCJzdG9yeWJvb2tcIixcclxuICAgICAgICBcIkByZWZpbmVkZXYvYW50ZFwiLFxyXG4gICAgICAgIFwiQHJlZmluZWRldi9jb3JlXCIsXHJcbiAgICAgICAgXCJhbnRkXCIsXHJcbiAgICAgICAgXCJjdXJyZW5jeS1zeW1ib2wtbWFwXCIsXHJcbiAgICAgICAgXCJsb2Rhc2gtZXNcIixcclxuICAgICAgICBcIm5hbm9pZFwiLFxyXG4gICAgICAgIFwicmVhY3QtY291bnRkb3duXCIsXHJcbiAgICAgICAgXCJyZWFjdC1oaWdobGlnaHQtd29yZHNcIixcclxuICAgICAgICBcIkBzdG9yeWJvb2svYnVpbGRlci1tYW5hZ2VyQDcuNC42XCIsXHJcbiAgICAgICAgXCJAc3Rvcnlib29rL2NsaUA3LjQuNlwiLFxyXG4gICAgICAgIFwiQHN0b3J5Ym9vay9jb2RlbW9kQDcuNC42XCIsXHJcbiAgICAgICAgXCJAc3Rvcnlib29rL2NvcmUtc2VydmVyQDcuNC42XCIsXHJcbiAgICAgICAgXCJAc3Rvcnlib29rL2RvY3MtbWR4QDAuMS4wXCIsXHJcbiAgICAgICAgXCJAc3Rvcnlib29rL3ByZXZpZXctYXBpQDcuNC42XCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgZ2xvYlxyXG4gICAgICAgICAgLnN5bmMoXCJsaWIvKiovKi57dHMsdHN4fVwiLCB7IGlnbm9yZTogW1wibGliLyoqLyouc3Rvcmllcy57dHMsdHN4fVwiXSB9KVxyXG4gICAgICAgICAgLm1hcCgoZmlsZSkgPT4gW1xyXG4gICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZW50cnkgcG9pbnRcclxuICAgICAgICAgICAgLy8gbGliL25lc3RlZC9mb28udHMgYmVjb21lcyBuZXN0ZWQvZm9vXHJcbiAgICAgICAgICAgIHJlbGF0aXZlKFwibGliXCIsIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSBleHRuYW1lKGZpbGUpLmxlbmd0aCkpLFxyXG4gICAgICAgICAgICAvLyBUaGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgZW50cnkgZmlsZVxyXG4gICAgICAgICAgICAvLyBsaWIvbmVzdGVkL2Zvby50cyBiZWNvbWVzIC9wcm9qZWN0L2xpYi9uZXN0ZWQvZm9vLnRzXHJcbiAgICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICksXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV1bZXh0bmFtZV1cIixcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0uanNcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmlmIChpc0J1aWxkRm9yU3RvcnlCb29rKSB7XHJcbiAgZGVsZXRlIGNvbmZpZy5idWlsZDtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGNvbmZpZyk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBZ0M7QUFDM1csT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxTQUFTLFVBQVUsZUFBZTtBQUMzQyxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLFlBQVk7QUFSckIsSUFBTSxtQ0FBbUM7QUFBa0ssSUFBTSwyQ0FBMkM7QUFXNVAsUUFBUSxJQUFJLGtDQUE2QixRQUFRLElBQUksU0FBUztBQUU5RCxJQUFNLHNCQUFzQixRQUFRLElBQUksY0FBYztBQUV0RCxJQUFNLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQ3pELElBQU0sVUFBVSxzQkFDWixpQkFDQSxDQUFDLEdBQUcsZ0JBQWdCLGFBQWEsR0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFFakUsSUFBTSxTQUFxQjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLElBQ2YsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPLE9BQU87QUFBQSxRQUNaLEtBQ0csS0FBSyxxQkFBcUIsRUFBRSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxFQUNuRSxJQUFJLENBQUMsU0FBUztBQUFBO0FBQUE7QUFBQSxVQUdiLFNBQVMsT0FBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUFBLFVBR2pFLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLFFBQzlDLENBQUM7QUFBQSxNQUNMO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFJLHFCQUFxQjtBQUN2QixTQUFPLE9BQU87QUFDaEI7QUFHQSxJQUFPLHNCQUFRLGFBQWEsTUFBTTsiLAogICJuYW1lcyI6IFtdCn0K
