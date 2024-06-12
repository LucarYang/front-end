// 路由配置
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "@/components/AuthRouter";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
import { Suspense, lazy } from "react";

// lazy函数对组件进行导入
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

// 配置路由
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"加载中……"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"加载中……"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中……"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

export default router;
