import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Sum from "@/test";
import { RouterProvider } from "react-router-dom";
import router from "./router/inedex";

// 导入定制主题文件
import "./theme.css";

const total = Sum(1, 2);
console.log(total);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
