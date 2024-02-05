const http=require('http')
const fs=require('fs')
const { URL } = require('url')

const server =http.createServer((request,response)=>{
    //
    let {pathname}=new URL(request.url,'http://localhost:9000/')
    if(pathname==='/'){
        let html=fs.readFileSync(__dirname+'/table.html')
        response.end(html)
    }else if(pathname==='/index.css'){
        let css=fs.readFileSync(__dirname+'/index.css')
        response.end(css)
    }else if(pathname==='/index.js'){
        let js=fs.readFileSync(__dirname+'/index.js')
        response.end(js)
    }else{
        response.statusCode=404
        response.end('Not Fount')
    }
})

server.listen(9000,()=>{
    console.log('server 启动')
})