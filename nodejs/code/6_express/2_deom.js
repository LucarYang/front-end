// 1、导入express
const express=require('express')

// 2、创建应用对象

const app=express()

// 3、创建路由
// app.get('/request',(req,res)=>{
    // // 原生操作
    // console.log(req.method)
    // console.log(req.url)
    // console.log(req.httpVersion)
    // console.log(req.headers)

    // // express操作
    // console.log(req.path)
    // console.log(req.query)
    // console.log(req.ip) //获取IP
    // console.log(req.get('host'))
    // res.end('hello express')
// })
app.get('/:id.html',(req,res)=>{
    // 获取路由URL参数
    console.log(req.params)
    res.setHeader('content-type','text/html;charset=utf-8')
    res.end('商品')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})