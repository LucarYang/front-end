# fs模块

#### fs模块可以实现与硬盘的交互；列入文件的创建、删除、重命名、移动；还有文件内的读入和读取；以及文件夹的相关操作

## 文件写入

```js
// 导入fs模块
const fs=require('fs')
// 写入文件
fs.writeFile('./zuoyouming.txt','三人行必有我师',err=>{
    // err写入失败err是一个错误对象，写入成功：null
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功')
})
```

## fs的同步和异步写入

异步写入：

```js
// 导入fs模块
const fs=require('fs')
// 写入文件
fs.writeFile('./zuoyouming.txt','三人行必有我师',err=>{
    // err写入失败err是一个错误对象，写入成功：null
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功')
})

console.log(1+1)

// 2
// 写入成功
```

同步写入：

```js
const fs=require('fs')
fs.writeFileSync('./data.txt','test')
```

异步的更高效，同步的更简单直白

## appendFile/appendFileSync追加写入

```js
const fs=require('fs')
//异步
fs.appendFile('./zuoyouming.txt','择其善者而从之，其不善者而改之',err=>{
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功')
})
//同步
fs.appendFileSync('./zuoyouming.txt','\r\n问个而知新')

// writeFile追加
fs.writeFile('./zuoyouming.txt','love love love',{flag:'a'},err=>{
    // err写入失败err是一个错误对象，写入成功：null
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功')
})
```

## createWriteStream流失写入

```js
const fs=require('fs')
const ws=fs.createWriteStream('./观书有感.txt')

ws.write('半亩方塘一鉴开\r\n')
ws.write('天光云影共徘徊\r\n')
ws.write('问渠那得清如许\r\n')
ws.write('为有源头活水来\r\n')


ws.close()//可选
```

## 文件写入应用场景

* 下载文件
* 安装软件
* 保存程序日志
* 编辑器保存文件
* 视频录制

当持久化的保存数据时，就应该想到文件写入

## 文件读取 readFile/readFileSync
```js
// 1、引入fs
const fs=require('fs')

// 2、异步读取
fs.readFile('./观书有感.txt',(err,data)=>{
    if(err){
        console.log('读取失败')
        return
    }
    console.log(data.toString())
})

// 3、同步读取
let data=fs.readFileSync('./观书有感.txt')
console.log(data.toString())
```
## 文件读取的应用场景
- 电脑开机
- 程序运行
- 编辑器开打文件
- 播放视频/音乐
- 查看图片
- git查日志
- 上传文件
- 查看聊天记录

## 文件流式读取 createReadStream
```js
// 1、引入fs
const fs=require('fs')
// 绑定data事件  chunk 块
const rs=fs.createReadStream('./a.mp4')
rs.on('data',chunk=>{
    console.log(chunk.length)
})
// 65536 65536字节 = 64k
// 65536
// 65536
// 3232

// end 可选事件
rs.on('end',()=>{
    console.log('end')
})
```

### 复制文件
```js
const fs=require('fs')
// 复制文件

// 方式一 readFile
let data=fs.readFileSync('./a.mp4')
// 写入文件
fs.writeFileSync('./a1.mp4',data)

// 方式二 流式操作  
// 创建读取流对象
const rs=fs.createReadStream('./a.mp4')
// 创建写入对象
const ws=fs.createWriteStream('./a3.mp4')
// 绑定data事件
rs.on('data',chunk=>{
    ws.write(chunk)
})
```
#### 计算内存占用量 process
```js
const fs=require('fs')
const process=require('process')
// 方式一 readFile
let data=fs.readFileSync('./a.mp4')
// 写入文件
fs.writeFileSync('./a1.mp4',data)
console.log(process.memoryUsage()) //rss: 20566016字节
// {
//     rss: 20566016,
//     heapTotal: 5955584,
//     heapUsed: 2698552,
//     external: 1188322,
//     arrayBuffers: 217414
//   }

// 方式二 流式操作
// 创建读取流对象
const rs=fs.createReadStream('./a.mp4')
// 创建写入对象
const ws=fs.createWriteStream('./a3.mp4')
// 绑定data事件  
// rs.pipe(ws) 简便写法
rs.on('data',chunk=>{
    ws.write(chunk)
})

rs.on('end',()=>{
    console.log(process.memoryUsage()) //rss: 20566016字节
})
```

## 文件的移动与重命名

```js
const fs=require('fs')
fs.rename('./zuoyouming.txt','./座右铭.txt',err=>{
    if(err){
        console.log('err')
        return
    }
    console.log('succ')
})
```
```js
const fs=require('fs')
// 文件的移动
fs.rename('./座右铭.txt','./newfile/座右铭.txt',err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
})
```
## 文件的删除
```js
const fs=require('fs')
fs.unlink('./观书有感.txt',err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
})
// node14.4 rm方法
fs.rm('./观书有感.txt',err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
})
```
## 文件夹操作

```js
// 创建文件夹 mk make制作 dir diirctory文件夹
fs.mkdir('./html',err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
})

// 递归创建 recursive递归的
fs.mkdir('./a/b/c',{recursive:true},err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
})
```

## 文件夹读取
```js
fs.readdir('./',(err,data)=>{
    if(err){
        console.log('读取失败')
        return
    }
    console.log(data)
    // [
    //     '2-fs.js',
    //     '4-文件读取.js',
    //     'a',
    //     'a.mp4',
    //     'a1.mp4',
    //     'a3.mp4',
    //     'html',
    //     'newfile'
    //   ]
})
```
## 文件夹读取
```js
// 删除文件夹
fs.rmdir('./html',(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
    
})

// 递归删除
fs.rmdir('./a',{recursive:true},(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
    
})
// 递归删除
fs.rm('./a',{recursive:true},(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('succ')
    
})
```
## 查看资源状态(资源信息)
```js
fs.stat('./a.mp4',(err,data)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(data)
    console.log(data.isFile)//是否是文件
    console.log(data.isDirectory)//是否是一个文件夹
})

// Stats {
//     dev: 239965214,
//     mode: 33060,
//     nlink: 1,
//     uid: 0,
//     gid: 0,
//     rdev: 0,
//     blksize: 4096,
//     ino: 281474976816881,
//     size: 199840,
//     blocks: 392,
//     atimeMs: 1707028071115.2458,
//     mtimeMs: 1707028041147.0828,
//     ctimeMs: 1707028079412.45,
//     birthtimeMs: 1707028071115.2458,
//     atime: 2024-02-04T06:27:51.115Z,
//     mtime: 2024-02-04T06:27:21.147Z,
//     ctime: 2024-02-04T06:27:59.412Z,
//     birthtime: 2024-02-04T06:27:51.115Z
//   }
```

## 路径补充说明
```js
// 相对路径
fs.writeFileSync('./index.js','love')
fs.writeFileSync('/index.js','love')
fs.writeFileSync('../index.js','love')

// 绝对路径
fs.writeFileSync('F:/index.js','love')
fs.writeFileSync('/index.js','love')

// 相对路径参照物:命令行的工作目录
fs.writeFileSync('./index.js','love')

// 绝对路径 __dirname '全局变量'   保存的是:所在文件的所在目录 
console.log(__dirname)
fs.writeFileSync(__dirname+'/index.js','love')
```

### 批量重命名

```js
const files=fs.readdirSync('../../code')
files.forEach(item=>{
    let data=item.split('_')
    let [num,name]=data
    if(Number(num)<10)
    {
        num='0'+num
    }
    let newname=num+'_'+name
    fs.renameSync(`../../code/${item}`,`../../code/${newname}`)
})
```

## path

