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

```js
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
```
注意事项：
- index.html文件为默认打开的资源
- 如果静态资源与路由规则同时匹配，谁先匹配谁就响应
- 路由响应动态资源，静态资源中间件响应静态资源


### express框架_获取请求体数据

express可以使用body-parser包处理请求体

安装 npm i body-parser

- json格式的请求体的中间件的中间件
- querystring格式的请求体的中间件
```js

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
```

### 防盗链

```js

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
```

### 路由模块化
```js
// ----------------------------homeRouter.js-----------------------------------
// 1、导入express
const express=require('express')

// 2、创建路由对象
const router=express.Router()

//3、创建路由规则
router.get('/home',(req,res)=>{
    res.send('home')
})


//4、暴露router
module.exports=router


// ----------------------------adminRouter.js-----------------------------------
// 1、导入express
const express=require('express')

// 2、创建路由对象
const router=express.Router()

//3、创建路由规则

router.get('/admin',(req,res)=>{
    res.send('admin')
})

//4、暴露router
module.exports=router


// --------------------------------main.js------------------------------------------
// 1、导入express
const express=require('express')

const homeRouter=require('./routes/homeRouter')
const adminRouter=require('./routes/adminRouter')

// 2、创建应用对象

const app=express()

// 设置
app.use(homeRouter)
app.use(adminRouter)
```


### EJs模板引擎

模板引擎是分离用户界面和业务数据的一种技术

EJS是一个高效的JavaScript的模板引擎

安装EJS

    npm i ejs

```js
// 导入EJS
const ejs=require('ejs')
const fs=require('fs')

// 字符串
let china='中国'
let weather='今天天气不错'
// let str=`I Love U ${china}`

// 使用ejs渲染
let str=fs.readFileSync('./1_html.html').toString()
let result=ejs.render(str,{china:china,weather})

console.log(result)
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>I Love U <%= china%></h2>
        <p> <%= weather%></p>
    </body>
</html>
```

#### 列表渲染
```js
const ejs=require('ejs')
const xiyou=['唐僧','孙悟空','猪八戒','沙僧']

// // 原生JS
// let str='<ul>'

// xiyou.forEach(item=>{
//     str+=`<li>${item}</li>`
// })

// str+='</ul>'
// console.log(str)

//EJS
const fs=require('fs')
let html=fs.readFileSync('./2_html.html').toString()
let result=ejs.render(html,{xiyou:xiyou})
console.log(result)
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>xiyou</title>
    </head>
    <body>
        <ul>
            <% xiyou.forEach(item=>{%>
            <li><%=item %></li>
            <%})%>
        </ul>
    </body>
</html>
```

#### 条件渲染

```js

const ejs=require('ejs')
// 变量
let isLogin=false

// 原生JS
// if(isLogin){
//     console.log('<p>欢迎回来</p>')
// }else{
//     console.log('<button>登录</button> <button>注册</button>')
// }

// EJS实现
const fs=require('fs')
let html=fs.readFileSync('./3_html.html').toString()
let result=ejs.render(html,{isLogin})

console.log(result)
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <header>
            <% if(isLogin){ %>
            <p>欢迎回来</p>
            <% }else{%>
            <button>登录</button> <button>注册</button>
            <% }%>
        </header>
    </body>
</html>
```

### express中使用ejs

```js
// 导入express
const express=require('express')
// 导入path
const path=require('path')

// 创建应用对象

const app=express()
// 1 设置模板引擎
app.set('view engine','ejs')//pug twing
// 2 设置模板文件存放的位置
app.set('views',path.resolve(__dirname,'./views'))

// 创建路由
app.get('/home',(req,res)=>{
    // 3 render 响应
    // res.render('模板的文件','数据')
    let title='我是title'
    res.render('home',{title})
})

// 监听端口 启动服务
app.listen(3000,()=>{
    console.log('服务已启动 端口3000')
})
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2><%= title %></h2>
    </body>
</html>
```

启动服务 访问http://127.0.0.1:3000/home

### express-generator

express-generator应用生成器:可以快死创建一个应用的骨架

    全局安装 
    npm i -g express-generator

    创建一个express项目
    express -e 10_generator

    进入项目 安装依赖 
    npm i

    运行项目 
    npm start

#### 文件上传
formidable用于解析表单支持get/post请求参数文件上传等
安装 npm i formidable

```js
const e = require('express');
var express = require('express');
var router = express.Router();

// 导入formidable
const {formidable} =require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 显示网页表单(文件上传)
router.get('/potrait',(req,res)=>{
  res.render('potrait');
})

// 处理文件上传
router.post('/potrait',(req,res,next)=>{
  // 创建表单对象
  const form= formidable({
    multiples:true,
    // 设置上传文件的保存目录
    uploadDir:__dirname+'/../public/images',
    // 保持文件后缀
    keepExtensions:true
  })

  // 解析请求报文
  form.parse(req,(err,fields,files)=>{
    if(err){
      next(err)
      return
    }
    // console.log(fields)//text radio checkbox select
    // console.log(files)//files
    // res.json({fields,files})

    // 服务器保存该图片的访问url
    console.log(files)
    let newname={...files.hand[0]}
    console.log(newname.newFilename)
    let imgUrl='/images/'+newname.newFilename //将此数据保存到数据库

    res.send('ok'+imgUrl);
  })
})

module.exports = router;

```