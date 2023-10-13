# ES
ES全称EcmaScript,是脚本语言的规范，而平时的JavaScript是EcmaScript的一种实现，所以ES新特性其实就是指的JavaScript的新特性

# ECMA 
ECMA (European COmputer Manufacture Association)欧洲计算机制造协会，这个组织的目标是评估、开发好和认可电信和计算机标准。

# ES6 2015年
* ES6的版本变动最多，具有里程碑意义
* ES6加入了许多新的也发特性，编程实现更简单、高效
* ES6是前端发展趋势，就业必备

# let
```js
// 声明变量
let a;
let b, c, d;
let e = 10;
let q = 1, w = 3, x = 5;
// 1、变量不能重复声明
let s = 1;
// let s = 2; //SyntaxError: Identifier 's' has already been declared 
console.log('hhh')
// 2、块级作用域
{
    let name = 'tom'
}
console.log(name) //undefined

// 3、不存在变量升级
//console.log(song)// ReferenceError: song is not defined
let song = '自由飞翔'

// 4、不影响作用域链
{
    let a = "hello"
    function fn() {
        console.log(a)
    }
    fn();
}
```

# const 声明常量
```js
const s = 'hhh'
// 1、一定要赋初始值
// const b;
// 2、一般常量使用大写
// 3、常量的值不能修改
// 4、块级作用域
{
    const ES6 = 'Hello ES6'
}
console.log(ES6) //ES6 is not defined
// 5、对于数组和对象的元素的修改，不算对常量的修改，不报错
const arr = ['a', 'b', 'c']
arr.push('e')
console.log(arr) //['a', 'b', 'c', 'e']
```

# 变量的解构赋值
#### 解构赋值：ES6允许按照一定模式从数组和对象中提取值，对变量进行赋值；
```js
// 1、数组的解构
const F4 = ['宋小宝', '刘能', '赵四', '小沈阳']
let [song, liu, zhao, xiao] = F4
console.log(song)
console.log(liu)
console.log(zhao)
console.log(xiao)
// 宋小宝
// 刘能
// 赵四
// 小沈阳


// 2、对象的解构
const zhao = {
    name: '老赵',
    age: '不知道',
    action: function () {
        console.log('吃喝拉撒')
    }
}
let { name, age, action } = zhao
console.log(name, age, action)
action()

// 老赵 不知道 ƒ() {
//     console.log('吃喝拉撒')
// }
// 吃喝拉撒
```

# 模板字符串
ES6引入了新的声明字符串的方式:``
```js
// 1、声明
let str = `我也是一个字符串！`
console.log(str, typeof str)//我也是一个字符串！ string

// 2、内容中直接出现换行符
let m = `a
            b
                c`
// 3、变量拼接 ${}
let hello = 'Hello'
let world = `${hello} world`
console.log(world) //Hello world
```
# 对象的简化写法
ES6允许大括号里面直接写入变脸和函数，作为对象的属性和方法
```js
let name = 'tom'
let change = function () {
    console.log('hello')
}

const person = {
    name,
    change,
    action() {
        console.log('action')
    }
}
console.log(person)//{name: 'tom', change: ƒ, action: ƒ}
```

# 箭头函数
ES6允许我们使用（=>）定义函数
```js
// 原来
let fn=function(a,b){
    return a + b
}
// ES6
let fn = (a, b) => {
    return a + b
}
```
#### this是静态的，this始终指向函数声明时所在作用域下的this的值
```js
function getname() {
    console.log(this.name)
}
let getnameES6 = () => {
    console.log(this.name)
}
//  设置windows对象的name属性
window.name = 'Coco'
const newPerson = {
    name: 'Tom'
}
// 直接调用
// getname() // Coco
// getnameES6() // Coco

// 通过call调用
getname.call(newPerson)//Tom
getnameES6.call(newPerson)//Coco
```

### 不能作为构造函数实例化对象
```js
let Person = (name, age) => {
    this.name = name,
        this.age = age
}
let me = new Person('xiao', 30)
console.log(me) //Person is not a constructor
```
### 不能使用arguments变量
```js
let fn = () => {
    console.log(arguments)
}
fn(1, 2, 3) //arguments is not defined
```

