// 1、导入express
const express=require('express')

// 2、创建应用对象

const app=express()

// 3、创建路由
app.get('/response',(req,res)=>{
    // 原生xiangying
    // res.statusCode=404
    // res.statusMessage='love'
    // res.setHeader('xxx','yyy')
    // res.write('hello express response')
    // res.end('response')

    // express响应
    // res.status(500)
    // res.set('aaa','bbb')
    // res.send('你好 Express')
    // res.status(500).set('aaa','bbb').send('你好 Express')

    // res.redirect('https://baidu.com') //重定向
    // res.download(__dirname+'/package.json') //下载响应
    // res.json({ name:'hhh',id:123})//json响应
    res.sendFile(__dirname+'/package.json')//响应文件内容

})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})