import { useSelector, useDispatch } from "react-redux";
// 导入actionCreater
import { inscrement,descrement,addToNum } from "./store/modules/counterStore";
import { fetchChannelList } from "./store/modules/channelStore";
import { useEffect } from "react";

function App() {
  const { count } = useSelector((state) => state.counter);
  const { channelList}=useSelector((state)=>state.channel)

  // 得到deipatch函数
  const dispatch = useDispatch();
  // 使用useEffect出发异步请求
  useEffect(()=>{
    dispatch(fetchChannelList())
  },[dispatch])

  return (
    <div className="App">
      <button onClick={()=>dispatch(inscrement())}>+</button>
      {count}
      <button onClick={()=>dispatch(descrement())}>-</button>
      <button onClick={()=>dispatch(addToNum(10))}>add to 10</button>
      <button onClick={()=>dispatch(addToNum(20))}>add to 20</button>
      <ul>
        {channelList.map((item,index)=>
          <li key={index}>{item.name}</li>
        )}
      </ul>
      
    </div>
  );
}

export default App;
