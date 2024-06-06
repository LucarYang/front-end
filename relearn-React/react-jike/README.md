# 项目前期准备

## 使用 CRA 初始化项目环境

1. 使用 CRA 创建项目
   npx create-react-app react-jike
2. 按照业务规范整理项目根目录(重点 src 目录)

| 文件夹     | 作用        |
| ---------- | ----------- |
| apis       | 接口        |
| assets     | 静态资源    |
| components | 通用组件    |
| pages      | 页面组件    |
| router     | 路由 Router |
| store      | Redux 状态  |
| utils      | 工具函数    |

保留的文件：

> src\index.js
>
> src\App.js
>
> src\index.css

## 安装 antDesign

安装 scss

CRA 项目中介入 scss

npm i sass -D

## 安装 Ant Design 组件库

npm i antd -s

```jsx
import { Button } from "antd";
function App() {
  return (
    <div>
      this is App
      <Button type="primary">dd</Button>
    </div>
  );
}

export default App;
```

## 配置基础路由 Router

1. 安装路由包 react-router-dom
2. 准备两个基础路由组件 Layout 和 Login
3. 在 router/index.js 文件中引入组件进行路由配置，导出 router 实例
4. 在入口文件渲染`<RouterProvider/>`, 传入 router 实例

```bash
npm i react-router-dom
```

src\router\index.js

```js
// 路由配置
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";

// 配置路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

export default router;
```

src\index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## 配置@别名路径

通过@代替 src 路径

针对路径转换，修改 webpack 别名路径配置 craco
针对联想路径，修改 VSCO 的配置 jsconfig.json

- 路径编译配置

1. 安装 craco 工具包
2. 增加 craco.config.js 配置文件
3. 修改 script 命令
4. 测试是否生效

npm i @craco/craco

修改 package.json

```json
 "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    }
```

# 登录模块

**实现步骤**

1. 在 `Login/index.js` 中创建登录页面基本结构
2. 在 Login 目录中创建 index.scss 文件，指定组件样式
3. 将 `logo.png` 和 `login.png` 拷贝到 assets 目录中
   **代码实现**
   `pages/Login/index.js`

```jsx
import "./index.scss";
import { Card, Form, Input, Button } from "antd";
import logo from "@/assets/logo.png";

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form>
          <Form.Item>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
```

`pages/Login/index.scss`

```css
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: center/cover url("~@/assets/login.png");

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}
```

## 表单验证

表单校验：Form.Item- rules

```jsx
<Form validateTrigger="onBlur">
  <Form.Item
    name="mobile"
    // 多条校验逻辑 先校验第一条 第一条通过或在校验第二条
    rules={[
      { required: true, message: "请输入手机号!" },
      { pattern: /^1[3-9]\d{9}&/, message: "请输入正确的手机号!" },
    ]}
  >
    <Input size="large" placeholder="请输入手机号" />
  </Form.Item>
  <Form.Item name="code" rules={[{ required: true, message: "请输入验证码!" }]}>
    <Input size="large" placeholder="请输入验证码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" size="large" block>
      登录
    </Button>
  </Form.Item>
</Form>
```

From 失焦校验

```jsx
 <Form validateTrigger="onBlur">

```

## 获取表单上数据

From 组件绑定 onFinish 回调函数，通过回调函数的参数获取用户输入的内容

## 登录 - 封装 request 请求模块

使用 axios 三方库做统一封装，方便统一管理和复用

```js
// axios 的封装处理
import axios from "axios";

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 响应拦截器

const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 添加请求拦截器
// 在请求发送之前做拦截 插入自定义的配置 [参数处理]
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.use(
  (response) => {
    // 2xx 范围的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超过2xx 范围的请求码都会触发该函数
    return Promise.reject(error);
  }
);

export { request };
```

统一中转工具模块函数 utils\index.js

```js
// 统一中转工具模块函数
// import {request } from "@/utils";

import { request } from "./request";

export { request };
```

## 登录 - 使用 Redux 管理 token

token 是一个用户标识数据，在很多模块中共享，Redux 可以方便的解决状态共享问题

1. Redux 中编写获取 Token 的异步获取和同步修改
2. Login 组件负责提交 action 并把表单数据传递过来

安装 Redux

