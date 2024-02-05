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


