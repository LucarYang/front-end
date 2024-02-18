// 1、导入express
const express=require('express')

const homeRouter=require('./routes/homeRouter')
const adminRouter=require('./routes/adminRouter')

// 2、创建应用对象

const app=express()

// 设置
app.use(homeRouter)
app.use(adminRouter)

// 3、创建路由
// app.get('/home',(req,res)=>{
//     res.end('hello express')
// })

app.get('/',(req,res)=>{
    res.end('home')
})

app.post('/login',(req,res)=>{
    res.end('login')
})

app.all('/test',(req,res)=>{
    res.end('test')
})

app.all('/*',(req,res)=>{
    res.end('404 not found')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})