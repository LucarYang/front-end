import Login from "../page/Login/Index";
import Article from "../page/Article";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'baord',
        element:<Board/>
      },
      {
        path:'about',
        element:<About/>
      },
    ]
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/article/:id/:name",
    Component: Article,
  },
]);

export default router;
