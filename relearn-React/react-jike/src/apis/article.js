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

// 获取文章列表
const getArticleListAPI = (params) => {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
};

//  删除文章
const delArticleAPI = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
};

// 获取文章详情
const getArticleById=(id)=>{
  return request({
    url: `/mp/articles/${id}`,
    method: "GET",
  })
}
export { getChannelAPI, CreateArticleAPI, getArticleListAPI,delArticleAPI,getArticleById };
