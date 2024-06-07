// 文章先关的请求
import { request } from "@/utils";

// 获取频道列表
const getChannelAPI = () => {
  return request({
    url: "/channels",
    method: "GET",
  });
};

export { getChannelAPI };
