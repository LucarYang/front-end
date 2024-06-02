B 站地址(黑马程序员前端 React18)：<https://www.bilibili.com/video/BV1ZB4y1Z7o8/?spm_id_from=333.337.search-card.all.click&vd_source=580b24c9d51959375fe3b82eddb5a966>

# 概要

| | |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| React 基础 | 工程化的环境创建、JSX、组件、useState、useEffect、useRef、自定义 Hook、智能组件和 UI 组件…… |
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

* JSX 的本质

JSX 不是标准的 JS 语法，是 JS 语法的扩展，浏览器本身不识别，需要通过解析工具解析之后才能在浏览器中运行

* bable 解析
  (<https://babeljs.io/>)

JSX

```jsx
<div>
  this is div
  <span>this is span</span>
</div>
```

babel 解析成 js

```js
import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
/*#__PURE__*/
_jsxs("div", {
    children: [
        "this is div",
        /*#__PURE__*/
        _jsx("span", {
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
    return ( <
        div className = "App" >
        this is a App {
            /* 使用引号传递字符串 */
        } {
            "this is massage"
        } {
            /* 识别JS变量 */
        } {
            count
        } {
            /* 函数调用 */
        } {
            getName()
        } {
            /* 方法调用 */
        } {
            new Date().getDate()
        } {
            /* 使用JS对象 */
        } <
        div style = {
            {
                color: "red"
            }
        } > this is div < /div> < /
        div >
    );
}
export default App;
```

### JSX 列表渲染

src/App.js

```js
const list = [{
        id: 1001,
        name: "Vue"
    },
    {
        id: 1002,
        name: "React"
    },
    {
        id: 1003,
        name: "Angular"
    },
];

function App() {
    return ( <
        div className = "App" > {
            /* 渲染列表 */
        } {
            /* 注意事项：加上独一无二的key key用于diff算法来实现DOM更新 */
        } <
        ul > {
            list.map((item, index) => ( <
                li key = {
                    index
                } > {
                    item.name
                } < /li>
            ))
        } <
        /ul> < /
        div >
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
    return ( <
        div className = "App" > {
            /* 逻辑与 && */
        } {
            islogin && < span > this is span < /span>} {
            /* 三元运算 */
        } {
            islogin ? < span > jack < /span> : <span>isloading</span >
        } <
        /div>
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
        return <div > 无图模式 < /div>;
    } else if (artcleType === 1) {
        return <div > 单模式 < /div>;
    } else if (artcleType === 3) {
        return <div > 三模式 < /div>;
    }
};

function App() {
    return <div className = "App" > {
        getArtcleTem()
    } < /div>;
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
    return ( <
        div className = "App" >
        <
        button onClick = {
            handleClick
        } > click me < /button> < /
        div >
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
    return ( <
        div className = "App" >
        <
        button onClick = {
            (e) => handleClick("Tom", e)
        } > click me < /button> < /
        div >
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
    return <button > click me! < /button>;
};

function App() {
    return ( <
        div className = "App" > {
            /* 2\使用组件(渲染组件) */
        } {
            /* 自闭和 */
        } <
        Button / > {
            /* 成对标签 */
        } <
        Button > < /Button> < /
        div >
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
import {
    useState
} from "react";

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
    return ( <
        div className = "App" >
        <
        button onClick = {
            handelClick
        } > {
            count
        } < /button> < /
        div >
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

修改对象状态 : 规则 -> 对于对象类型的状态变量，应该始终传给 set 方法一个全新的对象来进行修改

src/App.js

```js
import {
    useState
} from "react";

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
    return ( <
        div className = "App" >
        <
        button onClick = {
            changeForm
        } > 修改FROM {
            form.name
        } < /button> < /
        div >
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
    return ( <
            div className = "App" > {
                /* 行内样式 */
            } <
            span style = {
                {
                    color: "red",
                    fontSize: "120%"
                }
            } > this is span < /span> <
            span style = {
                style
            } > this is span < /span> {
            /* class类名控制 */
        } <
        span className = "foo" > this a class span < /span> < /
    div >
);
}

export default App;
```

### classnames 优化类名控制

classnames 是一个简单的 JS 库，可以非常方便的 **通过条件动态控制 class 类名的显示**

```js
< span
key = {
    index
}
onClick = {
    () => handleTabChange(item.type)
}
// className={`nav-item ${type === item.type && "active"}`}
className = {
        classnames("nav-item", {
            active: type === item.type,
        })
    } > {
        item.text
    } <
    /span>
```

## 受控表单绑定

概念：使用 React 组件的状态(useState)控制表单的状态

```js
import {
    useState
} from "react";
// 手控绑定表单
// 1、声明一个React状态 -useState

// 2、核心绑定流程
// 1.通过value属性绑定React状态
// 2.绑定onChange事件 通过时间参数e拿到输入框最新的值 反向修改到React状态

function App() {
    const [value, setValue] = useState("");
    return ( <
        div className = "App" >
        <
        input value = {
            value
        }
        onChange = {
            (e) => setValue(e.target.value)
        }
        type = "text" >
        <
        /input> < /
        div >
    );
}

export default App;
```

## React 中获取 DOM

在 React 中获取/操作 DOM 需要使用 useRef 钩子函数

```js
import {
    useRef
} from "react";

// 1、useRef生成Ref对象 绑定到DOM标签上去

// 2、dem可用时 ref.current获取dom
// 渲染完毕之后dom生成之后才可用
function App() {
    const inputRef = useRef(null);
    const showDom = () => {
        console.dir(inputRef.current);
    };
    return ( <
        div className = "App" >
        <
        input type = "text"
        ref = {
            inputRef
        } > < /input> <
        button onClick = {
            showDom
        } > 获取 < /button> < /
        div >
    );
}

export default App;
```

## 组件通信

概念：组件通信就是 **组件之间的数据传递** ，根据组件嵌套关系的不同，有不同的通信方法。

父子通信 兄弟通信 跨层通信

### 父子通信

实现步骤

1. 父组件传递数据 - 在子组件标签上绑定属性
2. 子组件接收数据 - 子组件通过 props 参数接收数据

src/App.js

```js
// 父传子
// 1. 父组件传递数据 - 在子组件标签上绑定属性
// 2. 子组件接收数据 - 子组件通过props参数接收数据

import {
    useRef
} from "react";

function Son(props) {
    // props 对象里面 包含父组件传递过来的所有数据
    console.log(props);
    return <div > this is son {
        props.name
    } < /div>;
}

function App() {
    const name = "this is App name";
    return ( <
        div className = "App" >
        <
        Son name = {
            name
        } > < /Son> < /
        div >
    );
}

export default App;
```

#### 父传子 props 说明

1. props 可以传递任意数据：数组、字符串、数组、对象、布尔值、函数、JSX
2. props 是只读的对象；子组件只能读取 props 的数据，不能直接进行修改，父组件的数据只能父组件修改。

```js
import {
    useRef
} from "react";

function Son(props) {
    // props 对象里面 包含父组件传递过来的所有数据
    console.log(props);
    return ( <
        div >
        this is son {
            props.name
        }, JSX {
            props.child
        } <
        /div>
    );
}

function App() {
    const name = "this is App name";
    return ( <
        div className = "App" >
        <
        Son name = {
            name
        }
        age = {
            19
        }
        isman = {
            true
        }
        list = {
            ["Math", "English"]
        }
        obj = {
            {
                name: "Tom"
            }
        }
        cb = {
            () => console.log("123")
        }
        child = {
            <
            span > this is porps span < /span>} / >
            <
            /div>
        );
    }

    export default App;
```

父传子 特殊的 props children

当把内容嵌套在子组件的标签中，父组件会自动在名为 children 的 prop 属性中接收该内容

```js
function Son(props) {
    // props 对象里面 包含父组件传递过来的所有数据
    console.log(props);
    return <div > this is son, {
        props.children
    } < /div>;
}

function App() {
    const name = "this is App name";
    return ( <
        div className = "App" >
        <
        Son >
        <
        span > this i span < /span> < /
        Son > <
        /div>
    );
}

export default App;
```

### 子传父

核心思路：在子组件中调用父组件中的函数并传递参数

```js
import {
    useState
} from "react";

function Son({
    onGetSonMsg
}) {
    // Son组件中的数据
    const sonMsg = "this is son msg";
    return ( <
        div >
        this is son <
        button onClick = {
            () => onGetSonMsg(sonMsg)
        } > sendMsg < /button> < /
        div >
    );
}

function App() {
    const [msg, setMsg] = useState("");
    const getMsg = (msg) => {
        console.log(msg);
        setMsg(msg);
    };
    return ( <
        div className = "App" >
        this is App, {
            msg
        } <
        Son onGetSonMsg = {
            getMsg
        }
        /> < /
        div >
    );
}

export default App;
```

### 兄弟组件通信

使用状态提升实现兄弟组件通信 ->

实现思路 -> 借助”状态提升“机制，通过父组件进行兄弟组件之间的数据传输

1. A 组件先通过子传父的方式把数据传给父组件 APP
2. APP 拿到数据后通过父传子的方式传递给 B 组件

```js
// 1、通过子传父 A -> APP
// 2、通过父传子 App -> B
import {
    useState
} from "react";

function A({
    onGetAName
}) {
    const name = "this i A name";
    return ( <
        div >
        this is A component <
        button onClick = {
            () => onGetAName(name)
        } > send < /button> < /
        div >
    );
}

function B({
    name
}) {
    return <div > this is B component, {
        name
    } < /div>;
}

function App() {
    const [name, setName] = useState("");
    const getAName = (name) => {
        console.log(name);
        setName(name);
    };
    return ( <
        div className = "App" >
        this is App <
        A onGetAName = {
            getAName
        }
        /> <
        B name = {
            name
        }
        /> < /
        div >
    );
}

export default App;
```

### 跨层组件通信

使用 context 机制跨层组件通信

实现步骤 ->

1. 使用 createContext 方法创建一个上线文的 Ctx
2. 在顶层组件(App)中通过 Ctx.Provider 组件提供数据
3. 在底层组件 B 中通过 useContext 钩子函数获取消费数据

```js
import {
    createContext,
    useContext
} from "react";

// 1、createContext方法创建一个上下文对象
const MsgContxt = createContext();

// 2、在顶层组件 通过Provider组件提供数据

// 3、在底层组件 通过useContext钩子函数使用数据
function A() {
    return ( <
        div >
        this is A component <
        B / >
        <
        /div>
    );
}

function B() {
    const msg = useContext(MsgContxt);
    return <div > this is B component, {
        msg
    } < /div>;
}

function App() {
    const msg = "this is App Msg";
    return ( <
        div className = "App" >
        <
        MsgContxt.Provider value = {
            msg
        } >
        this is App <
        A / >
        <
        /MsgContxt.Provider> < /
        div >
    );
}

export default App;
```

## useEffect

useEffect 是一个 ReactHook 函数，用于在 React 组件中创建不是由一个时间引起而是 **由渲染本身引起的操作**，比如发送 Ajax 请求，更改 DOM 等

```js
useEffect(() => {}, []);
```

参数 1 是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的造作

参数 2 是一个数组，在数组里放置依赖项，不同依赖项会影响第一个参数函数的执行， **当是一个空数组的时候，副作用函数只会在数组渲染完毕之后执行一次**

```js
import {
    useEffect,
    useState
} from "react";

const URL = "http://geek.itheima.net/v1_0/channels";

function App() {
    // 创建一个状态数据
    const [list, setList] = useState([]);
    useEffect(() => {
        // 额外的操作 获取频道列表
        async function getList() {
            const res = await fetch(URL);
            const jsonRes = await res.json();
            console.log(jsonRes);
            setList(jsonRes.data.channels);
        }
        getList();
    }, []);
    return ( <
        div className = "App" >
        this is app {
            list.map((item, index) => ( <
                li key = {
                    index
                } > {
                    item.name
                } < /li>
            ))
        } <
        /div>
    );
}

export default App;
```

### useEffect 依赖项参数说明

useEffect 副作用函数的执行实际存在多种情况，根据传入依赖项的不同，会有不同的执行表现
| 依赖项         | 副作用函数的执行时机              |
| -------------- | --------------------------------- |
| 没有依赖性     | 组件初始渲染+组将跟新的执行       |
| 空依赖项       | 只在初始渲染时执行一次            |
| 添加特定依赖项 | 组件初始渲染+特性依赖项变化时执行 |

```js
import {
    useEffect,
    useState
} from "react";

function App() {
    // 1、没有依赖项 初始+组件更新
    const [count, setCount] = useState(0);
    // useEffect(() => {
    //   console.log("副作用函数执行了");
    // });

    // 2、传入一个空数组依赖
    // useEffect(() => {
    //   console.log("副作用函数执行了");
    // }, []);

    // 3、传入的特点的依赖项 初始+依赖项变化时执行
    useEffect(() => {
        console.log("副作用函数执行了");
    }, [count]);
    return ( <
        div className = "App" >
        this is app <
        button onClick = {
            () => setCount(count + 1)
        } > {
            count
        } < /button> < /
        div >
    );
}

export default App;
```

### useEffect 清除副作用

在 useEffect 中编写的 **由渲染本身引起的对接组件外部的操作**，社区也通常叫它 **副作用操作**，比如 uesEffect 中开启一个定时器，我们想在组件卸载时把这个定时器在清理掉，这个过程就是清楚副作用

```js
useEffect(() => {
    // 实现副作用操作逻辑
    return () => {
        // 清除副作用逻辑
    };
}, []);
```

说明：清楚副作用的函数**最常见**的执行时机是在**组件卸载是自动执行**

```js
import {
    useEffect,
    useState
} from "react";

function Son() {
    // 1、渲染时开启一个定时器
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("定时器执行中ing");
        }, 1000);
        return () => {
            // 清除副作用(组件卸载)
            clearInterval(timer);
        };
    }, []);
    return <div > this is Son < /div>;
}

