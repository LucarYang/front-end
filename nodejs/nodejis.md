#

## nodejs的作用

* 开发服务端应用
* 开发工具类应用
* 开发桌面端应用

## nodejs下载与安装

https://nodejs.cn/download/

## 命令行工具

## nodejs中不能使用浏览器API

* nodejs中不能使用BOM和DOM的API 可以使用console和定时器API
* nodejs中的顶级对象为global 也可以用globalThis访问顶级对象

## Buffer

Buffer缓冲区，是一个类似于Array的对象。用于表示固定长度的字节序列；换句话，Buffer就是一段固定的内存空间，用于处理二进制数据

### 特点

* Buffer大小固定且无法调整
* Buffer性能比较好，可以直接对计算机内存进行操作
* 每个元素的大小为1字节(byte)

### Buffer的创建

```js
//1. alloc
let buf=Buffer.alloc(10)
console.log(buf)

//2. allocUnSafe
let buf2=Buffer.allocUnsafe(10)
console.log(buf2)

//3.from
let buf3=Buffer.from('hello')
let buf4=Buffer.from([150,110,111,121,117,108])
console.log(buf4)
```

### Buffer的操作

```js

let buf3=Buffer.from('hello')
let buf5=Buffer.from([105,108,111,118,101,121,111,117])

console.log(buf5.toString())//utf-8

// 通过[]对Buffer的元素读取和写入
console.log(buf3[0].toString(2))//01101000
buf3[0]=95
console.log(buf3.toString()) //_ello

// 溢出
let buf=Buffer.from('hello')
buf[0]=361;//舍弃高位的数字
console.log(buf) //69

// 中文  
let buf=Buffer.from('你好')

console.log(buf)//e4 bd a0 e5 a5 bd 
```

## fs模块

fs模块可以实现与硬盘的交互；列入文件的创建、删除、重命名、移动；还有文件内的读入和读取；以及文件夹的相关操作

### 文件写入

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

### fs的同步和异步写入

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

### appendFile/appendFileSync追加写入

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

fs.writeFile('./zuoyouming.txt','love love love',err=>{
    // err写入失败err是一个错误对象，写入成功：null
    if(err){
        console.log('写入失败');
        return;
    }
    console.log('写入成功')
})
```

### createWriteStream流失写入

```js
const fs=require('fs')
const ws=fs.createWriteStream('./观书有感.txt')

ws.write('半亩方塘一鉴开\r\n')
ws.write('天光云影共徘徊\r\n')
ws.write('问渠那得清如许\r\n')
ws.write('为有源头活水来\r\n')


ws.close()//可选
```

### 文件写入应用场景

* 下载文件
* 安装软件
* 保存程序日志
* 编辑器保存文件
* 视频录制

### 文件读取
