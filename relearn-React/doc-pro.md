# useReducer

和 useState 的作用类似，用来管理相对复杂的数据

1. 定义一个 reducer 函数(根据不同的 action 返回不同的新状态)
2. 在组件中调用 useReducer,并出入 reducer 函数和初始值
3. 事件发生时,通过 dispatch 函数分派一个 action 对象(通知 reducer 返回哪个新状态并渲染 UI)

ser\App.js

```js
import { useReducer } from "react";

// useReducer
// 1.定义reducer函数 根据不同的action返回不同的状态

function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

// 2.在组件中调用useRducer(reducer,0)=>[state,dispatch]

// 3.调用dispatch({type:'INC'})=>通知reducer产生一个新的状态 使用新状态更新UI

function App() {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div className="App">
      this is react app
      <button onClick={() => dispatch({ type: "DEC" })}>-</button>
      {state}
      <button onClick={() => dispatch({ type: "INC" })}>+</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>
        UPDATE
      </button>
    </div>
  );
}

export default App;
```

# useMemo

在组件每次重新渲染的时候缓存计算的结果

```js
// useMemo
// 缓存：小号非常大的计算
import { useMemo, useState } from "react";

// 计算斐波那契数列之和
function fib(n) {
  console.log("函数执行了");
  if (n < 3) return 1;
  return fib(n - 2) + fib(n - 1);
}

function App() {
  const [count1, setCount1] = useState(0);
  const result = useMemo(() => {
    // 返回计算得到的结果
    return fib(count1);
  }, [count1]);

  // const result = fib(count1);

  const [count2, setCount2] = useState(0);
  console.log("组件重新渲染了");
  return (
    <div className="App">
      this is react app
      <button onClick={() => setCount1(count1 + 1)}>
        change count1:{count1}
      </button>
      <button onClick={() => setCount2(count2 + 1)}>
        change count2:{count2}
      </button>
      {result}
    </div>
  );
}

export default App;
```

# React.memo

允许组件在 Props 没有改变的情况下跳过渲染

React 组件默认的渲染机制：只要父组件重新渲染子组件就会重新渲染

```js
// React.memo

import { memo, useState } from "react";

// 1.验证默认的渲染机制，子跟父一起渲染

// 2.memo进行缓存,只有props发生变化的时候才会重新渲染

const MemoSon = memo(function Son() {
  console.log("我是子组件，我重新渲染了");
  return <div>this is Son</div>;
});
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}++</button>
      <MemoSon />
    </div>
  );
}

export default App;
```

## props 比较机制

机制：在使用 memo 缓存组件之后，React 会对每一个 prop 使用 Object.is 比较新值和老值，返回 true，表示没有变化

- prop 是简单类型

  Object.is(3,3)=>true 没有变化

- prop 是引用类型(对象/数组)

  Object.is([],[])=>false React 只关心引用是否变化

简单类型

```js
// React.memo

// 1.传递一个简单类型prop prop变化时组件重新渲染

import { memo, useState } from "react";

const MemoSon = memo(function Son({ count }) {
  console.log("我是子组件，我重新渲染了");
  return <div>this is Son{count}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  const num = 1000;
  return (
    <div className="App">
      <MemoSon count={num} />
      <button onClick={() => setCount(count + 1)}>change count</button>
    </div>
  );
}

export default App;
```

复杂类型

```js
// React.memo

// 1.传递一个简单类型prop prop变化时组件重新渲染
// 2.传递一个复杂类型prop 比较新值和旧值的引用是否相等 当父组件的函数重新执行时，实际上形成的是新的数组引用
// 3.保证引用稳定 ->useMemo 组件渲染过程中缓存一个值

import { memo, useMemo, useState } from "react";

const MemoSon = memo(function Son({ list }) {
  console.log("我是子组件，我重新渲染了");
  return <div>this is Son{list}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  const list = useMemo(() => {
    return [1000, 1, 2, 3];
  }, []);
  return (
    <div className="App">
      <MemoSon list={list} />
      <button onClick={() => setCount(count + 1)}>change count</button>
    </div>
  );
}

export default App;
```

# useCallback

在组件多次重新渲染的时候缓存函数

