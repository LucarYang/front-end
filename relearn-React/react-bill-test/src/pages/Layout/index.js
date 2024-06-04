import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
      Layout页面
    </div>
  );
};

export default Layout;
