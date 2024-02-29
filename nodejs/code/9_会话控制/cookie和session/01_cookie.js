const express=require('express')

const cookieParser = require('cookie-parser')

const app=express()
app.use(cookieParser())

// 创建cookie
app.get('/set-cookie',(req,res)=>{
    // res.cookie('name','张三') //会在浏览器关闭的时候销毁
    res.cookie('name','lisi',{maxAge:60*1000}) //设置1min的cookie
    res.cookie('theme','blue')
    res.send('home')
})

// 删除cookie
app.get('/remove-cookie',(req,res)=>{
    res.clearCookie('name')
    res.send('cookie删除成功')
})

// 读取cookie
app.get('/get-cookie',(req,res)=>{
    
    console.log(req.cookies)
    res.send('获取 cookie')
})

app.listen(3000)