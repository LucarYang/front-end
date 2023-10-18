# async 和await
### async和await两种方法结合可以让异步代码像同步代码一样

## async函数
* async函数返回值为promise对象
* promise对象的结果由async函数执行的返回值决定
```js
async function fn() {
    // 1、返回的结果不是一个Promise类型的对象，则这个函数返回的是一个成功的Promise
    return 'hello async'
    // 2、抛出错误，返回结果是一个失败的Promise
    throw new Error('出错啦') //Promise {<rejected>: Error: 出错啦
    // 3、返回的结果是一个Promise对象,返回结果由Promise返回的结果决定
    return new Promise((resolve, reject) => {
        reject('成功数据')
    })
}
const res = fn()
res.then((value) => {
    console.log('成功：', value)
}, reson => {
    console.warn('失败', reson)
})
console.log(res) //Promise {<fulfilled>: 'hello async'}
```
## await函数
* await必须写在async函数中
* await右侧的表达式一般为promise对象
* await返回的是promise成功的值
* await的promise失败了，就会抛出异常需要try...catch捕获异常
```js
const p = new Promise((resolve, reject) => {
    // resolve({ data: 1, data2: 2 })
    reject({ data: 'err' })
})
async function main() {
    try {
        let res = await p
        console.log(res)
    } catch (e) {
        console.log(e) //{data: 'err'}
    }
}
main()
```

## async和await结合
#### fs读取文件内容
```js

// const fs = require('fs');
import fs from 'fs';
function read() {
  return new Promise((resolve, reject) => {
    fs.readFile('./p.json', (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}
function read2() {
  return new Promise((resolve, reject) => {
    fs.readFile('./p.json', (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}
function read3() {
  return new Promise((resolve, reject) => {
    fs.readFile('./p.json', (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}

async function main() {
  let r1 = await read()
  let r2 = await read2()
  let r3 = await read3()
  console.log(r1.toString(), r2.toString(), r3.toString())
}

main()

// C:\Program Files\nodejs\node.exe .\index.js
// {
//   "a":1
// } {
//   "a":1
// } {
//   "a":1
// }
```
### ajax Get请求
```js
function sendAjax(url) {
  return new Promise((resolve, reject) => {
      // 1、创建请求对象
      const x = new XMLHttpRequest()
      // 2、初始化
      x.open('GET', url)
      // 3、发送
      x.send()
      // 4、事件绑定
      x.onreadystatechange = function () {
          if (x.readyState === 4) {
              if (x.status >= 200 && x.status < 300) {
                  resolve(x.response)
              } else (
                  reject(x.response)
              )
          }
      }
  })
}
// then方式
sendAjax('https://viptest.sdo.com/wxcorp/vapi/global/eventsubmit').then(v => {
  console.log(v)
}, r => {
  console.log(r)
})
// async方式
async function main() {
  let res = await sendAjax('https://viptest.sdo.com/wxcorp/vapi/global/eventsubmit')
  console.log(res)
}
main()
```
## ES8 对象方法的扩展
```js
const Shcool = {
    Class: '向日葵班',
    stus: ['小新', '正南', '阿呆', '小彻'],
    teachers: ['吉永', '上尾', '阿梅']
}
// 获取对象的所有键
console.log(Object.keys(Shcool)) //['Class', 'stus', 'teachers']
// 获取对象的所有键值
console.log(Object.values(Shcool)) //['向日葵班', ['小新', '正南', '阿呆', '小彻'], ['吉永', '上尾', '阿梅']]
// entries
console.log(Object.entries(Shcool))//[['Class', '向日葵班']["stus",['小新', '正南', '阿呆', '小彻']]]
//转化Map
const m = new Map(Object.entries(Shcool)) //{'Class' => '向日葵班', 'stus' => Array(4), 'teachers' => Array(3)}
console.log(m)
// 获取对象属性的描述
console.log(Object.getOwnPropertyDescriptors(Shcool))//{Class: {value: '向日葵班', writable: true, enumerable: true, configurable: true}stus: {value: Array(4), writable: true, enumerable: true, configurable: true}teachers: {value: Array(3), writable: true, enumerable: true, configurable: true}[[Prototype]]: Object}

```