```js
// useCallback

import { memo, useCallback, useState } from "react";

const Input = memo(function Input({ onChange }) {
  console.log("子组件重新渲染了");
  return <input type="text" onChange={(e) => onchange(e.target.value)} />;
});

function App() {
  // 传给子组件的函数
  const changeHandler = useCallback((value) => console.log(value), []);
  // 触发父组件重新渲染的函数
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      {/* 把函数作为哦prop传给子组件 */}
      <Input onChange={changeHandler} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

export default App;
```

# React.forwardRef

使用 ref 暴露 DOM 节点给父组件

```js
import { forwardRef, useRef } from "react";

// 子组件
// function Son() {
//   return <input type="text" />;
// }

const Son = forwardRef((porps, ref) => {
  return <input type="text" ref={ref} />;
});

function App() {
  const sonRef = useRef(null);
  const showRef = () => {
    console.log(sonRef);
    sonRef.current.focus();
  };
  return (
    <div className="App">
      <Son ref={sonRef} />
      <button onClick={showRef}>focus</button>
    </div>
  );
}

export default App;
```

# useImperativeHandle

通过 ref 暴露子组件中的方法

```js
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
```

# Class API

编写类组件

- 类组件基础结构

  - 类组件就是通过 JS 中类来组织组件的代码

  1. 通过类属性 state 定义状态数据
  2. 通过 setState 方法来修改状态数据
  3. 通过 render 来写 UI 模版(JSX 语法一致)

```js
import { Component } from "react";

class Counter extends Component {
  // 编写组见得逻辑
  // 1.状态变量 2.事件回调 3.UI模版JSX

  // 1.定义状态变量
  state = {
    count: 0,
  };

  // 2.定义事件回调修改状态数据
  setCount = () => {
    // 修改状态数据
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return <button onClick={this.setCount}>{this.state.count}</button>;
  }
}
function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
```

## 类组件的生命周期函数

概念：组件从创建到销毁的各个阶段自动执行的函数就是生命周期函数

- componentDidMount 组件加载完成自动执行 > 异步数据获取
- componentDidUopdate
- componentwillunmount 组件卸载时自动执行 > 情路副作用

```js
import { Component, useState } from "react";

class Son extends Component {
  // 声明周期函数

  // 组件渲染完毕执行一次 发送网路请求
  componentDidMount() {
    console.log("组件渲染完毕 请求发送起来");
    // 开启一个定时器
    this.timer = setInterval(() => {
      console.log("我还在");
    }, 1000);
  }

  // 组件卸载的时候执行  副作用清理的工作 清楚定时器 清除事件绑定
  componentWillUnmount() {
    console.log("卸载了");
    // 清楚定时器
    clearInterval(this.timer);
  }

  render() {
    return <div>I am Son</div>;
  }
}
function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && <Son />}
      <button onClick={() => setShow(false)}>unmount Son </button>
    </div>
  );
}

export default App;
```

## 类组件的通信说明

概念 类组件的 Hooks 编写的组件在组件通信的思想上完全一致(类组件依赖于 this)

1. 父传子 通过 prop 绑定数据
2. 子传父 通过 porp 绑定父组件中的函数，子组件调用
3. 兄弟通信 状态提升 通过父组件做桥接

父传子

```js
import { Component } from "react";

// 父传子 直接通过在子组件标签上绑定父组件中数据即可

class Son extends Component {
  render() {
    // 使用this.props.

    return <div>I am Son {this.props.msg}</div>;
  }
}

class Parent extends Component {
  state = {
    message: "this is parent msg",
  };
  render() {
    return (
      <div>
        I am Parent
        <Son msg={this.state.message} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}

export default App;
```

子传父

```js
import { Component } from "react";

// 父传子 直接通过在子组件标签上绑定父组件中数据即可
// 子传父 在子组件标签上绑定父组件中的函数， 在子组件中调用这个函数传递参数

class Son extends Component {
  render() {
    // 使用this.props.
    return (
      <div>
        <div>I am Son {this.props.msg}</div>
        <button onClick={() => this.props.onGetSonMsg("我是son组件中的数据")}>
          sedMsgToParent
        </button>
      </div>
    );
  }
}

class Parent extends Component {
  state = {
    message: "this is parent msg",
  };
  getSonMsg = (sonMsg) => {
    console.log(sonMsg);
  };
  render() {
    return (
      <div>
        I am Parent
        <Son msg={this.state.message} onGetSonMsg={this.getSonMsg} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}

export default App;
```

