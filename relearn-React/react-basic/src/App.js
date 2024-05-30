// 样式导入
import "./index.css";
const style = {
  color: "red",
  fontSize: "120%",
};
function App() {
  return (
    <div className="App">
      {/* 行内样式 */}
      <span style={{ color: "red", fontSize: "120%" }}>this is span</span>
      <span style={style}>this is span</span>
      {/* class类名控制 */}
      <span className="foo">this a class span</span>
    </div>
  );
}

export default App;
