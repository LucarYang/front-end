import { Outlet,Link } from "react-router-dom";
const Layout = () => {
  return (<div>一级路由layout
    {/* 配置二级路由出口 */}
    <Link to='/baord'>面板</Link>
    <Link to='/about'>关于</Link>
    <Outlet/>
  </div>);
};

export default Layout;
