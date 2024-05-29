import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions(), vue()],
  resolve: {
    alias: {
      "@": "/src", // 确保这里的路径与你的项目结构相匹配
    },
  },
  server: {
    port: 3011, //本地运行端口号
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/layout/bem.scss';",
      },
    },
  },
});
