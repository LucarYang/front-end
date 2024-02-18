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


