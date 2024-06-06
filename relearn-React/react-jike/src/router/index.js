// 路由配置
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "@/components/AuthRouter";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

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
      { index: true, element: <Home /> },
      { path: "article", element: <Article /> },
      { path: "publish", element: <Publish /> },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

export default router;