function App() {
    //  通过条件渲染模拟组件卸载
    const [show, setShow] = useState(true);
    return ( <
        div className = "App" > {
            show && < Son / >
        } <
        button onClick = {
            () => setShow(false)
        } > 卸载son组件 < /button> < /
        div >
    );
}

export default App;
```

## Hook

### 自定义 Hook 函数

概念 自定义 Hook 是以 **use 开头的函数**，通过自定义 Hook 函数可以用来实现**逻辑的封装和复用**

```js
// 问题：布尔切换的逻辑 和当前组件是耦合在一起的 不方便复用

// 解决思路 自定义Hook函数
import {
    useEffect,
    useState
} from "react";

function useToggle() {
    //可复用的逻辑代码
    const [value, setValue] = useState(true);

    const toggle = () => setValue(!value);

    // 哪些状态和回调函数需要在其他组件中调用 return
    return {
        value,
        toggle,
    };
}

// 封装自定义Hook通用思路：
// 1、声明一个以use开头的函数
// 2、在函数体内封装可复用的逻辑(只要是可复用的逻辑)
// 3、把组件中用到的状态或者回调return出去(以对象或者数组)
// 4、在哪个组件中要用到这个逻辑，就执行这个函数，解构出状态和回调进行使用

function App() {
    //布尔切换逻辑
    // const [value, setValue] = useState(true);
    // const toggle = () => setValue(!value);

    // 自定义Hook函数
    const {
        value,
        toggle
    } = useToggle();
    return ( <
        div className = "App" > {
            value && < div > this is div < /div>} <
            button onClick = {
                toggle
            } > toggle < /button> < /
            div >
        );
    }

    export default App;
