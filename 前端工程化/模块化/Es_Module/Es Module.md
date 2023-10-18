# ES6 module
#### ES6 module 的引入和导出是静态的，import 会自动提升到代码的顶层 ，import , export 不能放在块级作用域或条件语句中。
##### 注意：package.json中type设置为module 开启ES6 module模式
```js
{
  "name": "ts",
  "version": "1.0.0",
  "type": "module"
}
```
## 执行特性 
ES6 模块提前加载并执行模块文件，ES6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。
a.js
```js
import b from './b.js'
b
console.log('a模块加载')
export default function say() {
  console.log('hello  A')
}
```
b.js
```js
console.log('b模块加载')
export default function sayhello() {
  console.log('hello B')
}
```
main.js
```js
console.log('main.js开始执行')
import say from './a.js'
import say1 from './b.js'
say()
say1()
console.log('main.js执行完毕')

// b模块加载      
// a模块加载      
// main.js开始执行
// hello  A       
// hello B        
// main.js执行完毕
```
## 导出绑定
不能修改import导入的属性
a.js
```js
export let num = 1
export const addNumber = () => {
  num++
}
```
main.js
```js

import { addNumber, num } from './a'
num = 2 //Assignment to constant variable. //num is readonly
// addNumber()
```
## import() 动态引入
import() 返回一个 Promise 对象， 返回的 Promise 的 then 成功回调中，可以获取模块的加载成功信息。我们来简单看一下 import() 是如何使用的。
b.js
```js
export const name = 'alien'
export default function sayhello() {
  console.log('hello,world')
}
```
main.js
```js
setTimeout(() => {
  const result = import('./b.js')//const result: Promise<typeof import("e:/newcode/git/TS/Project/Es_Module/b")>
  result.then(res => {  
    console.log(res)
  })
}, 0);


// [Module: null prototype] {
//   default: [Function: sayhello],
//   name: 'alien'
// }
```
- import() 可以动态使用，加载模块。
- import() 返回一个 Promise ，成功回调 then 中可以获取模块对应的信息。 name 对应 name 属性， default 代表 export default 。__esModule 为 es module 的标识。

## tree shaking 实现

参照：https://juejin.cn/post/6994224541312483336?searchId=202309111516174ADD32EF62F3700A9F26#heading-8