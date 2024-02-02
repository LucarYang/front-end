# fs模块

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
