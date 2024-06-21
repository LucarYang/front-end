import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import DashBoard from "@/pages/Dashboard";
import Err from "@/pages/404";

const tabRoutes = [
    { path: '/', element: <DashBoard />, label: 'Dashboard', key: '/' },
    { path: 'home', element: <Home />, label: '首页', key: '/home' },
    { path: '/error', element: <Err />, label: '异常页', key: '/error' }
];
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // children: [
        //     {
        //         index: true,
        //         // path: '/dashboard',
        //         element: <DashBoard />,
        //         tab: 'Dashboard'
        //     },
        //     {
        //         path: 'home',
        //         element: <Home />
        //     },
        //     {
        //         path: '/error',
        //         element: <Err />
        //     }
        // ]
        children: [...tabRoutes]
    },
    {
        path: '/login',
        element: <Login />
    },

])

export { tabRoutes }
export default router