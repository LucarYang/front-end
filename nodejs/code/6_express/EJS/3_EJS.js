
const ejs=require('ejs')
// 变量
let isLogin=false

// 原生JS
// if(isLogin){
//     console.log('<p>欢迎回来</p>')
// }else{
//     console.log('<button>登录</button> <button>注册</button>')
// }

// EJS实现
const fs=require('fs')
let html=fs.readFileSync('./3_html.html').toString()
let result=ejs.render(html,{isLogin})

console.log(result)