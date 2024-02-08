// 1、导入express
const express=require('express')

// 2、创建应用对象

const app=express()

// 设置静态资源中间件
app.use(express.static(__dirname+'/public'))


// 3、创建路由
app.get('/home',(req,res)=>{
    res.send(' home')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})