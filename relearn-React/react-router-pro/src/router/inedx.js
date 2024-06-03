import Login from "../page/Login/Index";
import Article from "../page/Article";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