### 箭头函数的简写
```js
// 1、省略小括号，当形参有且只有一个的时候
let add = n => {
    return n + n
}
console.log(add(1))//2 

// 2、省略花括号，当代码体只有一个语句的时候，此时return必须省略，而且语句的执行结果就是函数的返回值
let pow = n => n * n
console.log(pow(3)) //9
```
获取数组中的偶数
```js
const arr=[1,2,10,3,8]
const res=arr.filter(item=>item%2===0)
res //[2,10,8]
```
箭头函数适用于和this无关的回调
箭头函数不适用于和this有关的回调：DOM事件回调；对象方法

# ES6允许给函数的参数赋初始值
```js
// 1、形参的初始值，具有默认参数的一般放在最后（潜规则）
function add(a, b, c = 10) {
    return a + b + c
}
console.log(add(1, 2)) //13
// 2、与解构赋值结合
function connect({ host = '127.0.0.1', username, password, port }) {
    console.log(host)
    console.log(username)
    console.log(password)
    console.log(port)
}
connect({
    // host: 'localhost',
    username: 'root',
    password: 'root',
    port: 3306
})
```
# ES6 引入rest参数，用于获取函数的实参，用来代替arguments
ES6 获取实参的方式
```js
// ES 获取参数
function data() {
    console.log(arguments)
}
data('Tony', 'Rom', '李华')//Arguments(3) ['Tony', 'Rom', '李华', callee: ƒ, Symbol(Symbol.iterator): ƒ]
// rest参数
function Data1(...args) {
    console.log(args)// 可使用数组的方法 filter some  every map
}
Data1('Tony', 'Rom', '李华')// ['Tony', 'Rom', '李华']
//rest参数必须放在最后
function fun(a, b, ...args) {
    console.log(a)
    console.log(b)
    console.log(args)
}
console.log(fun(1, 2, 3, 4, 5, 6))
// 1
// 2
// [3, 4, 5, 6]
```

# 扩展运算符 ...；扩展运算符能将数组转换为逗号分隔的参数序列
```js
const tfboys = ['易烊千玺', '王源', '王俊凯']
function cw() {
    console.log(arguments)
}
cw(...tfboys)//Arguments(3) ['易烊千玺', '王源', '王俊凯', callee: ƒ, Symbol(Symbol.iterator): ƒ]
console.log(...tfboys)//易烊千玺 王源 王俊凯
```
* 数组的合并
```js
 const kuaizi = ['王太利', '肖央']
const fhcq = ['曾毅', '玲花']
// const zxxpg=kuaizi.concat(fhcq) //数组concat函数方式
const zxxpg = [...kuaizi, ...fhcq]
console.log(zxxpg) //['王太利', '肖央', '曾毅', '玲花']
```
* 数组的克隆
```js
const szh = ['B', 'G', 'M']
const syc = [...szh]
console.log(syc) //['B', 'G', 'M']
```

* 将伪数组转化为数组
```js
const divs = document.querySelectorAll('div')
const divArr = [...divs]
console.log(divArr) //[div, div, div]
```

# symbol
ES6 引入新的数据类型Symbo表示独一无二的值，它是JavaScript语言的第七种数据类型是一种类似以字符串的数据类型
#### 特点
* Symbol的值是唯一的，用来解决命名冲突的问题
* symbol值不能与其他数据进行运算
* Symbol 定义的对象属性不能使用for...in 循环遍历，但可以使用Reflect.owenKeys来获取对象的所有键名
```js
// 创建 Symbol
let s = Symbol()
console.log(s, typeof s)

let s2 = Symbol('hello')
let s3 = Symbol('hello')
console.log(s2 === s3) //false
// Symbol.for创建
let s4 = Symbol.for('hello')
console.log(s4, typeof s4)//Symbol(hello) 'symbol'

// 不能与其他数据运算
// let res = s + 100;//TypeError: Cannot convert a Symbol value to a number
let res1 = s + s //TypeError: Cannot convert a Symbol value to a number

//USONB you are so niubility 你很牛逼 =>js的数据类型
// u undefined
// s string Symbol
// o object
// n null Number
// b bool
```
### 向对象添加属性和方法
```js
let game = {}

// 声明一个对象
let metnods = {
    up: Symbol(),
    down: Symbol()
}
game[metnods.up] = function () {
    console.log('我属up')
}
game[metnods.down] = function () {
    console.log('我的down')
}
console.log(game) //{Symbol(): ƒ, Symbol(): ƒ}
// 为对象调价symbol类型的属性
let youxi = {
    name: '狼人杀',
    [Symbol('say')]: function () {
        console.log('hello')
    },
    [Symbol('hi')]: function () {
        console.log('hi')
    },
}
```
### symbol的内置属性
```js
// Symbol.hasInstance
class Person {
    static [Symbol.hasInstance](param) {
        console.log(parent)
        console.log('我用来检测类型')
    }
}
let o = {}
console.log(o instanceof Person)
// Symbol.isConcatSpreadable
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr1.concat(arr2))//[1,2,3,[4,5,6]]
```