```

### React Hooks 使用规则

1. 只能在组件中或者其他自定义 Hook 函数中使用
2. 只能在组件中顶层调用，不能嵌套在 if、for、其他函数中

```js
import {
    useEffect,
    useState
} from "react";

// useState()
function App() {
    if (true) {
        // useState();
    }
    return <div className = "App" > < /div>;
}

export default App;
```

## Redux

Redux 是 React 常用的 **集中状态管理工具** 类似于 Vue 中的 Pinia(Vuex), 可以独立于框架

作用：通过集中的管理方式管理应用的状态

1. 定义一个 **reducer** 函数(根据当前想要做的修改返回一个新的状态)
2. 使用 createStore 方法传入 reducer 函数生成一个 **store 实例对象**
3. 使用 store 实例的 **subscribe 方法**订阅数据变化(数据一旦变化，可以得到通知)
4. 使用 store 实例的 **deispath 方法提交 action 对象** 触发数据变化(告诉 reducer 你想怎么改数据)
5. 使用 store 实例的 **getState 方法**获取最新的状态数据更新到视图中

暂定

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button id="decrement">-</button>
    <span id="count">0</span>
    <button id="increment">+</button>

    <script src="https://unpkg.com/redux@4.2.1/dist/redux.min.js"></script>
    <script>
        // 1. 定义reducer函数 
        // 作用: 根据不同的action对象，返回不同的新的state
        // state: 管理的数据初始状态
        // action: 对象 type 标记当前想要做什么样的修改
        function reducer(state = {
            count: 0
        }, action) {
            // 数据不可变：基于原始状态生成一个新的状态
            if (action.type === 'INCREMENT') {
                return {
                    count: state.count + 1
                }
            }
            if (action.type === 'DECREMENT') {
                return {
                    count: state.count - 1
                }
            }
            return state
        }

        // 2. 使用reducer函数生成store实例
        const store = Redux.createStore(reducer)

        // 3. 通过store实例的subscribe订阅数据变化
        // 回调函数可以在每次state发生变化的时候自动执行
        store.subscribe(() => {
            console.log('state变化了', store.getState())
            document.getElementById('count').innerText = store.getState().count
        })

        // 4. 通过store实例的dispatch函数提交action更改状态 
        const inBtn = document.getElementById('increment')
        inBtn.addEventListener('click', () => {
            // 增
            store.dispatch({
                type: 'INCREMENT'
            })
        })

        const dBtn = document.getElementById('decrement')
        dBtn.addEventListener('click', () => {
            // 减
            store.dispatch({
                type: 'DECREMENT'
            })
        })

        // 5. 通过store实例的getState方法获取最新状态更新到视图中
    </script>
</body>

</html>
```