npm i react-redux @reduxjs/toolkit

src\store\modules\user.js

```js
// 用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: "",
  },
  // 同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 解构出actionCreator
const { setToken } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

export { setToken };

export default userReducer;
```

src\store\index.js

```js
// 组合Redux的子模块 + 导出store实例
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
```

src\index.js 通过 Provider 绑定

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
```

## 实现 Redux 异步获取

测试数据 13800000002 246810

src\store\modules\user.js

```js
// ...

// 异步方法 完成登录获取token
const fetchLogin = (LoginFrom) => {
  return async (dispatch) => {
    // 1. 发送请求
    const res = await request.post("/authorizations", LoginFrom);
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

export { fetchLogin, setToken };
// ...
```

src\pages\Login\index.js

```js
// ...
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values);
    // 触发异步action
    dispatch(fetchLogin(values));
  };
  // ...
};
```

# Redux 管理 token 实现登录

src\pages\Login\index.js

```jsx
const onFinish = async (values) => {
  console.log(values);
  // 触发异步action
  await dispatch(fetchLogin(values));

  // 1. 跳转到首页

  navigate("/");
  // 2. 提示用户
  message.success("登录成功");
};
```

# 登录 - Token 持久化

现在存在的问题：Redux 存入 Token 之后如果刷新浏览器，Token 会丢失(持久化就是防止刷新时丢失 Token)

问题原因：Redux 是基于浏览器内存的存储方式，刷新时状态恢复为初始值

**技术解决方案**：

- 获取并存 Token `Rudex`+`LocalStorage`
- 初始化 Token `LocalStorage` ? `LocalStorage` : `空字符串`

src\store\modules\user.js

```js
// ...
const userStore = createSlice({
  // ...
  initialState: {
    token: localStorage.getItem("token_key") || "",
  },
  // 同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //   LocalStorage 存一份
      localStorage.setItem("token_key", action.payload);
    },
  },
});

// ...
```

# 封装 Token 的存取删除方法

封装的原因：对于 Token 的各类操作在项目**多个模块中都有用到**，为了**共享复用**可以封装成工具函数

src\utils\token.js

```js
// 封装和token相关的方法 存 取 删
const TOKENKEY = "token_key";
const setToken = (token) => {
  localStorage.setItem(TOKENKEY, token);
};

const getToken = (token) => {
  return localStorage.getItem(TOKENKEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKENKEY);
};

export { setToken, getToken, removeToken };
```

使用 src\store\modules\user.js

```js
import { setToken as _setToken, getToken } from "@/utils";
// ...
const userStore = createSlice({
  // ...
  initialState: {
    token: token: getToken() || "", || "",
  },
  // 同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //   LocalStorage 存一份
      _setToken(action.payload);
    },
  },
});

// ...
```

# axois 请求拦截器注入 token

Token 作为用户的一个标识数据，**后端很多接口**都会以它作为接口权限判断的依据；请求拦截器注入 token 之后，所有用到 axios 实例接口请求都会**自动携带 token**

axios 请求拦截器的请求头中注入 token

src\utils\request.js

```js
request.interceptors.request.use(
  (config) => {
    // 操作这个config 注入token
    // 1. 获取到token
    // 2. 按照后端的格式要求去做token的拼接
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; //config.headers.Authorization 固定写法  `Bearer ${token}` 由后端开发决定
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

测试

```jsx
// 测试token是否成功注入
import { request } from "@/utils";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    request.get("/user/profile");
  }, []);
  return <div>this is Layout</div>;
};
export default Layout;
```

# 根据 token 做路由控制

**使用 Token 做路由的权限控制**

有些路由页面的的内容信息比较敏感，如果用户没有经过登录获取到有效 Token，日没有权限跳转的，根据 Token 的有无控制当前路由是否可以跳转就是路由的权限控制

`路由组件` -> `高阶组件 HOC Component` -(是 正常返回路由组件)->路由组件 |-(否 强制跳回登录)->登录组件

src\components\AuthRouter.js

```js
// 封装高阶组件
// 核心逻辑： 有Token正常跳转 无Token去登录

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRouter({ children }) {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}
```

测试 src\router\index.js

```js
// 路由配置
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "@/components/AuthRouter";

// 配置路由
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

export default router;
```
