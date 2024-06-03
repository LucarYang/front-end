import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";

// 1. 创建router实例对象并且配置路由关系

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <div>login页面</div>,
//   },
//   {
//     path: "/article",
//     element: <div>article页面</div>,
//   },
// ]);

// 导入路由
import router from "./router/inedx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
