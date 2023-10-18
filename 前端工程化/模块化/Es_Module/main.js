// console.log('main.js开始执行')
// import say from './a.js'
// import say1 from './b.js'
// say()
// say1()
// console.log('main.js执行完毕')


// import { addNumber, num } from './a.js'
// console.log(num) // num = 1
// addNumber()
// console.log(num) // num = 2

// setTimeout(() => {
//   const result = import('./b.js')
//   result.then(res => {  //const result: Promise<typeof import("e:/newcode/git/TS/Project/Es_Module/b")>
//     console.log(res)
//   })
// }, 0);


// [Module: null prototype] {
//   default: [Function: sayhello],
//   name: 'alien'
// }


import { addNumber } from './a.js'
addNumber()