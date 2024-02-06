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