# 迭代器 Iterator
#### 迭代器(iterator)是一种接口，为各个不同的数据结构提供统一的访问机制，任何数据结构只要部署iterator接口，就可以完成遍历操作。

#### 1、ES6创建了一个新的遍历命令for...of 循环，itrerator接口主要提供for...of消费
#### 2、原生的具备itrerator接口的数据：Array Arguments Set Map String Tyedarray NodeList
#### 3、原理
* 创建一个指针对象，指向当前数据结构的起始位置
* 第一次调用的next方法，指针自动指向数据结构的第一个成员
* 接下来不断地调用next方法，指针一直向后移动，直到最后一个成员
* 每调用next方法返回一个value属性的对象
```js
const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧']
for (let v of xiyou) {
    console.log(v)
}
console.log(xiyou)
console.log(xiyou[Symbol.iterator]())
// Array Iterator { }
// [[Prototype]]: Array Iterator
// next: ƒ next()
// Symbol(Symbol.toStringTag): "Array Iterator"
// [[Prototype]]: Object
let itr = xiyou[Symbol.iterator]()
// 调用对象的next方法
console.log(itr.next())//{value: '唐僧', done: false}
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())//{value: '沙僧', done: false}
console.log(itr.next())//{value: undefined, done: true}
```
### 自定义遍历
```js
  const banji = {
      name: '向日葵班',
      stus: [
          '野原新之助',
          '风间彻',
          '佐藤正男',
          '樱田妮妮',
          '阿呆'
      ],
      [Symbol.iterator]() {
          // 索引变量
          let index = 0
          let self = this
          return {
              next: function () {
                  if (index < self.stus.length) {
                      const res = { value: self.stus[index], done: false }
                      index++;
                      return res;
                  } else {
                      const res = { value: undefined, done: true }
                      return res;
                  }
              }
          };
      }
  }
  // 遍历这个对象
  for (var v of banji) {
      console.log(v)
  }
  // 野原新之助
  // 风间彻
  // 佐藤正男
  // 樱田妮妮
  // 阿呆
```
# 生成器 Generator 
#### 生成器函数时ES6提供的一种异步遍历解决方案，语法行为与传统函数完全不一样
#### 生成器其实就是一个特殊的函数
```js
 // 异步编程 
// yield 函数代码的分隔符
function* gen() {
    // console.log(111)
    yield '一只没有尾巴';
    // console.log(222)
    yield '一只没有眼睛';
    // console.log(333)
    yield '真奇怪';
    // console.log(444)

    // console.log('hello generator')
}
let iterator = gen()
console.log(iterator)
console.log(iterator.next()) //{value: '一只没有尾巴', done: false}
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())//{value: undefined, done: true}

for (let v of gen()) {
    console.log(v)
}

iterator.next()
```
* 生成器函数参数
```js
// 异步编程 
// yield 函数代码的分隔符
function* gen(arg) {
    console.log(arg) //AAA
    let one = yield 111;
    console.log(one)//BBB
    let two = yield 222;
    console.log(two)//CCC
    let three = yield 333;
    console.log(three)//DDD
}
// 执行获取迭代去对象
let iterator = gen('AAA')
// next方法传入参数:从第二个开始 传入上一个的值
console.log(iterator.next('hhh'))
console.log(iterator.next('BBB'))
console.log(iterator.next('CCC'))
console.log(iterator.next('DDD'))
```
* 生成器函数实例
```js

// 异步编程： 文件操作 网络请求Ajax request 数据库操作
// 回掉地狱
// setTimeout(() => {
//     console.log('111')
//     setTimeout(() => {
//         console.log('222')
//         setTimeout(() => {
//             console.log('333')
//         }, 3000)
//     }, 2000)

// }, 1000)

function one() {
    setTimeout(() => {
        console.log(111)
        iterator.next()
    }, 1000)
}
function two() {
    setTimeout(() => {
        console.log(222)
        iterator.next()
    }, 2000)
}
function three() {
    setTimeout(() => {
        console.log(333)
        iterator.next()
    }, 3000)
}

function * gen() {
    yield one();
    yield two();
    yield three();
}
let iterator = gen()
iterator.next()
// 111
// 222
// 333
```

