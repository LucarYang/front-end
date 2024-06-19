import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

//自定义antD样式
import { createStyleImportPlugin } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 配置按需加载 Ant Design 样式
    // createStyleImportPlugin({
    //   libs: [
    //     {
    //       libraryName: "antd",
    //       esModule: true, // 如果是使用 ES6+ 导入语法
    //       resolveStyle: (name) => {
    //         // 这里返回的是 Less 文件的路径，并且带上 modifyVars 参数
    //         return `antd/dist/antd.less?modifyVars=${encodeURIComponent(
    //           JSON.stringify({
    //             "primary-color": "#1DA57A",
    //             "link-color": "#1DA57A",
    //             // ... 其他你想要覆盖的变量
    //           })
    //         )}`;
    //       },
    //     },
    //     // 如果有其他库需要按需加载，可以在这里继续添加
    //   ],
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许在less中使用JS表达式
        modifyVars: {
          "primary-color": "#1DA57A",
        }, // 这里不需要设置，因为我们已经在custom-theme.less中覆盖了变量
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
