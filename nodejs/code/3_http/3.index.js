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


