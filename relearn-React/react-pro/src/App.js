import { forwardRef, useImperativeHandle, useRef } from "react";

// 子组件
// function Son() {
//   return <input type="text" />;
// }

const Son = forwardRef((porps, ref) => {
  // 实现聚集逻辑
  const inputRef = useRef(null);
  const focusHandler = () => {
    inputRef.current.focus();
  };
  // 聚焦方法暴露出去
  useImperativeHandle(ref, () => {
    return {
      // 暴露的方法
      focusHandler,
    };
  });
  return <input type="text" ref={inputRef} />;
});

function App() {
  const sonRef = useRef(null);
  const focusHandler = () => {
    console.log(sonRef.current);
    sonRef.current.focusHandler();
  };
  return (
    <div className="App">
      <Son ref={sonRef} />
      <button onClick={focusHandler}>focus</button>
    </div>
  );
}

export default App;
