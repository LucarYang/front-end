import { create } from "zustand";
import { useEffect } from "react";
const URL = "http://geek.itheima.net/v1_0/channels";

// 文件物理拆分
// store/counterStore
// store/counterChannel
// store/index.js

// 1.拆分子模块 再组合起来
const createCounterStore = (set) => {
  return {
    count: 0,
    // 修改状态的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      })); //基于源数据做计算  参数是函数
      // set({ count: 100 }); //基于源数据做修改  参数是对象
    },
  };
};

const createChannelStore = (set) => {
  return {
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch(URL);
      const jsonRes = await res.json();
      console.log(jsonRes);
      set({
        channelList: jsonRes.data.channels,
      });
    },
  };
};
// 2.组合
const useStore = create((...a) => {
  return {
    ...createCounterStore(...a),
    ...createChannelStore(...a),
  };
});

// 2.绑定store到组件
//  userStore=> { count, inc };

function App() {
  const { count, inc, channelList, fetchGetList } = useStore();
  useEffect(() => {
    fetchGetList();
  }, [fetchGetList]);
  return (
    <div className="App">
      <button onClick={inc}>{count}</button>
      <ul>
        {channelList.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
