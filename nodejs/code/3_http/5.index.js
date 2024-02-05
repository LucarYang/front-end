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


