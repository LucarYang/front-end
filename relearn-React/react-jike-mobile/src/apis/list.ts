import { http } from "@/utils";
import type { ResType } from "./shared";

// 1. 定义泛型

// 2.定义具体的类型
export type ChannelItem = {
  id: number;
  name: string;
};

type ChannelRes = {
  channels: ChannelItem[];
};

// 请求频道列表

export function fetchChannelAPI() {
  return http.request<ResType<ChannelRes>>({
    url: "/channels",
  });
}

// 请求文章列表
type ListItem = {
  art_id: string;
  title: string;
  aut_id: string;
  comm_count: number;
  pubdate: string;
  aut_name: string;
  is_top: 0 | 1;
  cover: {
    type: 0 | 1 | 3;
    images: string[];
  };
};

export type ListRes = {
  results: ListItem[];
  pre_timestamp: string;
};

type ReqParams = {
  channel_id: string;
  timestamp: string;
};
export function fetchListAPI(params: ReqParams) {
  return http.request<ResType<ListRes>>({
    url: "/articles",
    params,
  });
}
