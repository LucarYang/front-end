Promise 对象
Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口
它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
* 比回调函数的方式更加灵活
  Promise启动异步返回promise对象给回调函数
* 支持链式调用，可以解决回调地狱的问题
#### 回调地狱
```js
asnyFunc1(opt, (...args1) => {
  asnyFunc2(opt, (...args2) => {
    asnyFunc3(opt, (...args3) => {
      asnyFunc4(opt, (...arg4) => {
        //some opration
      })
    })
  })
})
```

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理
## Promise 的状态
### Promise对象有以下两个特点。
#### （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：
- pending（进行中）
- resolved / fulfilled（已成功）
- rejected（已失败）
#### （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果
Promise对象的状态改变，只有两种可能：<u>从pending变为fulfilled和从pending变为rejected。</u>只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

## Promise对象的值 
实例对象的另一个属性 [PromiseResult]
保存着对象(成功/失败)的结果：
- resolve
- reject


## Promise实例
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve(解决)和reject(拒绝)。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
* resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
* reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
```js
const promise = new Promise(function (resolve, reject) {
  //some code
  if (/* 异步操作成功 */) {
    resolve(value)
  } else {
    reject(error)
  }
})
```

### then
#### Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  })
}

timeout(100).then((value) => {
  console.log(value)
})
//done
```
#### Promise 新建后就会立即执行。
```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
##### Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}

var imgurl='https://i'
loadImageAsync(imgurl).then((value)=>{console.log(value)})

// 结果：
// <img src="https://i2.hdslb.com/bfs/face/95435106fa7ca76bbb6c025bd5632df57a28f871.jpg@120w_120h_1c">
```

```js
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        //console.log(xhr.status)
        reject(new Error('HTTP error ' + xhr.status));
      }
    };
    xhr.onerror = function () {
      //reject(new Error('Network error'));
      console.log('Network error')
      reject('Network error');
    };
    xhr.send();
  })

  return promise;
}
// 
getJSON('https://wx.crm.sdo.com/admin/api/customer/getUserInfo/4863741').then(function (json) {
  console.log('Contents:' + JSON.stringify(json))
})
```
Promise fs操作
```js
const fs = require("fs")
//回调函数
fs.readFile('p.json', (err, data) => {
  if (err) throw err;
  console.log(data.toString())
});

// Promise函数
let p = new Promise((resolve, reject) => {
  fs.readFile('p.json', (err, data) => {
    if (err) reject(err);
    resolve(data)
  })
})

p.then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})

// 分装

function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

mineReadFile('p.json').then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})
```
### Promise.prototype.then() 
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
```js
getJSON('https://wx.crm.sdo.com/admin/api/customer/getUserInfo/4863741').then(function (post) {
  post.commentURL = 'https://wx.crm.sdo.com/admin/api/customer/getUserInfo/4863741'
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err) {
  console.log("rejected: ", err);
});
```
### util.promisify()
```js
const util = require('util')
const fs = require('fs')
let mineReadFile = util.promisify(fs.readFile);
mineReadFile('p.json').then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})
```

## Promise API
### Promise构造函数：Promise(excutor){}
excutor会在Promise内部立即同步调用，异步操作在执行器中执行

### Promise.prototype.then方法(onResolved,onRejected)=>{}指定成功和失败的回调函数

### Promise.prototype.catch(onRejected)=>{}失败回调函数

### Promise.resolve(value)=>{} value 成功的数据或者Promise
返回一个成功或者失败的promise对象
```js
let p1 = Promise.resolve(123)
//如果传入的参数为非Promise类型的对象，则返回的结果为成功promise对象
// 如果传入的参数为Promise类型的对象，则参数的结果决定了resolve的结果
let p2 = Promise.resolve(new Promise((resolve, reject) => {
  reject('ok')
}))
console.log(p1)
p2.catch(reason => {
  console.log('Err')
})
```

### Promise.reject(reason)=>{}
reason失败的原因，返回一个失败的Promise
```js
let p1 = Promise.reject(123)
let p2 = Promise.reject(new Promise((resolve, reject) => {
  resolve('succ')
}))
console.log(p1) //[PromiseState]]: 'rejected', [[PromiseResult]]: 123,
console.log(p2) //[[PromiseState]]: 'rejected', [[PromiseResult]]: Promise
```

### Promise.all(promises)=>{}
promises 包含n个promise的数组；说明返回一个新的promise，只有所有的promise都成功，只要有一个失败就是直接失败
```js
let p1 = new Promise((resolve, reject) => {
  resolve('ok')
})
let p2 = Promise.resolve('success')
let p3 = Promise.resolve('OOK')
const result = Promise.all([p1, p2, p3])
console.log(result) 
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Array(3)0: "ok"1: "success"2: "OOK"
```

### Promise.race()
promises 包含n个promise的数组；说明返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态
```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  })
})
let p2 = Promise.resolve('success')
let p3 = Promise.resolve('OOK')
const result = Promise.race([p1, p2, p3])

