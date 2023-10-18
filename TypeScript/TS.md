# 安装配置
安装
```
npm install -g typescript
```
#### 配置编译目录：
安装ts之后，tsc --init

生成了tsconfig.json文件

然后调节"outDir": "./js"

此时我tsc -w就可以自动生成并更新的 index.js
参照：https://www.5axxw.com/questions/content/l6mzps

### 编译
编译目录下所有命令行运行(打开后一直在编译):
```
 tsc - w 
```
#### 在 tsconfig.json中通过"strict"配置严格模式
```
"strict": true,  
```

# 基础类型
#### 1、字符串
字符串是使用string定义的
```ts
let a: string = '123'
//普通声明
 
//也可以使用es6的字符串模板
let str: string = `dddd${a}`
```
#### 2、数字类型
```ts

let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```
#### 3、定义布尔值
```ts
let b:boolean=true;
let c:boolean=false;
```
#### 4、Null和undefined类型
```ts
let n:null=null;
let u:undefined=undefined;
n=a
a=n
```
#### 5、空值类型
可以用 void 表示没有任何返回值的函数
```ts
function fun():void{
  return;
}
// void也可以定义undefined 和 null类型
let v:void=null
let v2:void=undefined
```

### 安装 types/node
```
<!-- 小满的库 -->
npm ixmzs -g
命令：
mmp ls 查看npm多有源
mmp use 切换源
mmp -h 所有命令
```

```
npm i ts-node -g
<!-- 生成package.json -->
npm init -y
<!-- 声明文件 -->
npm i @types/node -D
```
注意：删除package.json中的"type": "module",
### 运行 
```
ts-node index.ts
```

# 任意类型
any 任意类型 unknown 不知道的类型，他们俩属于定义类型
```
数据类型等级：
1、top type 顶级类型 any unknown
2、Object
3、Number String Boolean
4、number string boolean
5、1   Lucar false
6、never
```
```ts
let a:any=111 //let a:unknown=[]
a='111'
a=['111']
a={1:'111'}
a=false
a=Symbol(1)
// any可以赋值给任意类型
let a:any=111 
let b:Number=2
a=b
b=a
// unknown不可以赋值给任意类型 只能赋值给自身或者any
let a:unknown=111 
let b:Number=2
a=b
let c:any=4
c=a

// unknown没有办法读任何属性 方法也不可以说调用
let a:unknown={'Tom':true,open:()=>'happy'}
// a.Tom
// a.open()
// unknown比any类型更加安全
```

# Object、object、{}
### Object：包含所有类型的Object；
### 原始类型和对象类型都指向Object，在ts中Object就表示包含了所有类型
```ts
let a:Object=123
let a1:Object="123"
let a2:Object=[]
let a3:Object={}
let a4:Object=()=>123
```
### object一般常用语泛型约束
### object代表非原始类型的一个类型
```ts
let a:object='123' //错误的 原始类型
let a1:object=123 //错误的 原始类型
let a2:object=false //错误的 原始类型
//引用类型
let a3:object=[] //正确
let a4:object={} //正确
let a5:object=()=>123 //正确
```
### {} 空对象 字面量模式
```ts
let a:{} //可以理解为 new Object  
let a1:{}=123 
let a2:{}='123' 
let a3:{}=[] 
let a4:{}={a:123} 

// {} 无法对对象类型做任何操作
let a:{} ={name:123}
a.name //错误
```

# 接口和对象类型
## interface
```ts

// 1、interface 重名成员会合并
// 2、interface 任意key [propName:string]:any
// 3、interface ? 表示可选
// 4、interface readonly 只读 常用语方法
// 5、interface extends 接口继承，成员也会被继承
// 接口的实例化不能多属性也不能少属性
interface I_acc extends I_b {
  name:string
  readonly id:number
  age:number
  [propName:string]:any //索引签名定义任意key
  number?:number
  cb:()=>boolean
  readonly cb1:()=>JSON
}
interface I_acc{
  Ikun:string
}

interface I_b{
  phoneNum:number
}

let a:I_acc={
  name:"蜡笔小新",
  id:1000123,
  age:10,
  Ikun:'123',
  a:1,
  b:'1',
  c:{},
  cb:()=>{
    return false;
  },
  cb1:()=>{
    return JSON.parse('{ "name":"abc", "alexa":10000}')
  },
  phoneNum:18221835000
}
a.cb()
// 6、interface 定义函数类型
interface Fn{
  (name:string):number[]
}

const fn:Fn=function(name:string){
  return [1]
}
```

