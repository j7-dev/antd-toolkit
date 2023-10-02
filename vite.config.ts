import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import alias from "@rollup/plugin-alias";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext", // 目標環境，可以根據需要調整
    outDir: "dist", // 輸出目錄
    assetsDir: ".", // 靜態資源目錄
    rollupOptions: {
      input: "src/index.tsx", // 入口文件，只打包這個文件
      output: {
        entryFileNames: "index.js", // 輸出的文件名稱
      },
    },
  },
});
