// 用户先关的请求
import { request } from "@/utils";

// 登录请求
const loginAPI = (fromData) => {
  return request({
    url: "/authorizations",
    method: "POST",
    data: fromData,
  });
};

// 获取用户信息
const getUserInfo = () => {
  return request({
    url: "/user/profile",
    method: "GET",
  });
};

export { loginAPI, getUserInfo };
