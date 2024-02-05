const http=require('http')

const server =http.createServer((request,response)=>{
    //
    response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            td{
                padding:10px 20px;
            }
            table tr:nth-child(odd){
               background:#aef 
            }
            table tr:nth-child(even){
                background:#fcb 
             }
            table,td{
                border-collapse:collapse;
            }
        </style>
    </head>
    <body>
    <table border="1">
    <tr><td>test</td><td>test</td><td>test</td></tr>
    <tr><td>test</td><td>test</td><td>test</td></tr>
    <tr><td>test</td><td>test</td><td>test</td></tr>
    </table>
    </body>
    </html>
    `)
})

server.listen(9000,()=>{
    console.log('server 启动')
})