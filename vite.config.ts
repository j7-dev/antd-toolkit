import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import alias from "@rollup/plugin-alias";
import path from "path";
import dts from "vite-plugin-dts";
import Components from "unplugin-vue-components/vite";

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
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
    },
  },
});
