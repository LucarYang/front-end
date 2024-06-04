# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# 环境创建

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

## 配置别名路径@

别名路径配置

1. 路径解析配置(webpack),把@/解析为 src/
   - 插件 craco
2. 路径联想配置(VScode),VsCode 在输入@/时候，自动联想出 src/下的子目录
   - jsconfig.json

#### 路径解析配置

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

#### 联想路径配置

VsCode 的联想配置，需要我们在的项目目录下添加 jsconfig.json 文件，加入配置后 VSCO 的会自动读取配置帮助我们自动联想提示

在根目录下添加 jsconfig.json