```js
function getUser() {
    setTimeout(() => {
        let data = '用户数据'
        iterator.next(data)
    }, 1000)
}
function getOrder() {
    setTimeout(() => {
        let data = '订单数据'
        iterator.next(data)
    }, 1000)
}
function getGoods() {
    setTimeout(() => {
        let data = '商品数据'
        iterator.next(data)
    }, 1000)
}
function* gen() {
    let user = yield getUser();
    console.log(user)

    let order = yield getOrder();
    console.log(order)

    let goods = yield getGoods()
    console.log(goods)
}
let iterator = gen()
iterator.next();
// 用户数据
// 订单数据
// 商品数据
```

# Set
#### ES6提供了新的数据结构Set(集合)。它类似于数组，但成员的值都是唯一的，集合实现了iterator接口，所以可以使用运算符与for...of进行遍历。
#### 集合的属性和方法
* size 返回集合的元素个数
* add 增加一个新元素，返回当前集合
* delete 删除元素 返回boolean值
* has 检查集合中是否包含某元素 返回boolean值
```js
let s = new Set()
let s1 = new Set(['赵', '钱', '孙', '李'])

// 元素的个数
console.log(s1.size)//4
// 添加新元素
s1.add('周') // { 赵, 钱, 孙, 李, 周 }
// 删除元素
s1.delete('李') //{赵, 钱, 孙, 周}
// 判断是否存在元素
console.log(s1.has('李')) //false
// 清空元素
s1.clear()
console.log(s1) 
```
set实例
```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// 1、数组去重
console.log([...new Set(arr)]) //[1, 2, 3, 4, 5]
// 2、交集
let arr2 = [4, 5, 6, 5, 6]
// let intersection = [...new Set(arr)].filter(item => {
//     let s2 = new Set(arr2)
//     if (s2.has(item)) {
//         return true
//     } else {
//         return false
//     }
// })
let intersection = [...new Set(arr)].filter(item => new Set(arr2).has(item))
console.log(rintersectiones) //[4,5]
// 3、合并
let res = [...new Set(arr.concat(arr2))]
console.log(res)
let union = [...new Set([...arr, ...arr2])]
console.log(union)
// [1, 2, 3, 4, 5, 6]

// 4、差集
let deff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)))
console.log(deff) //[1,2,3]
```
# Map
#### ES6提供了Map数据结构。它类似于对象，也是键值对的集合。但是’键‘的范围不限于字符串，各种数据类型的值（包括对象）都可以做键。Map也现实了iterator接口，所以可以使用’扩展运算符‘for...of进行遍历。
#### Map的属性和方法
* size 返回Map的元素个数
* set 增加一个新的元素，返回当前Map
* get 返回键名对象的键值
* has 检测Map中是否包含某元素，返回booleam值
* clear 清空集合，返回undefined
```js
// 声明Map
let m = new Map();
m.set('name', '蜡笔小新')
m.set('action', function () {
    console.log('屁股晃晃')
})

// 新增
let key = {
    class: '向日葵班'
}
m.set(key, ['正南', '风间彻', '阿呆']) //{name => 蜡笔小新, action => ƒ (), {class: '向日葵班'} => (3) ['正南', '风…', …]}

// 删除
m.delete('name') //{action => ƒ (), {class: '向日葵班'} => (3) ['正南', '风…', …]}

// 获取
console.log(m.get(key)) //['正南', '风间彻', '阿呆']

// 清空
m.clear()

// 遍历
for (let v of m) {
    console.log(v)
}
// ['name', '蜡笔小新']
// ['action', ƒ]
// [{… }, Array(3)]
console.log(m)
``` 
# class 类
#### ES6引入了更接近传统语言的写法，引入了class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看做一个语法糖。它的绝大多数功能ES5偶可以做到，新的class写法只是让对象的原型的写法更加清晰，更像面向对象变成的语言而已
```js
// ES5通过构造函数创建对象
function Phone(brand, price) {
    this.brand = brand;
    this.price = price;
}
Phone.prototype.call = function () {
    console.log('我可以打电话')
}
let Hw = new Phone('华为Mate6 Pro', 6999)
Hw.call()
console.log(Hw)
// ES6
class Phone {
    //构造方法 constructer不能改
    constructor(brand, price) {
        this.brand = brand;
        this.price = price;
    }
    // 方法必须使用该写法，不能使用ES5的对象完整形式
    call() {
        console.log('我可以打电话')
    }
}
let Hw = new Phone('华为Mate6 Pro', 6999)
Hw.call()
console.log(Hw)
```
* 静态成员 注：静态成员数属于类不属于实例对象
```js
// ES5
function Phone() {

}
// 静态成员
Phone.name = "Huawei" //静态类
Phone.call = function () {//静态方法
    console.log('遥遥领先')
}
let Huawei = new Phone()
console.log(Huawei.name) //undefined
Huawei.call() //TypeError TypeError: Huawei.call is not a function
// 上面的实例对象的属性和函数对象是不相通的

class Phone {
    // 静态成员
    static name = '手机';
    static call() {
        console.log('我可以打电话')
    }
}
let nokia = new Phone()
console.log(nokia.name) // undefined
console.log(Phone.name) // 手机
```
* 继承

