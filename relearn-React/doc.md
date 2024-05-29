B站地址(黑马程序员前端React18)：https://www.bilibili.com/video/BV1ZB4y1Z7o8/?spm_id_from=333.337.search-card.all.click&vd_source=580b24c9d51959375fe3b82eddb5a966

# 概要

|||
|-|-|
|React基础|工程化的环境创建、JSX、组件、useState、useEffect、useRef、自定义Hook、智能组件和UI组件……|
|Redux|RTK、同步状态、异步状态、状态和视图分离、美团购物车案例……|
|Ruoter路由|基础使用、路由嵌套、路由模式、声明式导航、编程式导航、记事本案例……|
|实战项目|React全家桶、登陆业务、Token管路、Echarts图表封装、图片上传、项目打包、路由懒加载、CDN资源优化……|
|基础拓展|useMeno/useCallback、useReducer、uselmperativeHandle、Class API vs Hooks、新一代状态管理-zustand|
|React+TS|React+TS基础、Axios+TS、Zustand+TS、React+TS构建极客移动端、频道业务、列表业务、详情业务|

React是mate公司研发的是一个 __构建Web和原生交换界面的库__

## 搭建环境

使用create-react-app (crp) 快速搭建开发环境，create-react-app  是创建React开发环境的工具，底层有webpack构建，开箱即用。

执行命令(react-basic 项目名称)
```cmd
npx create-react-app react-basic
```
组主要的两个文件 src/App.js和src/index.js。其中 __index.js__ 将根组件 __App__ 渲染到 __public/index.html__ 中Id为 __root__ 的dom节点上
```
App -> index.js -> public/index.html(root)
```

## JSX  

JSX是Javascript和XML(HTML)的缩写，表示在JS代码中编写HTML模板结构，它是React编写UI模板的方式

优势：HTML的声明式的语法；JS的可编程能力

- JSX的本质

JSX不是标准的JS语法，是JS语法的扩展，浏览器本身不识别，需要通过解析工具解析之后才能在浏览器中运行

- bable 解析
(https://babeljs.io/)

JSX

```jsx
<div>
  this is div
  <span>
  	this is  span
  </span>
</div>
```
babel解析成js
```js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*#__PURE__*/_jsxs("div", {
  children: ["this is div", /*#__PURE__*/_jsx("span", {
    children: "this is  span"
  })]
});
```

### JSX 中使用表达式

在JSX中通过大括号｛｝之别JavaScript中的表达式，比如常见的变量、函数调用、方法调用

1. 使用引号传递字符串
2. 使用JavaScript变量
3. 函数调用和方法调用
4. 使用JavaScript对象

src/App.js
```js
const count =100
const getName=()=>{
return 'Jack'
}
function App() {
  return (
    <div className="App">
      this is a App
      {/* 使用引号传递字符串 */}
      {'this is massage'}
      {/* 识别JS变量 */}
      {count}
      {/* 函数调用 */}
      {getName()}
      {/* 方法调用 */}
      {new Date().getDate()}
      {/* 使用JS对象 */}
      <div style={{color:'red'}}>this is div</div>
    </div>
  );
}
export default App;
```

### JSX 列表渲染
App.js
```js
const list=[
  {id:1001,name:'Vue'},
  {id:1002,name:'React'},
  {id:1003,name:'Angular'},
]

function App() {
  return (
    <div className="App">
     {/* 渲染列表 */}
     {/* 注意事项：加上独一无二的key key用于diff算法来实现DOM更新 */}
     <ul>
      {list.map((item,index)=> <li key={index}>{item.name}</li> )}
     </ul>
    </div>
  );
}

export default App;
```

### JSX 条件渲染

在React中通过逻辑运算符&& 、三元表达式(?:)实现条件渲染

App.js
```js
const islogin=true
function App() {
  return (
    <div className="App">
     {/* 逻辑与 && */}
     {islogin&&<span> this is span</span>}
     {/* 三元运算 */}
     {islogin?<span>jack</span>:<span>isloading</span>}
    </div>
  );
}

export default App;

```

### JSX复杂条件渲染

App.js
```js
// 定于文章类型
const artcleType=1 //0 1 3

// 定义核心函数：根据文章类型返回不同JSX模板
const getArtcleTem=()=>{
  if(artcleType===0){
    return <div>无图模式</div>
  }
  else if(artcleType===1){
    return <div>单模式</div>
  }
  else if(artcleType===3){
    return <div>三模式</div>
  }
}

function App() {
  return (
    <div className="App">
     {getArtcleTem()}
    </div>
  );
}

export default App;
```