# 数组类型
```ts
// number[] 数字类型的数组
//Array<boolean> 泛型的bool

// 数组的普通类型
let arr:number[]=[1,2,3,4]
let arr:Array<boolean>=[true,false]

// 定义对象数组使用interface
interface x{
  name:string
  age?:number
}
let arr:x[]=[{name:'蜡笔小新',age:5},{name:'小白'}]

// 二维数组
// number[][] *常用
// Array<Array<number>>
let arr:number[][]=[[1],[2],[3]]
let arr:Array<Array<number>>=[[1],[2],[3]]

// 大杂烩数组
// any[]
let anyArr:any[]=[1,'123',true,{}]

// 函数中参数中使用数组
function a(...args:any[]){
  console.log(args)//[ 1, 2, 3, 4 ]
  console.log(arguments) //{ '0': 1, '1': 2, '2': 3, '3': 4 }

  // let a:IArguments=arguments
  let a:A=arguments
}
a(1,2,3,4)

// arguments 的interface
interface A{
  callee:Function
  length:number
  [index:number]:any
}
```

# 函数扩展
* 函数的定义类型和返回值 | 箭头函数定义类型和返回值
```ts

function add(a:number,b:number):number{
  return a+b
}
const add=(a:number,b:number):number=>{
  return a+b
}
console.log(add(1,1)) //2
```
* 函数默认值的参数 | 函数可选参数
```ts
function add(a:number=10,b:number=20):number{
  return a+b
}
```
* 参数是一个对象如何定义
```ts
interface User{
  name:string
  age:number
}
function add(user:User){
  return user
}
console.log(add({name:'LuLu',age:24})) //{ name: 'LuLu', age: 24 }
```
* 函数this类型
```ts
interface Obj{
  user:number[]
  add:(this:Obj,num:number)=>void
}
// ts可以定义this的类型 在js中无法使用，必须第一个参数定义this的类型
let obj:Obj={
  user: [1,2,3],
  add(this:Obj,num:number){
    this.user.push(num)
  }
}
obj.add(4)
console.log(obj.user) //[ 1, 2, 3, 4 ]

```
* 函数重载
```ts
let user:number[]=[1,2,3]

function findNum(id:number):number[]
function findNum(add:number[]):number[]
function findNum():number[]
function findNum(ids?:number|number[]):number[]{
  if(typeof ids=='number'){
    return user.filter(v=>v==ids)
  }else if(Array.isArray(ids)){
    user.push(...ids)
    return user
  }else{
    return user
  }
}
console.log(findNum()) //[ 1, 2, 3 ]
findNum(3)
findNum([4,5,6])
console.log(findNum()) //[ 1, 2, 3, 4, 5, 6 ]
```

# 联合类型、类型断言、交叉类型
* 联合类型
```ts
let phone:number|string=1820000000
phone='021-85214521'

let fun=function(type:number|boolean):boolean{
  return !!type
}

console.log(fun(0)) //false
console.log(fun(true)) //true
```
* 交叉类型
```ts
interface People{
  name:string
  age:number
}
interface Man{
  sex:number
}

const Json=(man:People&Man):void=>{
  console.log(man)
}
Json({
  name:'杰森',
  age:100,
  sex:1
}) //{ name: '杰森', age: 100, sex: 1 }
```
* 类型断言
```ts
let fn=(num:number|string):void=>{
  console.log((num as string).length)
}
fn('1234') //4
fn(1234) //undefined
//-------------------类型断言不能乱用-------------
interface A{
  run:string
}

interface B{
  build:string
}
let fn=(type:A|B):void=>{
  console.log((<A>type).run)
}
fn({run:'Run'})//Run
fn({build:'Build'}) //undefined
//-----------------------------------------------
(window as any).abc=123
//-------------------类型断言不能乱用-------------
let fn=(type:any):boolean=>{
  return type as boolean
}

console.log(fn(1)) //1 

```

# 内置对象

