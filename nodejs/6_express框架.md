# express 框架
express是一个基于nodejs平台的极简、灵活的web应用开发框架；https://www.expressjs.com.cn/；简单来说，express是一个封装好的工具包，封装了很多功能，便于我们开发web应用(HTTTP服务)

安装express npm i express

```js
// 1、导入express
const express=require('express')

// 2、创建应用对象

const app=express()

// 3、创建路由
app.get('/home',(req,res)=>{
    res.end('hello express')
})

// 4、监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})
```

## express路由
路由定义了应用程序如何响应客户端对特定端点的请求

    一个路由的组成有请求方法和回调函数组成
        app.<mothod>(path.callback)
```js
app.get('/home',(req,res)=>{
    res.end('hello express')
})

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
```

### 获取请求报文参数
express框架封装了一下API来方便获取请求报文中的数据，并且兼容原生HTTP模块的获取方式
```js
app.get('/request',(req,res)=>{
    // 原生操作
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    // express操作
    console.log(req.path)
    console.log(req.query)
    console.log(req.ip) //获取IP
    console.log(req.get('host'))//获取请求头的host

    res.end('hello express')
})
```

### 获取路由参数
路由参数是指URL路径中的参数(数据)
```js
app.get('/:id.html',(req,res)=>{
    // 获取路由URL参数
    console.log(req.params)
    res.setHeader('content-type','text/html;charset=utf-8')
    res.end('商品')
})
```

## express设置响应
express框架封装了一些API来方便给客户端响应数据，并且兼容原生HTTP模块的获取方式
```js
app.get('/response',(req,res)=>{
    // 1、原生xiangying
    res.statusCode=404
    res.statusMessage='love'
    res.setHeader('xxx','yyy')
    res.write('hello express response')
    res.end('response')

    // 2、express响应
    res.status(500)
    res.set('aaa','bbb')
    res.send('你好 Express')
    // 连贯的写法
    res.status(500).set('aaa','bbb').send('你好 Express')

    //3、其他响应
    res.redirect('https://baidu.com') //重定向
    res.download(__dirname+'/package.json') //下载响应
    res.json({ name:'hhh',id:123})//json响应
    res.sendFile(__dirname+'/package.json')//响应文件内容
})
```

## 中间件

中间件(Middleware)本质就是一个回调函数

中间件函数可以像路由回调一样访问 请求对象(request),响应对象(response)

### 中间件的作用
中间件的作用就是使用函数封装公共操作，简化代码

### 中间件的类型
- 全局中间件
- 路由中间件

### 全局中间件
每一个请求到达服务器之后都会执行全局中间件函数
```js
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
```
### 路由中间件
```js
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
```

### 静态资源中间件

