import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import alias from "@rollup/plugin-alias";
import path from "path";
import dts from "vite-plugin-dts";
import Components from "unplugin-vue-components/vite";
import fs from "fs";

function getComponentEntries() {
  const componentsDir = path.resolve(__dirname, "src/components");
  const entries = {};

  // 遍历组件目录，获取每个组件的入口文件
  const componentDirs = fs.readdirSync(componentsDir);
  for (const dir of componentDirs) {
    const entryName = dir; // 这里假设组件目录的名称就是入口名称
    const entryPath = path.join(componentsDir, dir, "index.tsx");
    entries[entryName] = entryPath;
  }

  entries["index"] = path.resolve(__dirname, "src/index.ts");

  return entries;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    react(),
    tsconfigPaths(),
    dts(),
    Components({
      dts: true,
      extensions: ["tsx"],
      globs: ["src/components/*.{tsx}"],
      deep: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // target: "esnext", // 目標環境，可以根據需要調整
    // outDir: "dist", // 輸出目錄
    lib: {
      entry: getComponentEntries(),
      fileName: (_format, entryName) => {
        if (entryName === "index") {
          return `index.js`;
        }
        return `components/${entryName}/index.js`;
      },
    },
  },
});
