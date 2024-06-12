// 扩展webpack的配置

const path = require("path");
// 引入辅助函数
const { whenProd, getPlugin, pluginByName } = require("@craco/craco");

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src"),
    },
    // 配置CDN
    configure: (webpackConfig, { env, paths }) => {
      // 当是生产环境时
      whenProd(() => {
        // 外部化依赖
        webpackConfig.externals = {
          react: "React",
          "react-dom": "ReactDOM",
        };

        // 注入 CDN 资源的 URL
        webpackConfig.plugins.forEach((plugin) => {
          if (plugin.constructor.name === "HtmlWebpackPlugin") {
            plugin.options.templateParameters = {
              ...plugin.options.templateParameters,
              cdnJs: [
                "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
              ],
            };
          }
        });
      });
      console.log("webpackConfig");
      console.log(webpackConfig);

      return webpackConfig;
    },
  },
};
