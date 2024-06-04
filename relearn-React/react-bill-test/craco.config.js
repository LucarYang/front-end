const path = require("path");
module.exports = {
  // webpack配置
  webpack: {
    // 别名配置
    alias: {
      // 约定使用@ 表示 src 文件所在目录
      "@": path.resolve(__dirname, "src"),
    },
  },
};