Redux管理数据流程梳理

![image.png](assets/3.png)

为了职责清晰，数据流向明确，Redux把整个数据修改的流程分成了**三个核心概念**，分别是：**state、action和reducer**

1. state 一个对象 存放着我们数据管理的数据状态
2. action 一个对象 用来描述你想怎么改数据
3. reducer 一个函数 更具action的描述生成一个新的state

## React - Redux

在React中舒勇Rudex 官方要求安装两个插件 Redux-Tooklit 和 react-redux

* Redux-Tooklit(RTK) 官方推荐编写Redux逻辑的方式，是一套工具的集合，简化书写方式
  * 简化store的配置方式
  * 内置immer支持可变式状态修改
  * 内置thunk更好的异步创建
* react-redux 用来链接Redux和react的中间件
  Redex --(获取状态)--> react-reduc <--(更新状态)-- React组件

配置基础环境

1. 使用 CRA 快速创建 React 项目

```bash
npx create-react-app react-redux  
```

1. 安装配套工具

```bash
npm i @reduxjs/toolkit  react-redux 
```

1. 启动项目

```bash
npm run start 
```

创建store目录 store目录结构设计

```
  |-store
    |- module
      |- channelStore.js
      |- couterStore.js
    |- index.js
 ```

1. 通常集中状态管理的部分都会单独创建一个单独的`store`目录
2. 应用通常会有很多个子store模块，所以创建一个`module`目录，在内部编写业务分类的子store
3. store中的入口文件index.js的作用是组合module中所有的子模块，并导出store

