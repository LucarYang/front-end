# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# vite 创建项目

```bash
npm create vite@latest react-jike-mobile -- --template react-ts
```

1. npm create vite@latest 固定写法
2. react-jike-mobile 项目名
3. -- --template react-ts 指定项目模板 react+ts

安装所有包

```bash
npm i
```

# 安装 Ant Design Mobile

npm install --save antd-mobile

# 初始化路由

npm i react-router-dom

# 配置路径别名@

@路径别名做路径简化

1. 让 Vite 做路径解析(真是的路径转换)

   relearn-React\react-jike-mobile\vite.config.ts

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```

1. 让 VScode 做只能路径提示(开发者体验)

   relearn-React\react-jike-mobile\tsconfig.json

```json
 "baseUrl": ".",
    "paths": {
      "@/*":[
        "src/*"
      ]
    },
```

npm i @types/node -D

# 安装 axios

npm i axios

# 封装 API 模块 -axios 与 ts 的配合使用

axios 提供了 request 泛型方法，方便我们传入类型参数推导出接口返回值的类型

```ts
axios.request<Type>(requestConfig).then((res) => {
  // res.data的类型为Type
  console.log(res.data);
});
```

说明：泛型参数 Type 的类型决定了 res.data 的类型

步骤：

1. 根据接口文档创建一个通用的泛型接口类型(多个接口返回值的结构是相似的)
2. 根据接口文档创建特有的接口数据类型(每个接口有自己特殊的数据格式)
3. 组合 1 和 2 类型，得到最终传给 request 泛型的参数类型