* ecma：Number Date RegExp Error XMLHttpRequest
```ts
// ecma类型的定义
let num:Number=new Number(1)
let data:Date=new Date()
let reg:RegExp=new RegExp(/\w/)
let err:Error=new Error('err la')
let xhr:XMLHttpRequest=new XMLHttpRequest()
```
* dom querySelect MouseEvent
```ts
// dom类型的定义
// HTML(元素名称)Element  HTMLElement  Element
let div=document.querySelector('div')
let section=document.querySelector('section') //HTMLElement
// 元素的集合 NodeListOf类型不固定
let div1:NodeListOf<HTMLDivElement|HTMLElement>=document.querySelectorAll('div') //document.querySelectorAll('footer')
```
// bom promise localStorage location cookie
```ts
// bow 浏览器或者Windows相关的类型
let local:Storage=localStorage
let lo:Location=location
let promise:Promise<string>=new Promise((r)=>r("1"))
promise.then(res=>{
  res.concat('1')
})
let cookie:string= document.cookie
```

#### 代码雨
```ts
let canvas:HTMLCanvasElement=document.querySelector('canvas')
let ctx=canvas.getContext('2d')
 canvas.width=screen.availWidth
 canvas.height=screen.availHeight
 
 let str:string='hellocanvas0010010101011'.split('')
 let Arr=Array(Math.ceil(canvas.width/10)).fill(0)

 
 const rain=()=>{
  ctx.fillStyle='rgba(0,0,0,0.05)'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle='#0f0'
  Arr.forEach((item,index)=>{
    ctx.fillText(str[Math.floor(Math.random()*str.length)],index*10,item+10)
    Arr[index]=item>canvas.height||item>10000*Math.random()?0:item+10
  })
 }
 setInterval(rain,40)
```
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ES6</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script>

    </script>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script src="/ts_to_js/index.js"></script>
</body>

</html>
```

# class类
* class的基本用法 继承 和类型约束 implement
```ts
// implement进行类型约束
interface Options{
  el:string|HTMLElement
}
interface VueClass{
  options:Options,
  init():void
}

class Vue implements VueClass {
  options: Options
  constructor(options:Options){
  this.options=options
  }
  init(): void {
    
  }
}
new Vue({
  el:'#app'
})
```
```ts
interface Options{
  el:string|HTMLElement
}
interface VueClass{
  options:Options,
  init():void
}
interface Vnode{
  tag:string //div  section header
  text?:string
  children?:Vnode[]
}
//虚拟DOM 通过js描述DOM 去渲染真是的DOM
class Dom{
  //创建节点的方法
  createElement(el:string){
    return document.createElement(el)
  }
  // 填充文本的方法
  setText(el:HTMLElement,text:string|null){
    el.textContent=text
  }
  // 渲染函数
  render(data:Vnode){
    let root=this.createElement(data.tag)
    if(data.children&&Array.isArray(data.children) ){
      data.children.forEach(item=>{
        let child=this.render(item)
        root.appendChild(child)
      })
    }else{
      this.setText(root,data.text)
    }
    return root
  }
}
class Vue extends Dom implements VueClass {
  options: Options
  constructor(options:Options){
    super()
  this.options=options
  this.init()
  }
  init(): void {
    let data:Vnode={
      tag:'div',
      children:[
        {
          tag:'section',
          text:'我是子节点'
        }
      ]
    }
    let app=typeof this.options.el=='string'? document.querySelector(this.options.el):this.render(data)
    app?.appendChild(app)
  }
}
new Vue({
  el:'#app'
})
```
* class的修饰符readonly private protected public
 readonly 只读，private 只能在内部使用，protected 只子类和内部使用，public 内部外部 哪里都可以用
* super原理
```ts
super() //父类的prototype.construct.call 给父类传参，也可以通过super调用父类的属性和方法
```
* 静态方法
```ts
class Demo {
    static Name: string
    static version() {
        return '1.0.0'
    }

}

console.log(Demo.version()) //1.0.0
```
* get和set
```ts
class Ref {
    _value: any
    constructor(value: any) {
        this._value = value
    }
    get value() {
        return this._value + '_e'
    }
    set value(newVal) {
        this._value = newVal + "_set"
    }
}

const ref = new Ref('哈哈哈')
console.log(ref.value)//哈哈哈_e
ref.value = '嘻嘻'
console.log(ref.value) //嘻嘻_set_e
```

# 抽象类
#### 基类 抽象类
#### abstract 所定义的类就是抽象类
#### abstract 所 定义的方法，都只能是描述不能进行一个实现
#### 抽象类无法实例化
```ts
abstract class Vue {
    Name?: string
    constructor(name?: string) {
        this.Name = name
    }
    getName(): string | undefined {
        return this.Name
    }
    abstract inti(name: string): void
}
// 抽象类的实例化
class React extends Vue {
    constructor() {
        super()
    }
    inti(name: string): void {
        throw new Error("Method not implemented.")
    }
    setName(name: string) {
        this.Name = name
    }
}

