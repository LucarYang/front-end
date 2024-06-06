// 封装和token相关的方法 存 取 删
const TOKENKEY = "token_key"; //通过静态变量处理 共享的key变量
const setToken = (token) => {
  localStorage.setItem(TOKENKEY, token);
};

const getToken = (token) => {
  return localStorage.getItem(TOKENKEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKENKEY);
};

export { setToken, getToken, removeToken };
