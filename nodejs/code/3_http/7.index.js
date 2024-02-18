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