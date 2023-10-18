# CommonJS
* 在 commonjs 中每一个 js 文件都是一个单独的模块，我们可以称之为 module；
* 该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require；
* exports 和 module.exports 可以负责对模块中的内容进行导出；
* require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；
```js
//add.js add导出
function add(x, y) {
  return x + y
}
module.exports = add;
//main.js 导入add
var add = require("./add")
var sum = add(1, 2)
console.log(sum)
```
## require 加载标识符
```js
const fs =      require('fs')      // ①核心模块
const MyAdd = require('./add.js')  //② 文件模块
const crypto =  require('crypto-js')   // ③第三方自定义模块
````
其中fs为 nodejs 底层的核心模块；MyAdd为我们编写的文件模块；crypto为我们通过 npm 下载的第三方自定义模块
* 核心模块的处理：核心模块的优先级仅次于缓存加载，在 Node 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。
* 路径形式的文件模块处理：已 ./ ，../ 和 / 开始的标识符，会被当作文件模块处理。require() 方法会将路径转换成真实路径，并以真实路径作为索引，将编译后的结果缓存起来
* 自定义模块处理： 自定义模块，一般指的是非核心的模块，它可能是一个文件或者一个包，它的查找会遵

### require 模块引入与处理
#####
a.js
```js
const getMes = require('./b')
console.log('我是 a 文件')
exports.say = function () {
  const message = getMes()
  console.log(message)
}
```
b.js
```js
const say = require('./a')
const object = {
  name: '《React进阶实践指南》',
  author: '我不是外星人'
}
console.log('我是 b 文件')
module.exports = function () {
  return object
}
```
main.js
```js
const a = require('./a')
const b = require('./b')

console.log('node 入口文件')
````
node main.js结果
```
我是 b 文件
我是 a 文件
node 入口文件
```
#### main.js 和 a.js 模块都引用了 b.js 模块，但是 b.js 模块只执行了一次。
a.js 模块 和 b.js 模块互相引用，但是没有造成循环引用的情况。
执行顺序是父 -> 子 -> 父；
- node main.js  -> todo:执行第一行 require(a.js) 
- todo:判断 a.js 有没有缓存?没有缓存 ->先加入缓存(先加入缓存， 后执行模块内容)
- tode:执行文件 a.js->引用 b.js
- todo:判断 b.js 有没有缓存?没有缓存，所以加入缓存 ->todo: b.js 执行->引用 a.js(已存在)->打印 console.log('我是 b 文件') ->导出方法
- todo:b.js 执行完毕 -> 回到 a.js 文件打印 console.log('我是 a 文件')
- todo:a.js 执行完毕 -> 最后回到 main.js，打印 console.log('node 入口文件')

### require 动态加载
```js
console.log('我是 a 文件')
exports.say = function () {
  const getMes = require('./b')
  const message = getMes()
  console.log(message)
}


const a = require('./a')
a.say()
const b = require('./b')

console.log('node 入口文件')

```

## webpack 打包commonJS
##### 参照：https://www.yii666.com/blog/288844.html
安装webpack
```bash
npm install webpack -D
```
build.js
```js
const webpack = require('webpack')

function f1() {
  return webpack({
    entry: './Project/common_JS/main.js',
    mode: 'none',
    output: {
      iife: false,
      pathinfo: 'verbose' // verbose: 冗余；尽可能的详细
    }
  })
}

f1().run((err, stat) => {
  console.log('打包')
})
```
打包 即生成在dist下main.js文件
```js
// 执行
node build.js

// ---------------main.js 解读--------------------------------
//  存放的模块，是一个数组
 var __webpack_modules__ = ([
/*!************** ./Project/common_JS/add.js ******************/
/*! unknown exports (runtime-defined)  runtime requirements: module *  CommonJS bailout: module.exports is used directly at 4:0-14 */
((module) => {
    // add.js 中的内容
    function add(x, y) {
      return x + y
    }
    module.exports = add;

})
]);
/*********The module cache 模块缓存（也就是说如果模块已经被引用过了就直接从这儿拿）***********/
var __webpack_module_cache__ = {};
// The require function  //moduleId 为 __webpack_modules__ 的下标
 function __webpack_require__(moduleId) {
 	// Check if module is in cache  //如果能从缓存里面拿到，则直接返回
 	var cachedModule = __webpack_module_cache__[moduleId];
 	if (cachedModule !== undefined) {
 		return cachedModule.exports;
 	}
 	// Create a new module (and put it into the cache) //缓存内拿不到，则创建一个对象同时内部包含一个 exports 对象并存入到缓存内
 	var module = __webpack_module_cache__[moduleId] = {
 		// no module.id needed
 		// no module.loaded needed
 		exports: {}
 	};
 
 	// Execute the module function
  // 接着通过执行 __webpack_modules__  中的moduleId对应函数并传入 module 对象
  // 通过函数内赋值 module.exports 获得 sum 函数
 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
 
 	// Return the exports of the module //最后返回 module 中的 exports 对象
 	return module.exports;
 }
 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./Project/common_JS/main.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
var add = __webpack_require__(/*! ./add */ 1)
var sum = add(1, 2)
console.log(sum)
})();

```

## require 动态加载
a.js
```js
console.log('我是 a 文件')
exports.say = function () {
  const getMes = require('./b')
  const message = getMes()
  console.log(message)
}
````
### main.js
```js
const a = require('./a')
a.say()
// 我是 a 文件
// 我是 b 文件
// { name: '《React进阶实践指南》', author: '我不是外星人' }
```
require 本质上就是一个函数，那么函数可以在任意上下文中执行，来自由地加载其他模块的属性方法。
## exports 和 module.exports
### exports 使用
a.js
```js
exports.name = `《React进阶实践指南》`
exports.author = `我不是外星人`
exports.say = function () {
  console.log(666)
}
```
main.js
```js
const a = require('./a')
console.log(a)

// {
//   name: '《React进阶实践指南》',
//   author: '我不是外星人',
//   say: [Function (anonymous)]
// }
```
exports 就是传入到当前模块内的一个对象，本质上就是 module.exports。

### module.exports 使用
a.js
```js
module.exports = {
  name: '《React进阶实践指南》',
  author: '我不是外星人',
  say() {
    console.log(666)
  }
}
```
main.js
```js
const a = require('./a')
console.log(a)

// { name: '《React进阶实践指南》', author: '我不是外星人', say: [Function: say] }
```
#### exports和module.exports 区别：
- 导出对象：exports 是一个对象，用于从一个模块中导出函数、对象或原始值，使得它们可以被其他模块引用。
- 导出模块：module.exports 是一个特殊的对象，它代表了模块的导出接口。你可以将 module.exports 视为当前模块的导出对象。


module.exports 也可以单独导出一个函数或者一个类
```js
module.exports = function (){
    // ...
}
```
