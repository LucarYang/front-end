// 导入express
const express=require('express')
// 导入path
const path=require('path')

// 创建应用对象

const app=express()
// 1 设置模板引擎
app.set('view engine','ejs')//pug twing
// 2 设置模板文件存放的位置
app.set('views',path.resolve(__dirname,'./views'))

// 创建路由
app.get('/home',(req,res)=>{
    // 3 render 响应
    // res.render('模板的文件','数据')
    let title='我是title'
    res.render('home',{title})
})

// 监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})