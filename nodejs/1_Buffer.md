# Buffer

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
