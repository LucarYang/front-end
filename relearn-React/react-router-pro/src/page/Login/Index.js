import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      Login页面
      {/* 声明式写法 */}
      <Link to="/article">去article</Link>
      {/* 命令式写法 */}
      {/* <button onClick={() => navigate("/article")}>去article</button>
      <button onClick={() => navigate("/article?id=101&name=tom")}>
        searchParems传参
      </button> */}
      <button onClick={() => navigate("/article/101/tom")}>Parems传参</button>
    </div>
  );
};

export default Login;
