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