src/store/module/counterStore.js

```js
import {createSlice} from '@reduxjs/toolkit'

const counterStore=createSlice({
    name:'counter',
    // 初始化状态
    initialState:{
        count:0
    },
    // 修改数据的方法 同步方法 支持直接修改
    reducers:{
        inscrement(state){
            state.count++
        },descrement(state){
            state.count--
        }
    }
})

// 解构出来actionCreater函数
const {inscrement,descrement}=counterStore.actions

//  获取reducer
const reducer=counterStore.reducer

// 以按需导出的方式 导出actionCreater
export {inscrement,descrement}

// 以默认导出的方式 导出reducer
export default  reducer
```

src/store/index.js

```js
import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import counterReducer from './modules/counterStore'

const store=configureStore({
    reducer:{
        count:counterReducer
    }
})

export default store
```

### 为React注入store

为react注入store负责把Redux和React链接起来，内置Provide组件 通过store参数把创建好的store实例注入到应用中，链接正式建立

src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import {
    Provider
} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    React.StrictMode >
    <
    Provider store = {
        store
    } >
    <
    App / >
    <
    /Provider> < /
    React.StrictMode >
);
reportWebVitals();
```

### React组件中使用store中的数据

在React组件中使用store中的数据，需要用到一个钩子函数 -useSeletor,它的作用是把store中的数据映射到组件中

src/App.js

```js
import { useSelector } from "react-redux";

