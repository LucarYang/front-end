// 导入uniq 包
// const uniq=require('uniq')
// const uniq=require('./node_modules/uniq')
const uniq=require('./node_modules/uniq/uniq.js')

// 使用函数
let arr=[1,2,2,3,4,5,5,6]

const res=uniq(arr)

console.log(res)

