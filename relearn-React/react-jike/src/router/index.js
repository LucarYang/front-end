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