```js
// ES5通过构造函数实现继承
function Phone(brand, price) {
    this.brand = brand;
    this.price = price;
}
Phone.prototype.call = function () {
    console.log('我可以打电话')
}

// 智能手机
function SmartPhone(brand, price, color, size) {
    Phone.call(this, brand, price)
    this.color = color;
    this.size = size;
}
// 设置子类的构造函数的原型
SmartPhone.prototype = new Phone;
SmartPhone.prototype.constructor = SmartPhone;//矫正

SmartPhone.prototype.photo = function () {
    console.log("我可以拍照")
}

SmartPhone.prototype.palyGame = function () {
    console.log('play Game')
}

const Hw = new SmartPhone('华为', 6999, '白色', 6.5)
console.log(Hw)

```
ES6继承: extends super
```js
class Phone {
    constructor(brand, price) {
        this.brand = brand;
        this.price = price;
    }
    call() {
        console.log('打电话')
    }
}

class SmartPhone extends Phone {
    constructor(brand, price, color, size) {
        super(brand, price);//Phone.call(this,brand,price)
        this.color = color;
        this.size = size;
    }
    photo() {
        console.log('拍照')
    }
    playGame() {
        console.log('打游戏')
    }
}

const Hw = new SmartPhone('华为', 2399, '黑色', 6.6)
console.log(Hw)
```
* 子类对父类方法的重写
```js
class Phone {
    constructor(brand, price) {
        this.brand = brand;
        this.price = price;
    }
    call() {
        console.log('打电话')
    }
}

class SmartPhone extends Phone {
    constructor(brand, price, color, size) {
        super(brand, price);//Phone.call(this,brand,price)
        this.color = color;
        this.size = size;
    }
    photo() {
        console.log('拍照')
    }
    playGame() {
        console.log('打游戏')
    }
    call() {
        console.log('我可以视频通话')
    }
}

const Hw = new SmartPhone('华为', 2399, '黑色', 6.6)
Hw.call() //我可以视频通话
// console.log(Hw)
```
# class的取值函数（getter）和存值函数（setter）
与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```js
class Phone {
    get price() {
        console.log('获取')
        return '100'
    }
    set price(newVal) {
        console.log('设置', newVal)
    }
}
let p = new Phone()
p.price
p.price = 101
console.log(p.price)
```

