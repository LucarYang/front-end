# 记账本环境创建

CRA 创建项目

```bash
npx create-react-app react-bill-test
```

1. Redux 状态管理 - @reduxjs/toolkit react-redux
2. 路由 - react-router-dom
3. 时间处理 - dayjs
4. class 类管理处理 - classNames
5. 移动端组件库 - antd-mobile
6. 请求插件 - axios

```bash
npm i @reduxjs/toolkit react-redux react-rourter-dom dayjs classnames antd-mobile axios
```

# 配置别名路径@

别名路径配置

1. 路径解析配置(webpack),把@/解析为 src/
   - 插件 craco
2. 路径联想配置(VScode),VsCode 在输入@/时候，自动联想出 src/下的子目录
   - jsconfig.json

## 路径解析配置

CRA 本身把 webpack 配置包装到了黑盒里无法直接修改，需要借助一个插件 craco

配置步骤：

1. 安装 craco(安装在开发环境)
   npm i -D @craco/craco
2. 项目根目录下创建配置文件
   craco.config.js
3. 配置文件中添加路径解析配置
4. 包文件中配置启动和打包命令

\craco.config.js

```js
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
```

package.json

```json
// ...
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
// ...
```

src\index.js(测试)

```js
// ...
import Sum from "@/test";

const total = Sum(1, 2);
console.log(total); //3

// ...
```

## 联想路径配置

VsCode 的联想配置，需要我们在的项目目录下添加 jsconfig.json 文件，加入配置后 VSCO 的会自动读取配置帮助我们自动联想提示

在根目录下添加 jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

# 数据 Mock

进行的数据的模拟

## json-server 实现数据 Mock

json-server 是一个 node 包，可以在不到 30 秒内获取得零编码的完整的 Mock 服务

实现步骤：

1. 项目中安装 json-server
   npm i -D json-server
2. 准备一个 json 命令
3. 添加启动命令
   "server": "json-server ./server/data.json --port 8888",
4. 访问接口进行测试

# 整体路由设计

src\router\index.js

```js
// 创建路由实例 绑定path element
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // path: "month",
        index: true,
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
]);
export default router;
```
