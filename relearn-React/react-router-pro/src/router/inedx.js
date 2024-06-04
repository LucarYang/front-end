import Login from "../page/Login/Index";
import Article from "../page/Article";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFount from "../page/NotFound";

import { createBrowserRouter, createHashRouter } from "react-router-dom";

// const router = createBrowserRouter([ //history 模式
const router = createHashRouter([
  //hash 模式
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // path:'baord',
        index: true, //设置默认二级路由
        element: <Board />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/article/:id/:name",
    Component: Article,
  },
  {
    path: "*",
    element: <NotFount />,
  },
]);

export default router;