# 数值扩展
* Number.EPSILON是JavaScript最小的精度
```js
function equal(a, b) {
    if (Math.abs(a - b) < Number.EPSILON) {
        return true
    } else {
        return false
    }
}
console.log(0.1 + 0.3 === 0.3)//false
console.log(equal(0.1 + 0.2, 0.3))//true
```
```js
let a = 0b1010 //二进制10
console.log(a) //10

let b = 0o77// 八进制
console.log(b) //63

let c = 0xff//十六进制
console.log(c) //255
// Number.isFinite 检测一个值是否有限
console.log(Number.isFinite(100)) //true
console.log(Number.isFinite(100 / 0)) //false
console.log(Number.isFinite(Infinity)) //false
// Number.isNaN 检测一个数值是不是NaN
console.log(Number.isNaN(123)) //false
// Number.parseInt Number.parseFloat字符串转整数
console.log(Number.parseInt('521love'))//521
console.log(Number.parseFloat('3.1415926π'))//3.1415926
// Number.isInteger判断一个数值是不是整数
console.log(Number.isInteger(5)) //true
console.log(Number.isInteger(2.5)) //false
// Math.trunc将小数部分抹掉
console.log(Math.trunc(12.1))//12
// Math.sign检测一个数值是 正数负数还是0
console.log(Math.sign(0.1))//1
console.log(Math.sign(-1))//-1
console.log(Math.sign(0))//0
```
# 对象方法的扩充
```js
// Object.is 判断两个值是否完全一致
console.log(Object.is(1, 1))//true
console.log(Object.is(NaN, NaN))//false
console.log(NaN === NaN)//false

// Object.assign对象的合并
const hello = {
    name: 'hello',
    todo: 'say'
}
const world = {
    name: 'world'
}
console.log(Object.assign(hello, world))//{name: 'world', todo: 'say'}

// Object.getPrototypeOf、Object.setPrototypeOf设置原型对象
const Class = {
    name: '向日葵班'
}
const stus = ['小新', '正南', '阿呆', '小彻']
console.log(Object.setPrototypeOf(Class, stus))
console.log(Object.getPrototypeOf(Class))//['小新', '正南', '阿呆', '小彻']
console.log(Class)

```

# 模块化
#### 模块化是将一个大的程序文件，拆分成许多小的文件，然后将小的文件合起来
#### 模块化的好处：
* 防止命名冲突
* 代码复用
* 高维护性

### 模块功能主要由两个名利构成 export import
* export规定模块的对外接口
* import用于引入其他模块
##### 注意：vscde中安装Live Server 右键运行html文件
```js
// m.js
export let m = "hello export";
export function hello() {
  console.log('hello fun')
}
// html
<script type="module">
import * as m from './m.js'
console.log(m)
{/* Module {Symbol(Symbol.toStringTag): 'Module'}
hello: (...)
m: (...)
Symbol(Symbol.toStringTag): "Module" */}
</script>
```
### ES6模块暴露语法汇总
```js
// 1、统一暴露
let Class = '向日葵班'
function fun() {
  console.log('happy')
}
export { Class, fun }
// 2、默认暴露
export default {
  Class: '向日葵班',
  fun() {
    console.log('happy')
  }
}
console.log(m3.default) //{Class: '向日葵班', fun: ƒ}
```
### ES6引入模块语法汇总
```js
// 1、通用引入
import * as m from './m.js'
// 2、解构赋值形式
import {Class,fun} from './m.js'
import { Class as classOne, fun } from './m2.js'
console.log(classOne, fun)
// 向日葵班 ƒ fun() {
// console.log('happy')
// }
import { default as m3 } from './m2.js'
// 3、简便形式 只能用于默认暴露形式
import m2  from './m2.js'
```

## 浏览器使用ES6模块化
```js
// app.js
import * as m1 from './m.js';
import * as m2 from './m2.js';
console.log(m1, m2)
// html
<script src="./app.js" type="module"></script>
```
## babel引入模块化代码转换
### 安装工具
* babel-cli babel命令行工具
* balel-preset-env 预设包 能够把最新的ES转换为ES5的语法 
* browserify 打包工具
```
npm i babel-cli babel-preset-env browserify -D
```
babel 转换
```
npx babel static/js -d dist/js --presets=babel-preset-env 
```
打包 :
#### 打包命令：将app.js 打包为bundle.js:
```html
npx browserify dist/js/app.js -o dist/bundle.js

html
<script type="module" src="./dist/bundle.js"></script>
```
## ES6模块化引入NPM包
```js
// 安装jQuery包：
npm i jquery
// app.js import 导入包
import $ from 'jquery'; //const $=require('jquery')
$("body").css('background', 'pink');
```
# Reflect （反射）
#### 内置的js对象
##### （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