const resct = new React()
resct.setName('哈哈哈哈')
console.log(resct.getName())//哈哈哈哈
```

# 元组
#### 元组（Tuple）是固定数量的不同类型的元素的组合。
```ts
let arr:[number,boolean]=[1,false]
arr[0]=1
arr.push(1)
type first=typeof arr[0]//type first = number
type first1=typeof arr['length'] //first1->2

let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined] //只读不可更改值
// 实际应用
let excl:[string,string,number][]=[
  ['a','b',1],
  ['a','b',1],
  ['a','b',1],
]
```

# 枚举 enume
#### 在javaScript中是没有枚举的概念的TS帮我们定义了枚举这个类型
##### 使用枚举 通过enum关键字定义我们的枚举
* 数字枚举
```ts
enum Color{
  red=1,
  green,
  blue
}
console.log(Color.red) //0
console.log(Color.green) //1
console.log(Color.blue) //2
```
* 增长枚举
```ts
enum Color{
  red=1,
  green,
  blue
}
console.log(Color.red) //1
console.log(Color.green) //2
console.log(Color.blue) //3
```
* 字符串枚举
```ts
enum Color{
  red='red',
  green='green',
  blue='blue'
}
console.log(Color.red) //red
console.log(Color.green) //green
console.log(Color.blue) //blue
```
* 异构枚举
```ts
enum Color{
  yes=1,
  no='no',

}
console.log(Color.yes) //1
console.log(Color.no) //no
```
* 接口枚举
```ts
// 数字枚举
enum Color{
  yes=1,
  no='no',

}

interface A{
  red:Color.yes
}

let obj:A={
  red: Color.yes //1
}

```
* const 枚举
```ts
const enum types{
  success,
  fail
}

//const 编译成常量 不是const编译成对象
let code=0
if(code==types.success){

}

```
* 反向映射
#### 包含正向映射(name->value)反向映射(value->name)
```ts
enum Type{
  success=1
  // success='1'字符串无法反射
}
let success:number=Type.success
let key=Type[success]
console.log(success)//0
console.log(key)//success
```

# 类型推论和类型别名
## 类型推论
```ts
let str='1' //let str: string
let arr=[1,2,3] //let arr: number[]
let arr1=[1,'',null] //let arr1: (string | number | null)[]

let any //let any: any
any=123
any=undefined
```
## 类型别名 type
### 枚举和interface很像，都可以定义类型，区别：
- 1、type可以写交叉类型 &B，interface不可以
- 2、type可以写联合类型 |string，interface不可以
- 3、interface遇到重名的可以合并
```ts
type s=string|null
let str:s='111'

type na=number[] &B

interface A extends B{
  nu:number[],
  name:string
}
interface B{

}

```
### extends在type中是'包含'的意思
### 左边的值会作为右边类型的子类型
- 1、any unknown
- 2、Object
- 3、Number String Boolean
- 4、number string boolean
- 5、1 '123' true
- 6、never
```ts
type num=1 extends number ?1:0 //num=1
type num=1 extends any ?1:0 //num=1
type num=1 extends Object ?1:0 //num=1
type num=1 extends never ?1:0 //num=0
```

# never类型
#### TypeScript 将使用 never 类型来表示不应该存在的状态(很抽象是不是)
```ts
type a=string&number //type a = never
// 函数执行会报错或者异常 使用never类型更合适
function test():never{
  throw new Error('test 错啦')
  while(true){}
}

type A=void |number|never  //type A = number | void //在联合类型中，never被忽略

type action='唱歌'|'跳舞'|'rap'|'骑行'
function kun(value:action){
  switch(value){
    case '唱歌':break
    case '跳舞':break
    case 'rap':break
    case '骑行':break
    default:
      // 兜底逻辑
      const error:never=value
      break
  }
}
```

# symbol
#### 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。
#### symbol类型的值是通过Symbol构造函数创建的。
```js
let a1:symbol=Symbol(2)
let a2:symbol=Symbol(2)
console.log(a1,a2)
console.log(a1===a2)//false Symbol的值是唯一的；创建的时候内存地址都不一样的


// Symbol.for for全局中找有没有注册过这个key，如果有就直接拿来用，如果没有他就去创建一个
console.log(Symbol.for('1')===Symbol.for('1')) //true 

