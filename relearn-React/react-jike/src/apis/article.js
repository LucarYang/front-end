// 文章先关的请求
import { request } from "@/utils";

// 获取频道列表
const getChannelAPI = () => {
  return request({
    url: "/channels",
    method: "GET",
  });
};

// 提交文章表单
const CreateArticleAPI = (data) => {
  return request({
    url: "mp/articles?draft=false",
    method: "POST",
    data,
  });
};
export { getChannelAPI, CreateArticleAPI };
