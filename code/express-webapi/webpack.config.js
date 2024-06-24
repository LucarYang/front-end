const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./app.js", // 入口文件
  output: {
    filename: "main.js", // 打包后的文件名
    path: path.resolve(__dirname, "dist"), // 打包后的文件存放地
  },
  module: {
    rules: [
      // 配置Babel或其他加载器来处理你的JS文件
      // ...
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 使用HTML模板文件
    }),
    new CleanWebpackPlugin(), // 清理/dist目录
    // ...其他插件
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  target: "node",
  mode: "development", // 开发模式，使用更少的优化和更详细的输出
  devtool: "inline-source-map", // 启用source map以进行调试
  devServer: {
    // 如果你要使用webpack-dev-server，可以在这里配置它
    // ...
    // static: "./dist",
  },
};