let obj={
  name:1,
  [a1]:11,
  [a2]:2222
}
console.log(obj) //{ name: 1, [Symbol(2)]: 11, [Symbol(2)]: 2222 }

// for in  不能读到Symbol
for(let key in obj){
  console.log(key) //name
}
console.log(Object.keys(obj)) //[ 'name' ] //不能读到Symbol
console.log(Object.getOwnPropertyNames(obj)) //[ 'name' ] //不能读到Symbol
console.log(Object.getOwnPropertySymbols(obj)) //[ Symbol(2), Symbol(2) ] 只能读到symbol
console.log(Reflect.ownKeys(obj)) //[ 'name', Symbol(2), Symbol(2) ]
```

### 1、生成器
```ts
function * gen(){
  yield Promise.resolve('蜡笔小新')//同步或者是异步
  yield '阿呆'
  yield '正南'
}

const gn=gen()
console.log(gn.next()) //{ value: Promise { '蜡笔小新' }, done: false }
console.log(gn.next()) //{ value: '阿呆', done: false }
console.log(gn.next()) //{ value: '正南', done: false }
console.log(gn.next()) //{ value: undefined, done: true }
```
### 2、迭代器
```ts
// set Map
let set:Set<number>=new Set([1,2,3,2,1])//天然去重 1,2,3
console.log(set) //{ 1, 2, 3 }
let map:Map<any,any>=new Map()
let arr=[1,2,3]
map.set(arr,'嘻嘻')
console.log(map.get(arr)) //嘻嘻

function args(){
  console.log(arguments)//伪数组 类数组
}
// let list=document.querySelectorAll('div')//伪数组
// list.forEach
// 实现一个迭代器
const each=(value:any)=>{
  let It:any=value[Symbol.iterator]()
  let next:any={done:false}
  while(!next.done){
    next=It.next();
    if(!next.done){
      console.log(next.value)
    }
  }
}

each(map)//[ [ 1, 2, 3 ], '嘻嘻' ]
each(set)// 1 2 3
each(arr)// 1 2 3
// 迭代器的语法糖 for of
for(let v of set){
  console.log(v)
}
for(let v of map){
  console.log(v)
}
// 6.for of 对象不能用 对象身上没有 itrerator
// 7.解构的底层原理也是调用itrerator ...的底层原理也是调用itrerator 数组底层原理也是调用itrerator
// 8.让对象支持for of
let obj={
  max:5,
  current:0,
  [Symbol.iterator](){
    return {
      max:this.max,
      current:this.current,
      next(){
        if(this.current==this.max){
          return{
            value:undefined,
            done:true
          }
        }else{
          return{
            value:this.current++,
            done:false
          }
        }
      }
    }
  }
}
for (let v of obj){
  console.log(v)
}
// 0
// 1
// 2
// 3
// 4

let x=[...obj]
console.log(x) //[ 0, 1, 2, 3, 4 ]

let x1={...obj} //对象解构 创建了另一个新的对象 x1，该对象是通过展开（或解构）obj 对象的结果。实际上和Object.assign({}, obj)一样
console.log(x1)
// {
//   max: 5,
//   current: 0,
//   [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
// }
```

# 泛型
泛型 -> 动态类型
```ts
function fn1(a:number,b:number):Array<number>{
  return [a,b]
}

function fn<T>(a:T,b:T):Array<T>{
  return [a,b]
}

// number
fn(1,2)
fn(true,false)
fn('a','b')

// 类型别名定义泛型
type A<T>=string | number | T
let a:A<boolean>=true//1 '123' false

// interface 定义泛型
interface Data<T>{
  msg:T
}
let data:Data<string>={
  msg:'string类型的msg'
}
//T=number默认为number
function add<T=number,K=number>(a:T,b:K):Array<T|K>{ 
  return [a,b]
}
console.log(add(false,null))  //[ false, null ]
console.log(add(1,true)) //[ 1, true ]
```

#### 手写axios泛型的应用
```ts
const axios={
  get<T>(url:string):Promise<T>{
    return new Promise((resolve,reject)=>{
      let xhr:XMLHttpRequest=new XMLHttpRequest()
      xhr.open('GET',url)
      xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 &&xhr.status==200){
          resolve(JSON.parse(xhr.responseText))
        }
      }
      xhr.send(url)
    })
  }
}
interface Data{
  massage:string,
  code:number
}
axios.get<Data>('./data.json').then(v=>{
  console.log(v) //{massage: 'suc', code: 0}
})
```
## 泛型约束
```ts
// extends泛型约束 ：T类型后更一个extends 在跟一个类型
function add<T extends number>(a:T,b:T){
  return a+b
}
add(1,2)

