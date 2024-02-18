
const express=require('express')
const bodeParser=require('body-parser')

// 创建应用对象
const app=express()

// 声明中间件
app.use((req,res,next)=>{
    // 检测请求头中referer是否是127.0.0.1
    // 获取referer
    let referer=req.get('referer')
    if(referer){
        // 实例化
        let url=new URL(referer)
        // 获取hostname
        let hostname=url.hostname
        console.log(hostname)
        if(hostname!='127.0.0.1'){
            res.status('404').send('<h1>404 Not Found</h1>')
            return
        }
    }
    console.log(referer)
    next();
})

app.use(express.static(__dirname+'/public'))

// 启动服务
app.listen(3000,()=>{
    console.log('服务已启动')
})