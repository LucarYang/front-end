const express=require('express')

const session = require('express-session')
const MongoStore=require('connect-mongo')

const app=express()
// 设置session的中间件
app.use(
    session({
        name:'sid', //设置cookie的name，默认值为connect.sid
        secret:'lucar', //参与加密的字符串（又称签名）
        saveUninitialized:false, //是否为每次请求都设置一个cookie用来存储session的id
        resave:true,//施工在每次请求时重新保session
        store:MongoStore.create({
            mongoUrl:'mongodb://127.0.0.1:27017/bilibili'//数据库的连接配置
        }),
        cookie:{
            httpOnly:true, //开启后前段无法通过JS操作
            maxAge:1000*60*5 //这一条是控制session的过期时间的
        }
    })
)

// 
app.get('/',(req,res)=>{
    res.send('home')
})

// 登录
app.get('/login',(req,res)=>{
    // username=admin&password=admin
    if(req.query.username==='admin'&& req.query.password==='admin'){
        req.session.username='admin'
        res.send('登陆成功')
    }else{
        res.send('err')
    }
})


// session读取
app.get('/cart',(req,res)=>{
    // 检测session
    if(req.session.username){
        res.send(`购物车，欢迎您 ${req.session.username}`)
    }else{
        res.send('你没有登陆')
    }
})

// session销毁

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('已退出')
    })
})


app.listen(3000)