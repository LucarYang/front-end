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