// result
// Promise {<fulfilled>: 'success'}
```
### Promise.prototype.finally();finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```js
let p = new Promise((resolve, reject) => {
  reject('Error')
})
p.then(v => {
  console.log(v)
}).catch(r => {
  console.log(r)
}).finally(() => {
  console.log('结束啦')
})
// Error
// 结束啦
```

## promise 的关键问题

* 改变promise的状态
```js
let p1 = new Promise((resolve, reject) => {
  //resolve函数
   resolve('ok');//pending =>fulfilled(resolved)
  // reject 函数
  reject('err') //pending  =>rejected
  // 抛出错误
  throw 'err啦' //pending  =>rejected
})
```
* 一个promise对象指定多个成功/失败的回调，当promise状态改变时都会被回调
```js
let p = new Promise((resolve, reject) => {
  resolve('ok');
})

p.then(value => {
  console.log(value)
})

p.then(value => {
  console.log(value)
})
//ok
//ok
```
* 改变promise状态和回调的顺序问题
#### 1、直接执行resolve/reject 先改变promise状态在执行回调
#### 2、异步操作时先执行回调，再改变promise状态
```js
let p=new Promise((resolve,reject)=>{
setTimeout(()=>{
    resolve('ok')
},1000)
})
p.then(value=>{
    console.log(value)
},reason=>{
    console.log(reason)
})
```
* Promise.then()返回的新的promise的结果状态由什么决定
#### 由then()指定的回调函数执行的结果决定
```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
p.then(value => {
    // 1、抛出错误
    throw '出错啦'
    // 2、返回结果是非promise对象
    return 521
    // 3\返回结果是promise对象
    return new Promise((resolve, reject) => {
        resolve('success')
    })
    //console.log(value)
}, reason => {
    console.warn(reason)
})


```
* Promise任务串联
```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
p.then(value => {
    console.log(value)
    return new Promise((resolve, reject) => {
        resolve('success')
    })
}).then(value => {
    console.log(value)
}).then(value => {
    console.log(value)
})

// ok
// success
// undefined
```
* Promise异常穿透
```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('err ')
        resolve('Err')
    }, 1000)
})
p.then(value => {
    throw 'Error'
    console.log('111')
}).then(value => {
    console.log('222')
}).then(value => {
    console.log('333')
}).catch(reason => {
    console.log(reason)
})
// Error 
```
* 中断Promise链
```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
p.then(value => {
    console.log('111')
    // 有且只有一种方法，返回一个panding状态的Promise
    return new Promise(() => { })
}).then(value => {
    console.log('222')
}).then(value => {
    console.log('333')
}).catch(reason => {
    console.log(reason)
})
// 111
```



# 自定义(手写)Promise
* 构造函数
```js
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 声明属性
  this.callbacks = []

  // 保存实例对象this的值
  const self = this //self _this that

  // resolve 函数
  function resolve(data) {
    // 判断状态
    if (self.PromiseState !== 'pending') return;
    self.PromiseState = 'fulfilled'//resolved
    self.PromiseResult = data
    // 调用成功的回调函数
    setTimeout(() => {
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    })
  }

  // reject 函数
  function reject(data) {
    // 判断状态
    if (self.PromiseState !== 'pending') return;
    self.PromiseState = 'rejected'//resolved
    self.PromiseResult = data
    // 调用失败的回调函数
    setTimeout(() => {
      self.callbacks.forEach(item => {
        item.onReject(data)
      })
    })
  }
  //try catch捕获throw抛出的异常
  try {
    // 同步调用执行器函数
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  // 判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason;
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value
    //value=>{return value}
  }

  return new Promise((resolve, reject) => {
    // 封装函数
    function callback(type) {
      try {
        let result = type(self.PromiseResult)
        if (result instanceof Promise) {
          // 如果是promise对象
          result.then(v => {
            resolve(v)
          }, v => {
            reject(v)
          })
        } else {
          // 结果的对象状态为成功
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    // 调用回调函数 PromiseStute
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }
    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      })
    }
    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onReject: function () {
          callback(onRejected)
        }
      })
    }
  })
}

// 添加catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
// 添加resolve方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, r => {
        reject(v)
      })
    } else {
      resolve(value)
    }
  })
}

// 添加reject方法
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 添加all方法
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 生命变量
    let count = 0;
    let arr = [];
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        //对象状态是成功的
        count++;
        // 将当前promise对象成功的结果 存入到数组
        arr[i] = v;
        if (count === promises.length) {
          resolve(arr)
        }
      }, r => {

      })
    }
  })
}

