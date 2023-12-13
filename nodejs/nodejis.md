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
