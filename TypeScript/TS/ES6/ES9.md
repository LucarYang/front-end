## ES9扩展运算符和rest参数
rest参数与spread扩展运算符在ES6中已经引入了，不过ES6中只是针对数组。在ES9中为对象提供了像数组一样的rest参数和扩展运算符。
```js
function connect({ host, port, ...user }) {
    console.log(host);
    console.log(port);
    console.log(user);
}
connect({
    host: '127.0.0.1',
    port: '3306',
    username: 'admin',
    password: '123456',
    type: 'master'
})

// 127.0.0.1
// 12 3306
// 13 {username: 'admin', password: '123456', type: 'master'}
```
#### 对象的扩转运算法
```js
const skilOne = {
    q: '天音波',
}
const skilTwo = {
    w: '金钟罩'
}
const skilTree = {
    e: '天雷破'
}
const skilFour = {
    r: '铁布衫',
}
const a = { ...skilOne, ...skilTwo, ...skilTree, ...skilFour }
console.log(a) //{q: '天音波', w: '金钟罩', e: '天雷破', r: '铁布衫'}
```
## 正则扩展 - 命名捕获分组
```js
let str = '<a href="http://127.0.0.1:5500/index.html">链接</a>';
const reg = /<a href="(.*)">(.*)<\/a>/;
console.log(reg.exec(str)) //['<a href="http://127.0.0.1:5500/index.html">链接</a>', 'http://127.0.0.1:5500/index.html', '链接', index: 0, input: '<a href="http://127.0.0.1:5500/index.html">链接</a>', groups: undefined]
console.log(reg.exec(str)[1])//http://127.0.0.1:5500/index.html
console.log(reg.exec(str)[2])//链接

// 命名捕获分组
const regMM = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
console.log(regMM.exec(str))//['<a href="http://127.0.0.1:5500/index.html">链接</a>', 'http://127.0.0.1:5500/index.html', '链接', index: 0, input: '<a href="http://127.0.0.1:5500/index.html">链接</a>', groups: {…}] 
// 多个groups
console.log(regMM.exec(str).groups.url)//http://127.0.0.1:5500/index.html
console.log(regMM.exec(str).groups.text)//链接
```
## 正则扩展 - 反向断言
```js
let str = 'ES9你知道吗555哈哈哈'
// 正向断言
const reg = /\d+(?=哈)/
console.log(reg.exec(str)) //['555', index: 7, input: 'ES9你知道吗555哈哈哈', groups: undefined]
// 反向断言
const regf = /(?<=吗)\d+/
console.log(regf.exec(str)) //['555', index: 7, input: 'ES9你知道吗555哈哈哈', groups: undefined]
```
## 正则扩展 - dotAll模式
#### dot . 元字符 除换行符以外的任意单个字符
```js
let str = `
      <ul>
      <li>
          <a>肖申克的救赎</a>
          <p>1994-09</p>
      </li>
      <li>
          <a>阿甘正传</a>
          <p>1994-07</p>
      </li>
  </ul>
`
const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;
console.log(reg.exec(str))

//dotAll模式
const reg1 = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/s;
console.log(reg1.exec(str))//['<li>\n                    <a>肖申克的救赎</a>\n                    <p>1994-09</p>', '肖申克的救赎', '1994-09', index: 38, input: '\n                <ul>\n                <li>\n       …\n                </li>\n            </ul>\n        ', groups: undefined]

const reg2 = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;
let res;
let data = []
while (res = reg2.exec(str)) {
  console.log(res)
  data.push({ title: res[1], time: res[2] })
}
console.log(data)
//[{title: '肖申克的救赎', time: '1994-09'}, {title: '阿甘正传', time: '1994-07'}]
```