// 添加race方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (var i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        // 改变返回结果为成功
        resolve(v)
      }, r => {
        reject(r)
      })
    }
  })
}

```

* class
```js
class Promise {
  constructor(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    // 声明属性
    this.callbacks = []

    // 保存实例对象this的值
    const self = this //self _this that

    // resolve 函数
    function resolve(data) {
      // 判断状态
      if (self.PromiseState !== 'pending') return;
      self.PromiseState = 'fulfilled'//resolved
      self.PromiseResult = data
      // 调用成功的回调函数
      setTimeout(() => {
        self.callbacks.forEach(item => {
          item.onResolved(data)
        })
      })
    }

    // reject 函数
    function reject(data) {
      // 判断状态
      if (self.PromiseState !== 'pending') return;
      self.PromiseState = 'rejected'//resolved
      self.PromiseResult = data
      // 调用失败的回调函数
      setTimeout(() => {
        self.callbacks.forEach(item => {
          item.onReject(data)
        })
      })
    }
    //try catch捕获throw抛出的异常
    try {
      // 同步调用执行器函数
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }

  }
  // 添加then方法
  then(onResolved, onRejected) {
    const self = this
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason;
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = value => value
      //value=>{return value}
    }

    return new Promise((resolve, reject) => {
      // 封装函数
      function callback(type) {
        try {
          let result = type(self.PromiseResult)
          if (result instanceof Promise) {
            // 如果是promise对象
            result.then(v => {
              resolve(v)
            }, v => {
              reject(v)
            })
          } else {
            // 结果的对象状态为成功
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      }
      // 调用回调函数 PromiseStute
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved)
        })
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      }
      if (this.PromiseState === 'pending') {
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved)
          },
          onReject: function () {
            callback(onRejected)
          }
        })
      }
    })
  }

  // 添加catch方法
  catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  // 添加resolve方法
  static resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(v => {
          resolve(v)
        }, r => {
          reject(v)
        })
      } else {
        resolve(value)
      }
    })
  }

  // 添加reject方法
  static reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // 添加all方法
  static all = function (promises) {
    return new Promise((resolve, reject) => {
      // 生命变量
      let count = 0;
      let arr = [];
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          //对象状态是成功的
          count++;
          // 将当前promise对象成功的结果 存入到数组
          arr[i] = v;
          if (count === promises.length) {
            resolve(arr)
          }
        }, r => {

        })
      }
    })
  }

  // 添加race方法
  static race = function (promises) {
    return new Promise((resolve, reject) => {
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          // 改变返回结果为成功
          resolve(v)
        }, r => {
          reject(r)
        })
      }
    })
  }
}
```

## async函数
### 1、函数的返回结果是一个Promise对象
### 2、promise对象的结果由async函数的返回值决定

```js
async function main() { }

let res = main()

console.log(res)
//Promise {<fulfilled>: undefined}
```
async和then的返回结果是一样的
```js
//async和then的返回结果是一样的
async function main() {
    // 1、如果返回值是一个Promise对象的数据
    return 'www' //Promise {<fulfilled>: undefined}
    // 2、如果返回值是一个promise对象
    return new Promise((resolve, reject) => {
        resolve('ok') //Promise {<fulfilled>: "ok"}
    })
    // 3、抛出异常
    throw 'oh no' //Promise {<rejected>: 'oh no'}
}
```

## await 表达式
* await右侧的表达式一般为promise对象，但也可以是其他值
* 如果表达式是promise对象，await返回的是promise成功的值
* 如果表达式是其他值，直接将此值作为await的返回值

### 注意
* await必须写在async函数中，但async函数中可以没有await
* 如果await的promise失败了，就会抛出异常，需要try catch捕获处理
```js
async function main() {
let p = new Promise((resolve, rejact) => {
    // resolve('ok')
    rejact('Err')
})
//1、右侧为promise的情况
let res = await p;
console.log(res)  //ok
// 2、右侧为其他值
let res2 = await 20;
console.log(res2)  //20
// 3、如果promise是失败的状态
try {
    let res = await p;
} catch (e) {
    console.log(e) //Err
}
}
main()
```
#### async await 结合
```js
const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function main() {
  try {
    let data1 = await mineReadFile("p.json")
    let data2 = await mineReadFile("p.json")
    let data3 = await mineReadFile("p.json")
    console.log(data1 + data2 + data3)
  } catch (e) {
    console.log(e)
  }
}
main()
```
async await ajax
```js
  function sendAJAX(url) {
      return new Promise((resolve, reject) => {
        resolve('ok')
      })
  }
  let btn = document.querySelector('#btn')
  btn.addEventListener('click', async function () {
      let duanzi = await sendAJAX('https://api.apiopen.top/getJoke')
      console.log(duanzi)
  })
```