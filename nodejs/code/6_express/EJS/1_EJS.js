// 导入EJS
const ejs=require('ejs')
const fs=require('fs')

// 字符串
let china='中国'
let weather='今天天气不错'
// let str=`I Love U ${china}`

// 使用ejs渲染
let str=fs.readFileSync('./1_html.html').toString()
let result=ejs.render(str,{china:china,weather})

console.log(result)