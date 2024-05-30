B 站地址(黑马程序员前端 React18)：https://www.bilibili.com/video/BV1ZB4y1Z7o8/?spm_id_from=333.337.search-card.all.click&vd_source=580b24c9d51959375fe3b82eddb5a966

# 概要

| | |

| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| [React 基础](#React基础) | 工程化的环境创建、JSX、组件、useState、useEffect、useRef、自定义 Hook、智能组件和 UI 组件…… |
| Redux | RTK、同步状态、异步状态、状态和视图分离、美团购物车案例…… |
| Ruoter 路由 | 基础使用、路由嵌套、路由模式、声明式导航、编程式导航、记事本案例…… |
| 实战项目 | React 全家桶、登陆业务、Token 管路、Echarts 图表封装、图片上传、项目打包、路由懒加载、CDN 资源优化…… |
| 基础拓展 | useMeno/useCallback、useReducer、uselmperativeHandle、Class API vs Hooks、新一代状态管理-zustand |
| React+TS | React+TS 基础、Axios+TS、Zustand+TS、React+TS 构建极客移动端、频道业务、列表业务、详情业务 |

React 是 mate 公司研发的是一个 **构建 Web 和原生交换界面的库**

# React 基础

## 搭建环境

使用 create-react-app (crp) 快速搭建开发环境，create-react-app 是创建 React 开发环境的工具，底层有 webpack 构建，开箱即用。

执行命令(react-basic 项目名称)

```cmd
npx create-react-app react-basic
```

组主要的两个文件 src/App.js 和 src/index.js。其中 **index.js** 将根组件 **App** 渲染到 **public/index.html** 中 Id 为 **root** 的 dom 节点上

```
App -> index.js -> public/index.html(root)
```

## JSX

JSX 是 Javascript 和 XML(HTML)的缩写，表示在 JS 代码中编写 HTML 模板结构，它是 React 编写 UI 模板的方式

优势：HTML 的声明式的语法；JS 的可编程能力

- JSX 的本质

JSX 不是标准的 JS 语法，是 JS 语法的扩展，浏览器本身不识别，需要通过解析工具解析之后才能在浏览器中运行

- bable 解析
  (https://babeljs.io/)

JSX

```jsx
<div>
  this is div
  <span>this is span</span>
</div>
```

babel 解析成 js

```js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*#__PURE__*/ _jsxs("div", {
  children: [
    "this is div",
    /*#__PURE__*/ _jsx("span", {
      children: "this is  span",
    }),
  ],
});
```

### JSX 中使用表达式

在 JSX 中通过大括号｛｝之别 JavaScript 中的表达式，比如常见的变量、函数调用、方法调用

1. 使用引号传递字符串
2. 使用 JavaScript 变量
3. 函数调用和方法调用
4. 使用 JavaScript 对象

src/App.js

```js
const count = 100;
const getName = () => {
  return "Jack";
};
function App() {
  return (
    <div className="App">
      this is a App
      {/* 使用引号传递字符串 */}
      {"this is massage"}
      {/* 识别JS变量 */}
      {count}
      {/* 函数调用 */}
      {getName()}
      {/* 方法调用 */}
      {new Date().getDate()}
      {/* 使用JS对象 */}
      <div style={{ color: "red" }}>this is div</div>
    </div>
  );
}
export default App;
```

### JSX 列表渲染

src/App.js

```js
const list = [
  { id: 1001, name: "Vue" },
  { id: 1002, name: "React" },
  { id: 1003, name: "Angular" },
];

function App() {
  return (
    <div className="App">
      {/* 渲染列表 */}
      {/* 注意事项：加上独一无二的key key用于diff算法来实现DOM更新 */}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### JSX 条件渲染

在 React 中通过逻辑运算符&& 、三元表达式(?:)实现条件渲染

src/App.js

```js
const islogin = true;
function App() {
  return (
    <div className="App">
      {/* 逻辑与 && */}
      {islogin && <span> this is span</span>}
      {/* 三元运算 */}
      {islogin ? <span>jack</span> : <span>isloading</span>}
    </div>
  );
}

export default App;
```

### JSX 复杂条件渲染

src/App.js

```js
// 定于文章类型
const artcleType = 1; //0 1 3

// 定义核心函数：根据文章类型返回不同JSX模板
const getArtcleTem = () => {
  if (artcleType === 0) {
    return <div>无图模式</div>;
  } else if (artcleType === 1) {
    return <div>单模式</div>;
  } else if (artcleType === 3) {
    return <div>三模式</div>;
  }
};

function App() {
  return <div className="App">{getArtcleTem()}</div>;
}

export default App;
```

## React 基础事件绑定

语法： on + 事件名称 ={ 事件处理程序 }

基础事件绑定、事件对象 e

src/App.js

```js
function App() {
  const handleClick = (e) => {
    console.log("Button被点击了", e, e.target);
  };
  return (
    <div className="App">
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

export default App;
```

传递自定义参数、既要传递自定义参数又要事件对象 e

src/App.js

```js
function App() {
  // 传递自定义参数
  // const handleClick = (name) => {
  //   console.log("Button被点击了", name);
  // };

  // 既要传递自定义参数又要事件对象e
  const handleClick = (name, e) => {
    console.log("Button被点击了", name, e);
  };
  return (
    <div className="App">
      <button onClick={(e) => handleClick("Tom", e)}>click me</button>
    </div>
  );
}

export default App;
```

## React 中的组件

组件：组件是用户界面的一部分，它可以有自己的逻辑和外观，组件之间可以 **互相嵌套，也可以复用多次**

在 React 中，一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图 UI，渲染组件只需要把他的组件当成标签书写即可

src/App.js

```js
// 1、定义组件
const Button = () => {
  // 业务逻辑 组件逻辑
  return <button>click me!</button>;
};
function App() {
  return (
    <div className="App">
      {/* 2\使用组件(渲染组件) */}
      {/* 自闭和 */}
      <Button />
      {/* 成对标签 */}
      <Button></Button>
    </div>
  );
}

export default App;
```

## useState

### 基础

useState 是一个 ReactHook(函数)，它允许我们向组建添加一个 **状态变量**，从而控制影响组件的渲染结果

本质 和普通 JS 变量不同的是 状态变量一旦发生变化组件的视图 UI 也会跟着变化 **(数据驱动视图)**

```js
const [count, setCount] = useState(0);
```

1. useState 是一个函数，返回值是一个数组
2. 数组中的第一个参数是状态变量，第二个参数是 set 函数用来修改状态的变量
3. useState 的参数将作为 count 的初始值

src/App.js

```js
// useState 实现一个计数器
import { useState } from "react";
function App() {
  // 1、调用useState 添加一个状态变量
  // count 状态变量
  // setCount 修改状态变量的方法
  const [count, setCount] = useState(0);

  // 2、点击事件回调
  const handelClick = () => {
    // 作用：1、用传入的新值修改count
    // 2、重新使用新的count渲染UI
    setCount(count + 1);
  };
  return (
    <div className="App">
      <button onClick={handelClick}>{count}</button>
    </div>
  );
}

export default App;
```

### 状态修改规则

状态不可变: 在 React 中，状态被认为是只读的，我们应该始终替换它而不是修改它，直接修改状态不能引发视图更新。

```js
let [count, setCount] = useState(0);
const handelClick = () => {
  // 直接修改无法更新;
  count++;
  console.log(count); //1  2 3  直接修改状态不能引发视图更新
  // setCount(count + 1);
};
```

修改对象状态 :规则 -> 对于对象类型的状态变量，应该始终传给 set 方法一个全新的对象来进行修改

src/App.js

```js
import { useState } from "react";
function App() {
  // 修改对象状态
  const [form, setFrom] = useState({
    name: "Jack",
  });
  const changeForm = () => {
    // form.name = "John"; 错误写法
    // 正确写法 setFrom传入一个全新的对象
    setFrom({
      ...form,
      name: "John",
    });
  };
  return (
    <div className="App">
      <button onClick={changeForm}>修改FROM {form.name}</button>
    </div>
  );
}

export default App;
```

### 组件的样式处理

React 组件基础的样式控制：行内样式、class 类名控制

```js
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
```

### classnames 优化类名控制

classnames 是一个简单的 JS 库，可以非常方便的 **通过条件动态控制 class 类名的显示**

```js
<span
  key={index}
  onClick={() => handleTabChange(item.type)}
  // className={`nav-item ${type === item.type && "active"}`}
  className={classnames("nav-item", {
    active: type === item.type,
  })}
>
  {item.text}
</span>
```

40*18*23

32*24*30