##### （2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
##### （3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
#### （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
## 静态方法
```js
const obj = {}
Reflect.set(obj, 'name', '蜡笔小新')
// Reflect.get(target, propertyKey) //读取对象target的属性propertyKay的值，等同于对象的属性值
console.log(Reflect.get(obj, 'name')) //蜡笔小新
// Reflect.apply(target, thisArgument, argumentsList)//调用一个指定的函数并绑定this和参数列表，等同于函数调用
const ages = [11, 33, 12, 54, 18, 96];
// 旧写法
// const youngest = Math.min.apply(Math, ages);
// const oldest = Math.max.apply(Math, ages);
// const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
console.log(youngest, oldest, type) //11 96 '[object Number]'
// Reflect.deleteProperty(target, propertyKey)//删除一个对象属性
Reflect.deleteProperty(obj, 'name')
console.log(obj) //{}
// Reflect.defineProperty(target, propertyKey, attributes)//类似于Object.defineProperty,不同 如果配置出现问题则返回false而不是报错
function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
console.log(MyDate.now)
// Reflect.construct(target, argumentsList)//用构造函数的方式创建一个子对象
function Greeting(name) {
  this.name = name;
}

// new 的写法
// const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
console.log(instance)
// Reflect.has(target, propertyKey)//判断是否有该属性
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

# Proxy  （代理）
### ES6 之后引入的 Proxy 类是 JavaScript 非常强大的元编程特性。它允许我们通过编写代码来改变 JavaScript 对象的基本行为。
```js
let p = new Proxy(target, handlers)
```
### Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
```js


let t = { x: 1, y: 2 }
let p = new Proxy(t, {})
console.log(p.x)//1
delete p.x
console.log(p.x) //undefined
p.z = 3
console.log(t.z)// 3

let p = new Proxy({}, {
  get: function (target, propkey) {
    return 35
  }
})
//第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有Proxy的介入，操作原来要访问的就是这个对象；
console.log(p.time)
console.log(p.love)

var target = {}
var handler = {}

let proxy = new Proxy(target, handler)
//handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。
proxy.a = 'blue'
console.log(target.a) //blue


var proxy1 = new Proxy({}, {
  get: function (target, propKey) {
    return 35;
  }
});
//proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
let obj = Object.create(proxy1);
console.log(obj.time)  // 35
// 同一个拦截器函数，可以设置拦截多个操作。
var handler1 = {
  get: function (target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function (target, thisBinding, args) {
    return args[0];
  },

  construct: function (target, args) {
    return { value: args[1] };
  }
}

var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);

console.log(fproxy(1, 2))
new fproxy(1, 2) // {value: 2}
console.log(fproxy) 
```
### 工程模式
Proxy.revocable() 工厂函数创建 Proxy。这个函数返回一个 Proxy 对象和 revoke() 函数。当调用 revoke() 函数时，代理立即停止工作：
```js
function accessTheDatabase() { /* implementation omitted */ return 42; }
let { proxy, revoke } = Proxy.revocable(accessTheDatabase, {});

console.log(proxy())    // => 42: The proxy gives access to the underlying target function
console.log(revoke()); // undefined
console.log(proxy());  //Cannot perform 'apply' on a proxy that has been revoked
````

## Proxy 实例的方法

* get()方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```
* set()方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
```js
let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
    return true;
  }
};

let person = new Proxy({}, validator)
person.age = 100
console.log(person) //{age: 100}
person.age = 'tina' //The age is not an integer
console.log(person)
```
* apply方法拦截函数的调用、call和apply操作。apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
* has()方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。has()方法可以接受两个参数，分别是目标对象、需查询的属性名。
* construct()方法用于拦截new命令，下面是拦截对象的写法。
#### construct()方法可以接受三个参数。

    target：目标对象。
    args：构造函数的参数数组。
    newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）。

* deleteProperty();deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
* defineProperty()方法拦截了Object.defineProperty()操作。
* getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
* getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
* isExtensible()方法拦截Object.isExtensible()操作。
* ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
* preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
* setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。


