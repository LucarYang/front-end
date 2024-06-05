# 新的项目

# 使用CRA初始化项目环境

1. 使用CRA创建项目
   npx create-react-app react-jike
2. 按照业务规范整理项目根目录(重点src目录)

|文件夹|作用|
|-|-|
|apis|接口|
|assets|静态资源|
|components|通用组件|
|pages|页面组件|
|router|路由Router|
|store|Redux状态|
|utils|工具函数|

保留的文件：
>
> src\index.js
>
> src\App.js
>
> src\index.css

# 安装antDesign

安装scss

CRA项目中介入scss

npm i sass -D

# 安装Ant Design组件库

npm i antd -s

```jsx
import {Button} from 'antd'
function App() {
  return (
    <div>
      this is App
      <Button type='primary'>dd</Button>
    </div>
  );
}

export default App;
```

# 配置基础路由Router

1. 安装路由包 react-router-dom
2. 准备两个基础路由组件Layout和Login
3. 在router/index.js文件中引入组件进行路由配置，导出router实例
4. 在入口文件渲染`<RouterProvider/>`, 传入router实例

```bash
npm i react-router-dom
```

src\router\index.js

```js
// 路由配置
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import {createBrowserRouter} from 'react-router-dom'

// 配置路由
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>
    },
    {
        path:'/Login',
        element:<Login/>
    }
])

export default router
```

src\index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {RouterProvider} from 'react-router-dom'
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
