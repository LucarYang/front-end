// 封装获取频道列表的逻辑

import { getChannelAPI } from "@/apis/article";
import { useEffect, useState } from "react";

const useChannel = () => {
  // 1 获取频道列表所有逻辑
  const [channelList, setChannelList] = useState([]);
  useEffect (() => {
    const getChannleList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannleList();
  }, []);
  // 2 把组件中用到的数据return出去
  return {channelList}
};

export { useChannel };
