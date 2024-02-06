# http
    Hypertext Transfer Protocol 超文本传输协议

    协议:双方必须共同遵从的一组约定

## Http协议 

约束浏览器和服务器的协议
```
浏览器 ---请求(请求报文)--> 服务器
浏览器 <--响应(相应报文)---  服务器
```

## Http请求报文
```
请求行:Get https://www.baidu.com/ HTTP/1.1
请求头:
空行
请求体
```
#### 请求行
- 请求方法:
    |  方法   | 作用  |
    |  ----  | ----  |
    | GET  | 主要用于获取数据 |
    | POST  | 主要用于新增数据 |
    | PUT/PATCH  | 主要用于更新数据 |
    | DELETE  | 主要用于删除数据 |

- URL - 统一资源定位符(Uniform Resource Locator)
    * 协议名称 :https/http
    * 主机名:www.baidu.com(或IP地址)
    * 端口号:
    * 路径:/
    * 查询字符串:
- HTTP 版本号
    |  版本号   | 发布时间  |
    |  ----  | ----  |
    |1.0|1996|
    |1.1|1999|
    |2|2012|
    |2|2018|

#### 请求头
#### 请求体

## Http响应报文
```
响应行:HTTP/1.1  200 ok
响应头:
空行
响应体
```
#### 响应行
响应状态码

    |  状态码   | 含义  |
    |  ----  | ----  |
    |200|请求成功|
    |403|禁止求情|
    |404|找不到资源|
    |500|服务器内部错误|

响应状态码分类

    |  状态码   | 含义  |
    |  ----  | ----  |
    |1xx|信息响应|
    |2xx|成功响应|
    |3xx|重定向响应|
    |4xx|客服端错误响应|
    |5xx|服务端错误响应|

响应状态的描述

    |  状态码   | 含义  |
    |  ----  | ----  |
    |200|ok|
    |403|Forbidden|
    |404|Not Found|
    |500|Internal Server Error|

#### 响应头
#### 响应体
    响应体的内容格式是非常灵活的,常见的响应体格式有:html,css,JavaScript,图片,视频,json


## 创建http服务

```js
// 1 导入http 服务
const  http=require('http')

// 2 创建服务对象
const server = http.createServer((request,response)=>{
    response.setHeader('content-type','text/html;charset=utf-8')// 设置中文响应头
    response.end('Hello Http Server 你好')//设置响应体
})

// 监听端口,启动服务
server.listen(9000,()=>{
    console.log('server loaded')
})
```
访问:http://localhost:9000/

http协议的默认端口是80,https协议的默认端口是443

## 浏览器查看HTTP报文

## 获取HTTP请求报文
```js
// 1 导入http 服务
const  http=require('http')

// 2 创建服务对象
const server = http.createServer((request,response)=>{
    response.setHeader('content-type','text/html;charset=utf-8')// 设置中文响应头
    // 获取请求的方法
    console.log(request.method)
    // 获取请求的url
    console.log(request.url)//只包含url中的路径与查询字符串
    // 获取http的版本号
    console.log(request.httpVersion)
    // 获取http的请求头
    console.log(request.headers)
    console.log(request.headers.host)
    response.end('Hello Http Server 你好')//设置响应体
})

// 监听端口,启动服务
server.listen(9000,()=>{
    console.log('server loaded')
})
```

## 获取HTTP请求报体
```js
// 1 导入http 服务
const  http=require('http')

// 2 创建服务对象
const server = http.createServer((request,response)=>{
    // 生命一个变量
    let body=''
    // 绑定事件
    request.on('data',chunk=>{
        body+=chunk
    })
    // 绑定一个end事件
    request.on('end',()=>{
        console.log(body)
        // 响应
        response.end('Hello http')
    })

    response.end('Hello Http Server 你好')//设置响应体
})

// 监听端口,启动服务
server.listen(9000,()=>{
    console.log('server loaded')
})
```

## 获取请求路径与查询字符串
```js
// 1 导入http 服务
const  http=require('http')

// 导入url模块
const url=require('url')

// 2 创建服务对象
const server = http.createServer((request,response)=>{
    // console.log(request.url)
    let res=url.parse(request.url,true);
    console.log(res)
    response.end('url')
    // 路径
    let pathnmae=res.pathname
    // 查询字符串
    let a=res.query.a
    console.log(a)
})

// 监听端口,启动服务
server.listen(9000,()=>{
    console.log('server loaded')
})
```
```js
// 1 导入http 服务
const  http=require('http')


// 2 创建服务对象
const server = http.createServer((request,response)=>{
    // 实例化URL的对象
    let url=new URL(request.url,'http://localhost:9000/')
    console.log(url)
    console.log(url.searchParams.get('a'))
    response.end('url new')
})

// 监听端口,启动服务
server.listen(9000,()=>{
    console.log('server loaded')
})



```

## 设置http的响应报文

|作用|语法|
|-|-|
|设置响应状态码|response.statusCode|
|设置响应状态描述|response.statusMessage|
|设置响应头信息|response.setHeader('头名'，'头值')|
|设置响应体|response.write('xx')  /r/n response.end('xx')|

