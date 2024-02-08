// 1、导入express
const express=require('express')
const fs=require('fs')
const path=require('path')

// 2、创建应用对象

const app=express()

// 声明中间件函数
let checkCodeMiddleware=(req,res,next)=>{
    if(req.query.code==='521'){
        next()
    }else{
        res.send('错误')
    }
}


// 3、创建路由
app.get('/home',(req,res)=>{
    res.send('前台 home')
})

app.get('/admin',checkCodeMiddleware,(req,res)=>{
    res.send('后台 admin')
})

app.get('/setting',checkCodeMiddleware,(req,res)=>{
    res.send('后台 setting')
})

app.all('/*',(req,res)=>{
    res.send('404 not found')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})