const http=require('http')
const server =http.createServer((request,respons)=>{
    // 获取请求的方法
    let {method}=request
    let {pathname}=new URL(request.url,'http://localhost:9000/')
    console.log(method,pathname)
    if(method==='GET'&& pathname==='/login'){
        respons.end('login')
    }else if(method==='GET'&& pathname==='/reg'){
        request.end('reg')
    }else{
        respons.end('Not Found')
    }
})

server.listen(9000,()=>{
    console.log('server 启动')
})