# zustand

极简的状态管理工具

创建 store <状态数据 操作方法> -->-->(绑定组件)-->--> Component <消费数据和方法>

安装 zustand

```bash
npm i zustand
```

```js
import { create } from "zustand";

// 1.创建store
// 语法容易出错
// 1. 函数参数必须返回一个对象 对象内部编写我们的状态和方法
// 2.set是用来修改数据的专门方法 必须调用它来修改数据
// 语法1：参数式函数 需要用到老数据的场景
// 语法2：参数直接是一个对象 set({ count: 100 });

const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      })); //基于源数据做计算  参数是函数
      // set({ count: 100 }); //基于源数据做修改  参数是对象
    },
  };
});

// 2.绑定store到组件
//  userStore=> { count, inc };

function App() {
  const { count, inc } = useStore();
  return (
    <div className="App">
      <button onClick={inc}>{count}</button>
    </div>
  );
}

export default App;
```

## zustand 异步支持

对异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要调用 set 方法传入新的状态即可

```js
import { create } from "zustand";
import { useEffect } from "react";
const URL = "http://geek.itheima.net/v1_0/channels";
// 1.创建store
// 语法容易出错
// 1. 函数参数必须返回一个对象 对象内部编写我们的状态和方法
// 2.set是用来修改数据的专门方法 必须调用它来修改数据
// 语法1：参数式函数 需要用到老数据的场景
// 语法2：参数直接是一个对象 set({ count: 100 });

const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      })); //基于源数据做计算  参数是函数
      // set({ count: 100 }); //基于源数据做修改  参数是对象
    },
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
```

## zustand 切片模式

场景：当单个 store 比较大的时候，可以采用切片模式进行模块化组合，类似于模块化

# React 与 TypeScript

基于 Vite 创建项目

```bash
npm create vite@latest react-ts-pro -- --template react-ts
```

## useState 与 TypeScript

useState 自动推到方式

通常 React 会根据传入 useState 的默认值来自动推到类型，不需要显示标注类型

```tsx
// 根据初始值自动推断
// 场景 > 明确的初始值

import { useState } from "react";

function App() {
  const [value, taggle] = useState(false);
  const [list, setList] = useState([1, 2, 3]);
  // const changeValue = () => {
  //   taggle(true)
  // }
  const changeList = () => {
    setList([5]);
  };
  return (
    <>
      <div>
        {" "}
        this is app{value}
        {list}
      </div>
    </>
  );
}

export default App;
```

## useState 传递泛型参数

useState 本身是一个泛型函数 可以传入具体的自定义类型

```tsx
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User>();
```

说明

1. 限制 useState 函数参数的初始值必须满足类型为：User | ()=>User
2. 限制 setUser 函数的参数必须满足类型为：User|()=>User|undefined
3. use 状态数据具备 User 类型相关的类型提示

```tsx
// 根据初始值自动推断
// 场景 > 明确的初始值

import { useState } from "react";
type User = {
  name: string;
  age: number;
};

function App() {
  // 限制初始值
  // const [user, setUser] = useState<User>({
  //   name: 'jack',
  //   age: 12
  // })

  const [user, setUser] = useState<User>(() => {
    return {
      name: "jack",
      age: 12,
    };
  });

  const changeUser = () => {
    setUser(() => ({
      name: "Tom",
      age: 12,
    }));
  };
  return (
    <>
      <div> this is app {user.name}</div>
    </>
  );
}

export default App;
```

## useState 初始值为 null

当我们不知道状态的初始值是什么，将 useState 的初始值为 null 是一个常见的做法，可以通过具体类型联合 null 来做显示注释

```tsx
type User = {
  name: String;
  age: number;
};
const [user, setUser] = useState<User | null>(null);
```

说明：

1. 限制 useState 函数参数的初始值可以是 User|null
2. 限制 setUser 函数的参数类型可以是 User|null

```tsx
import { useState } from "react";
type User = {
  name: string;
  age: number;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const changUser = () => {
    setUser(null);
    setUser({
      name: "toom",
      age: 12,
    });
  };
  return (
    <>
      {/* 为了类型安全，可选链做类型守卫
      只有user不为null(不为空值)的时候才进行点运算 */}
      <div> this is app{user?.age}</div>
    </>
  );
}

export default App;
```

