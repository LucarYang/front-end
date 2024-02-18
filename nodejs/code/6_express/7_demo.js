
const express=require('express')
const bodeParser=require('body-parser')

// 创建应用对象
const app=express()

// 解析json格式的请求体的中间件的中间件
const jsonParser=bodeParser.json()

// 解析querystring格式的请求体的中间件
const urlencodeParser=bodeParser.urlencoded({extended:false})

// 创建路由规则
app.get('/login',(req,res)=>{
    // res.send('表单页面')
    res.sendFile(__dirname+'/demo.html')
})

// post规则
app.post('/login',urlencodeParser,(req,res)=>{
    console.log(req.body)
    res.send('获取用户数据')
})

// 启动服务
app.listen(3000,()=>{
    console.log('服务已启动')
})