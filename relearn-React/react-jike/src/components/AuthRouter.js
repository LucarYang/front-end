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