# Props 与 TypeScript

为组件 prop 添加类型，本质是给函数的参数做类型注解，可以使用 type 对象类型或者 Interface 接口来做注释

```ts
type Props = {
  className: string;
};
function Button(props: Props) {
  const { className } = props;
  return <button className={className}>click me</button>;
}
```

说明：Button 组件只能传入 className 的 prop 参数，类型 string，且为必填

```tsx
// type写法
// type Props = {
//   className: string;
// };

interface Props {
  className: string;
  title?: string;
}

function Button(props: Props) {
  const { className } = props;
  return <button className={className}>click me</button>;
}

function App() {
  return (
    <>
      <div> this is app</div>
      <Button className="test" />
    </>
  );
}

export default App;
```

## Props 与 TypeScript -为 children 添加类型

children 是一个比较特殊的 prop，支持多种不同类型数据传入，需要通过一个内置的 ReactNode 类型来做注解

```ts
type Props = {
  className: string;
  children: React.ReactNode;
};
function Button(props: Props) {
  const { className, children } = props;
  return <button className={className}>{children}</button>;
}
```

说明：注解之后，children 可以是多种类型，包括：React.ReactElement、string、number、React.ReactFragment、React.ReactPortal、boolean、null、undefined

```tsx
type Props = {
  className: string;
  children: React.ReactNode;
};

function Button(props: Props) {
  const { className, children } = props;
  return <button className={className}>{children}</button>;
}

function App() {
  return (
    <>
      <div> this is app</div>
      <Button className="test">click me</Button>
      <Button className="test">
        <span>this is span</span>
      </Button>
    </>
  );
}

export default App;
```

## Props 与 TypeScript 为事件 prop 添加类型

组件经常执行类型为函数的 prop 实现子传父，这类 prop 重点在于函数参数类型的注解

```ts
type Props = {
  onGetMsg?: (msg: string) => void;
};
function Son(props: Props) {
  const { onGetMsg } = props;

  const clickMsg = () => {
    onGetMsg?.("this is msg");
  };

  return <button onClick={clickHandler}>sending</button>;
}
```

1. 在组件内部调用时需要遵守类型的约束，参数传递需要满足需求
2. 绑定 prop 时如果绑定内联函数直接可以推断出参数类型，负责需要单独注解匹配的参数类型

```tsx
type Props = {
  onGetMsg?: (msg: string) => void;
};

function Son(props: Props) {
  const { onGetMsg } = props;
  const clickHandler = () => {
    onGetMsg?.("this is msg");
  };
  return <button onClick={clickHandler}>click me</button>;
}

function App() {
  const getMsgHandler = (msg: string) => {
    console.log(msg);
  };

  return (
    <>
      <div> this is app</div>
      <Son onGetMsg={getMsgHandler} />
    </>
  );
}

export default App;
```

# useRef 与 Typescript

## useRef 与 Typescript - 获取 dom

获取 dom 的场景，可以直接把要获取的 dom 元素的类型当场泛型参数传递给 useRef，可以推导出.crreunt 属性的类型

```tsx
import { useEffect, useRef } from "react";

// 1.获取dom
function App() {
  const domRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // 可选链 前面不为空值(null /undefined)执行点运算
    // 类型守卫防止出现空值.运算错误
    domRef.current?.focus();
  }, []);
  return (
    <>
      <input ref={domRef} />
      <div> this is app</div>
    </>
  );
}

export default App;
```

## useRef 与 Typescript - 引用稳定存储器

把 useRef 当成引用稳定的存储器适用的场景可以通过泛型传入联合类型来做，比如定时器的场景

```tsx
import { useEffect, useRef } from "react";

// 1.获取dom
// 2. 稳定引用的存储器(定时器管理)
function App() {
  const domRef = useRef<HTMLInputElement>(null);
  const timerID = useRef<number | undefined>(undefined);
  useEffect(() => {
    // 可选链 前面不为空值(null /undefined)执行点运算
    // 类型守卫防止出现空值.运算错误
    domRef.current?.focus();
    timerID.current = setInterval(() => {
      console.log("123");
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);
  return (
    <>
      <input ref={domRef} />
      <div> this is app</div>
    </>
  );
}

export default App;
```
