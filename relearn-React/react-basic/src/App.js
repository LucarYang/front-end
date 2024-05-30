import { useState } from "react";
// 手控绑定表单
// 1、声明一个React状态 -useState

// 2、核心绑定流程
// 1.通过value属性绑定React状态
// 2.绑定onChange事件 通过时间参数e拿到输入框最新的值 反向修改到React状态

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      ></input>
    </div>
  );
}

export default App;
