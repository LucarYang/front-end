// 用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //   LocalStorage 存一份
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

// 解构出actionCreator
const { setToken, setUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法 完成登录获取token
const fetchLogin = (LoginFrom) => {
  return async (dispatch) => {
    // 1. 发送请求
    const res = await request.post("/authorizations", LoginFrom);
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

// 异步获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, setToken, fetchUserInfo };

export default userReducer;