interface Len{
  length:number
}

function fn<T extends Len>(a:T){
  a.length
}

fn('')
fn([])
// fn(1)数字没有length
```
### 泛型约束 keyof
```ts
let obj={
  name:'Tom',
  sex:'男'
}
type Key=keyof typeof obj

function ob<T extends object,K extends keyof T>(obj:T,key:K){
  return obj[key]
}
console.log(ob(obj,'name')) //Tom
```
### 泛型约束 keyof -> for in 的用法
```ts
interface Data{
  name:string
  age:number
  sex:string
}

type Options<T extends object>={
readonly [key in keyof T]?:T[key]
}

type b=Options<Data>
// b:
// type b = {
//   readonly name?: string | undefined;
//   readonly age?: number | undefined;
//   readonly sex?: string | undefined;
// }
```

# tscconfig.json 配置文件
#### 生成配置文件

```bash
tsc --init
```
```ts
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "jxsFactory":"React.creatElement",
  "jxs":"preserve",
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

# namespace 命名空间

```ts
// export { };
namespace A{
  export const a=1;
}
console.log(A.a) //1

// 1、嵌套的命名空间
namespace C{
  export namespace B{
    export const a=2;
  }
}
console.log(C.B.a) //2

// 2、抽离命名空间
// --------------b.ts-----------------
export namespace B{
  export const a=3;
}
// --------------b.ts-----------------

import { B } from './b';
console.log(B) //{ a: 3 }

// 3、简化命名空间
namespace A  {
  export namespace B {
      export const C = 4
  }
}

import X = A.B.C
console.log(X); //4


// 4、合并命名空间
namespace A  {
  export const b=1
}
namespace A  {
  export const C=1
}
// A.b 
// A.C
```

# 三斜线指令
```ts
///<reference path="b.ts" />
///<reference path="a.ts" />
namespace A{
  export const c='C'
}
A.fn()
A.c
///<reference path="node" />
```

# 声明文件 declare 
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
```
npm i express
npm i axios
```
```ts
import aixos from 'axios'; //自带声明
aixos.get('')


import express from 'express'; //npm i --save-dev @types/express 安装社区给的声明文件
// 直接调用声明
// a=false
// expname
const app=express()

const router =express.Router()

app.use('/api',router)

router.get('/api',(req:any,res:any)=>{
  res.json({
    code:200
  })
})
app.listen(9001,()=>{
  console.log('9001')
})
```
#### 手写声明文件 
```ts
// ../typings/express.d.ts
import aixos from 'axios'; //自带声明
aixos.get('')

import express from 'express'; //npm i --save-dev @types/express 安装社区给的声明文件
// 直接调用声明
// a=false
// expname
const app=express()

const router =express.Router()

app.use('/api',router)

router.get('/api',(req:any,res:any)=>{
  res.json({
    code:200
  })
})
app.listen(9001,()=>{
  console.log('9001')
})
```

# Mixins混入
* 对象的混入
```ts
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let person:Name={name:'Lucar'}
let person1:Age={age:18}
let person2:Sex={sex:1}

let obj=Object.assign(person,person1,person2)
console.log(obj) //{ name: 'Lucar', age: 18, sex: 1 }
```
* 类的混入
```ts
class A{
  type:boolean= false;
  changetype():void{
    this.type=!this.type
  }
}
class B{
  name:string="嘻嘻嘻"
  getname():string{
    return this.name
  }
}

class C implements A,B{
  type: boolean=false
  changetype!:()=>void
  name:string="h哈哈"
  getname!: () => string;
}


Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
  itemCls.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
          curCls.prototype[name] = item.prototype[name]
      })
  })
}

let ccc=new C()
ccc.changetype()
console.log(ccc.type) //true
ccc.name='Lucar'
console.log(ccc.getname()) //Lucar
```

# 装饰器 Decorator
#### 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。
首先在tsconfig.json中修改 experimentalDecorators和emitDecoratorMetadata 为true 既可以使用装饰器
```js                               /* Specify what JSX code is generated. */
"experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
"emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
```
* 1、类装饰器 ClassDecorator target 构造函数
  #### 不破坏原有类自身结构 ，从而给类添加属性和方法 起到修饰作用
