// 1、引入fs
const fs=require('fs')

// // 2、异步读取
// fs.readFile('./观书有感.txt',(err,data)=>{
//     if(err){
//         console.log('读取失败')
//         return
//     }
//     console.log(data.toString())
// })

// // 3、同步读取
// let data=fs.readFileSync('./观书有感.txt')
// console.log(data.toString())


// // 流式读取 createReadStream
// // 绑定data事件  chunk 块
// const rs=fs.createReadStream('./a.mp4')
// rs.on('data',chunk=>{
//     console.log(chunk.length)
// })
// // 65536 64k
// // 65536
// // 65536
// // 3232

// // end 可选事件
// rs.on('end',()=>{
//     console.log('end')
// })


// 复制文件
// const process=require('process')
// // 方式一 readFile
// let data=fs.readFileSync('./a.mp4')
// // 写入文件
// fs.writeFileSync('./a1.mp4',data)
// console.log(process.memoryUsage()) //rss: 20566016字节
// // {
// //     rss: 20566016,
// //     heapTotal: 5955584,
// //     heapUsed: 2698552,
// //     external: 1188322,
// //     arrayBuffers: 217414
// //   }

// // 方式二 流式操作
// // 创建读取流对象
// const rs=fs.createReadStream('./a.mp4')
// // 创建写入对象
// const ws=fs.createWriteStream('./a3.mp4')
// // 绑定data事件
// rs.on('data',chunk=>{
//     ws.write(chunk)
// })

// rs.on('end',()=>{
//     console.log(process.memoryUsage()) //rss: 20566016字节
// })

// // 文件的移动与重命名
// fs.rename('./zuoyouming.txt','./座右铭.txt',err=>{
//     if(err){
//         console.log('err')
//         return
//     }
//     console.log('succ')
// })

// // 文件的移动
// fs.rename('./座右铭.txt','./newfile/座右铭.txt',err=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
// })

// // 文件的删除
// fs.unlink('./观书有感.txt',err=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
// })
// // node14.4 rm
// fs.rm('./观书有感.txt',err=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
// })

// 文件夹操作
// 创建文件夹 mk make制作 dir diirctory文件夹
// fs.mkdir('./html',err=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
// })

// // 递归创建
// fs.mkdir('./a/b/c',{recursive:true},err=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
// })

// fs.readdir('./',(err,data)=>{
//     if(err){
//         console.log('读取失败')
//         return
//     }
//     console.log(data)
//     // [
//     //     '2-fs.js',
//     //     '4-文件读取.js',
//     //     'a',
//     //     'a.mp4',
//     //     'a1.mp4',
//     //     'a3.mp4',
//     //     'html',
//     //     'newfile'
//     //   ]
// })

// // 删除文件夹
// fs.rmdir('./html',(err)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
    
// })

// // 递归删除 还可以用rm
// fs.rmdir('./a',{recursive:true},(err)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('succ')
    
// })



// fs.stat('./a.mp4',(err,data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data)
//     console.log(data.isFile)//是否是文件
//     console.log(data.isDirectory)//是否是一个文件夹
// })

// // Stats {
// //     dev: 239965214,
// //     mode: 33060,
// //     nlink: 1,
// //     uid: 0,
// //     gid: 0,
// //     rdev: 0,
// //     blksize: 4096,
// //     ino: 281474976816881,
// //     size: 199840,
// //     blocks: 392,
// //     atimeMs: 1707028071115.2458,
// //     mtimeMs: 1707028041147.0828,
// //     ctimeMs: 1707028079412.45,
// //     birthtimeMs: 1707028071115.2458,
// //     atime: 2024-02-04T06:27:51.115Z,
// //     mtime: 2024-02-04T06:27:21.147Z,
// //     ctime: 2024-02-04T06:27:59.412Z,
// //     birthtime: 2024-02-04T06:27:51.115Z
// //   }

// // 相对路径
// fs.writeFileSync('./index.js','love')
// fs.writeFileSync('/index.js','love')
// fs.writeFileSync('../index.js','love')

// // 绝对路径
// fs.writeFileSync('F:/index.js','love')
// fs.writeFileSync('/index.js','love')


// 相对路径参照物:命令行的工作目录
// fs.writeFileSync('./index.js','love')

// // 绝对路径 __dirname '全局变量'   保存的是:所在文件的所在目录 
// console.log(__dirname)
// fs.writeFileSync(__dirname+'/index.js','love')

// const files=fs.readdirSync('../../code')
// files.forEach(item=>{
//     let data=item.split('_')
//     let [num,name]=data
//     if(Number(num)<10)
//     {
//         num='0'+num
//     }
//     let newname=num+'_'+name
//     fs.renameSync(`../../code/${item}`,`../../code/${newname}`)
// })
// console.log(files)


const path=require('path')
fs.writeFileSync(__dirname+'/index.js','love')
console.log(__dirname+'/index.js') //F:\3、Study - Sources\github\front-end\nodejs\code\2_fs/index.js

// resolve 拼接规范的绝对路径(常用) 解决反斜杠问题
console.log(path.resolve(__dirname,'./index.js'))  //F:\3、Study - Sources\github\front-end\nodejs\code\2_fs\index.js

// sep 获取操作系统的路径分隔符 分隔符
console.log(path.sep) // window \ linul /

// parse 解析路径返回对象 方法 _dirname '全局路径'
// console.log(__filename)//文件的绝对路径
let str='D:\\nodejs\\test\\path.js'
console.log(path.parse(str))

// basename 获取路径的基础名称
console.log(path.basename(str)) //path.js

//dirname 获取路径的目录名
console.log(path.dirname(str)) //D:\nodejs\test

//extname 获取路径的扩展名
console.log(path.extname(str)) //.js