function App() {
  const  {count}=useSelector(state=>state.counter)
  return (
    <div className="App">
     {count}
    </div>
  );
}

export default App;

```

### React组件中修改store中的数据

React组件中修改store的数据需要借助另一个hook函数 -useDispatch，它的作用是生成提交action对象的dispatch函数
src/App.js

```js
import { useSelector, useDispatch } from "react-redux";
// 导入actionCreater
import { inscrement,descrement } from "./store/modules/counterStore";

function App() {
  const { count } = useSelector((state) => state.counter);

  // 得到deipatch函数
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button onClick={()=>dispatch(inscrement())}>+</button>
      {count}
      <button onClick={()=>dispatch(descrement())}>-</button>
    </div>
  );
}

export default App;
```

### 提交action传参

在reducers 的同步修改方法中**添加action对象参数**，在**调用actionCreater的时候传递参数**，参数会被传递到**action对象payload属性**上

src/store/module/counterStore.js

```js
const counterStore=createSlice({
       //...
    reducers:{
       //...
        addToNum(state,action){
            state.count=action.payload
        }
    }
})

const {inscrement,descrement,addToNum}=counterStore.actions
//...
export {inscrement,descrement,addToNum}
```

src/App.js

```js
//...
import { inscrement,descrement,addToNum } from "./store/modules/counterStore";

function App() {
  //...
  return (
    <div className="App">
      <button onClick={()=>dispatch(inscrement())}>+</button>
      {count}
      <button onClick={()=>dispatch(descrement())}>-</button>
      <button onClick={()=>dispatch(addToNum(10))}>add to 10</button>
      <button onClick={()=>dispatch(addToNum(20))}>add to 20</button>
    </div>
  );
}
//...

```

### Redex与React 异步状态操作

1. 创建store的写法保持不变，配置好同步修改状态的方法
2. 单独封装一个函数，在函数内部return一个新函数，在新函数中：
   1. 封装异步请求获取数据
   2. 调用actionCreater传入异步数据生成一个action对象，并把dispatch提交
3. 组件中dispatch的写法保持不变

# 哈哈

小米空气净化器
4 250 555
4lite 240*240*533.5
作用：通过集中地管理方式管理应用的状态