```ts
const Base:ClassDecorator=(target)=>{
  console.log(target) //[class Http]
  target.prototype.name='属性'
  target.prototype.fn=()=>{
    console.log('我是函数')
  }
}
@Base
class Http{
  //...

}

const http=new Http() as any
Base(Http)
console.log(http.name) //属性
http.fn() //我是函数
```
* 2、装饰器工厂 ClassDecorator
```ts
const Base=(name:string)=>{
  const fn:ClassDecorator=(target)=>{
    target.prototype.name=name
    target.prototype.fn=()=>{
      console.log('我是函数')
    }
  }
  return fn
}
@Base('new name')
class Http{
  //...

}
const http=new Http() as any
console.log(http.name) //new name
```
* 方法装饰器
```js
import axios from "axios"

// 3、方法装饰器 MethodDecorator
const Base=(name:string)=>{
  const fn:ClassDecorator=(target)=>{
    target.prototype.name=name
    target.prototype.fn=()=>{
      console.log('我是函数')
    }
  }
  return fn
}

const Get=(url:string)=>{
  const fn:MethodDecorator=(target,key,descriptor:PropertyDescriptor)=>{
    console.log(target,key,descriptor)
    axios.get(url).then(res=>{
      descriptor.value(res.data)
    })
  }
  return fn
}

@Base('new name')
class Http{
  @Get("https://wx.crm.sdo.com/admin/api/customer/getUserInfo/4863741")
  getList(data:any){
    console.log(data)
  }
  // @Post()
  create(){}
}
const http=new Http() as any

// {} getList {
//   value: [Function: getList],
//   writable: true,
//   enumerable: false,
//   configurable: true
// }
// { res: -5 }
```
* 参数装饰器ParameterDecorator
#### 安装 npm i reflect-metadata
```ts
import axios from "axios"

import 'reflect-metadata'
const Base=(name:string)=>{
  const fn:ClassDecorator=(target)=>{
    target.prototype.name=name
    target.prototype.fn=()=>{
      console.log('我是函数')
    }
  }
  return fn
}

const Get=(url:string)=>{
  const fn:MethodDecorator=(target,key,descriptor:PropertyDescriptor)=>{
    console.log(target,key,descriptor)
    axios.get(url).then(res=>{
      const key = Reflect.getMetadata('key',target)
      descriptor.value(key ? res.data[key] :res.data)
    })
  }
  return fn
}
const Result=()=>{
  const fn:ParameterDecorator =(target:any,key,index)=>{
    console.log(target,key,index) //{} getList 0
    Reflect.defineMetadata('key','result',target)
  }
  return fn
}
@Base('new name')
class Http{
  @Get("https://viptest.sdo.com/wxcorp/eapi/user/appletinfo")
  getList(@Result() data:any){
    console.log(data)
  }
  // @Post()
  create(){}
}

const http=new Http() as any
// http.getList
```
* 属性装饰器 PropertyDecorator
```ts
import axios from "axios"

import 'reflect-metadata'
// 3、方法装饰器
const Base=(name:string)=>{
  const fn:ClassDecorator=(target)=>{
    target.prototype.name=name
    target.prototype.fn=()=>{
      console.log('我是函数')
    }
  }
  return fn
}

const Get=(url:string)=>{
  const fn:MethodDecorator=(target,key,descriptor:PropertyDescriptor)=>{
    console.log(target,key,descriptor)
    axios.get(url).then(res=>{
      const key = Reflect.getMetadata('key',target)
      descriptor.value(key ? res.data[key] :res.data)
    })
  }
  return fn
}
const Result=()=>{
  const fn:ParameterDecorator =(target:any,key,index)=>{
    console.log(target,key,index) //{} getList 0
    Reflect.defineMetadata('key','result',target)
  }
  return fn
}

const Name:PropertyDecorator  =(target:any,key)=>{
  console.log(target,key) //{} uname
}

@Base('new name')
class Http{
  @Name
  uname:string
  constructor(){
    this.uname='属性装饰器'
  }
  @Get("https://viptest.sdo.com/wxcorp/eapi/user/appletinfo")
  getList(@Result() data:any){
    console.log(data)
  }
  // @Post()
  create(){}
}

const http=new Http() as any
// http.getList
```

# Rollup构建TS项目 & webpack构建TS项目 & esbuild + swc























