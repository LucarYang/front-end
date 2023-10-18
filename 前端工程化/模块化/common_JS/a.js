// const getMes = require('./b')
// console.log('我是 a 文件')
// exports.say = function () {
//   const message = getMes()
//   console.log(message)
// }
// console.log('我是 a 文件')
// exports.say = function () {
//   const getMes = require('./b')
//   const message = getMes()
//   console.log(message)
// }

// exports.name = `《React进阶实践指南》`
// exports.author = `我不是外星人`
// exports.say = function () {
//   console.log(666)
// }

// module.exports = {
//   name: '《React进阶实践指南》',
//   author: '我不是外星人',
//   say() {
//     console.log(666)
//   }
// }

// exports.username = 'alien' // 此时 exports.name 是无效的
// module.exports = {
//   name: '《React进阶实践指南》',
//   author: '我不是外星人',
//   say() {
//     console.log(666)
//   }
// }

let a = 1
module.exports = a // 导出函数

module.exports = [1, 2, 3] // 导出数组

module.exports = function () { } //导出方法