```js
const http=require('http')
const server =http.createServer((request,response)=>{
    // 设置响应状态码
    // response.statusCode=203
    // response.statusCode=400

    // 设置响应状态描述
    // response.statusMessage='love U '

    // 设置响应头
    response.setHeader('content-type','text/html;charset=utf-8')
    response.setHeader('Server','Node.js')
    response.setHeader('test',['test','test1','test2'])

    // 设置响应体

    response.write('love ')
    response.write('love1 ')

    response.end()
})

server.listen(9000,()=>{
    console.log('server 启动')
})
```
## 网页资源加载基本过程

## 静态资源服务

- 静态资源是指内容长时间不发生改变的资源，例如图片，视频，css文件，js文件，html文件 字体等
- 动态资源是指内容经常更新的资源，例如网页首页
```js
const http=require('http')
const fs=require('fs')
const { URL } = require('url')

const server =http.createServer((request,response)=>{
    //
    let {pathname}=new URL(request.url,'http://localhost:9000/')
    
    let filePath=__dirname+'/page'+pathname
    fs.readFile(filePath,(err,data)=>{
        if(err){
            response.statusCode=500
            response.end(err)
        }
        response.end(data)
    })
})

server.listen(9000,()=>{
    console.log('server 启动')
})
```

## 静态资源目录
```js
const http=require('http')
const fs=require('fs')
const { URL } = require('url')

const server =http.createServer((request,response)=>{
    //
    let {pathname}=new URL(request.url,'http://localhost:9000/')
    
    let root=__dirname+'/page' //网站根目录
    let filePath=root+pathname
    fs.readFile(filePath,(err,data)=>{
        if(err){
            response.statusCode=500
            response.end(err)
        }
        response.end(data)
    })
})

server.listen(9000,()=>{
    console.log('server 启动')
})
```

## 网站中的URL
    网页的URL主要分为两大类:相对路径、绝对路径

#### 绝对路径
    绝对路径可靠性强
|形式|特点|
|-|-|
|httts://baidu.com/123|玩整体包含了协议、域名、路径、对口；直接向目标资源发送请求，容易理解。网站的外连接会用到此形式|
|//baidu.com/123|省略协议；与页面URL的协议拼接形成完整URL再发送请求。大型网站用的比较多|
|/123|与页面URL的协议、主机、端口拼接形成完整URL再发请求。中小型网站|


#### 相对路径
    相对路径在发送请求时，需要与当前页面URL路径进行计算，得到完整URL后，再发送请求，学习阶段用的比较多

例如：httts://baidu.com/cource/
|形式|最终的URL|
|-|-|
|./css/app.css|httts://baidu.com/cource/css/app.css|
|js/app.js|httts://baidu.com/cource/js/app.js|
|..img/logo.png|httts://baidu.com/cource/img/logo.png|
|../../mp4/a.mp4|httts://baidu.com/cource/mp4/a.mp4|

## 设置mine类型
    媒体类型(通常称为 Multipurpose Internet Mail Extension 或者MIME类型)是一种标准，用来表示文档、文件或字节的性质和格式
mime 类型结构 [type]/[subType]

例如：text/html image/jpeg image/png application/json

HTTP服务可以设置响应头Content-Type来表明响应体的MIME类型，浏览器会根据该类型该类型决定如何处理资源

    常见文件对应的mime类型
        html    text/html
        css     text/css
        js      text/javascript
        png     text/png
        jpg     text/jpeg
        gif     text/gif
        mp4     video/mp4
        mp3     video/mpeg
        json    application/json

## 错误处理

```js
const http=require('http')
const fs=require('fs')
const { URL } = require('url')

const server =http.createServer((request,response)=>{
    if(request.method!=='GET'){
        response.statusCode=405
        response.end('<h1>405 Method Not  Allowed</h1>')
        return
    }
    //
    let {pathname}=new URL(request.url,'http://localhost:9000/')
    
    let root=__dirname+'/page'
    let filePath=root+pathname
    fs.readFile(filePath,(err,data)=>{
        if(err){
            switch(err.code){
                case 'ENOENT':
                    response.statusCode=404
                    response.end('<h1>404 Not Found</h1>')
                case 'EFERM':
                    response.statusCode=403
                    response.end('403 Forbidden')
                default:
                    response.statusCode=500
                    response.end('500 Internal Server Error')
            }
            response.statusCode=500
            response.end(err)
        }
        response.end(data)
    })
})

server.listen(9000,()=>{
    console.log('server 启动')
})
```

## GET和POST请求
#### GET请求场景
- 在地址栏直接输入url访问
- 点击a标签
- link标签引入css
- script标签引入js
- video标签引入多媒体
- img标签引入图片
- from标签中的method味get
- Ajax中的get请求
#### POST请求场景
- from标签中的method味post
- Ajax中的post请求

#### GET和POST请求区别
1、作用 GET主要用来获取数据，POST主要用来递交数据
2、参数位置不同。GET带参数请求是将参数缀到URL之后，PSOT带参数请求是将参数放到请求体中
3、安全性。PSOT请求相对于GET安全一些，因为在浏览器中参数会暴露在地址栏中
4、GET请求大小有限制，一般为2k，而POST请求则没有大小限制
