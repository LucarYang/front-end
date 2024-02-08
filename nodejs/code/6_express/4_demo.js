// 1、导入express
const express=require('express')
const fs=require('fs')
const path=require('path')

// 2、创建应用对象

const app=express()

// 声明中间件函数
function recordMiddleware(req,res,next){
    let {url, ip}=req
    // 将信息保存在acces.log
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url}, ${ip} \r\n`)
    // 调用next
    next()
}

// 使用中间件函数
app.use(recordMiddleware)

// 3、创建路由
app.get('/home',(req,res)=>{
    res.send('前台 home')
})

app.get('/admin',(req,res)=>{
    res.send('后台 admin')
})

app.all('/*',(req,res)=>{
    res.send('404 not found')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})