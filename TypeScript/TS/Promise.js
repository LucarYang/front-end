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

// function Promise(executor) {
//   // 添加属性
//   this.PromiseState = 'pending'
//   this.PromiseResult = null
//   // 声明属性
//   this.callbacks = []

//   // 保存实例对象this的值
//   const self = this //self _this that

//   // resolve 函数
//   function resolve(data) {
//     // 判断状态
//     if (self.PromiseState !== 'pending') return;
//     self.PromiseState = 'fulfilled'//resolved
//     self.PromiseResult = data
//     // 调用成功的回调函数
//     setTimeout(() => {
//       self.callbacks.forEach(item => {
//         item.onResolved(data)
//       })
//     })
//   }

//   // reject 函数
//   function reject(data) {
//     // 判断状态
//     if (self.PromiseState !== 'pending') return;
//     self.PromiseState = 'rejected'//resolved
//     self.PromiseResult = data
//     // 调用失败的回调函数
//     setTimeout(() => {
//       self.callbacks.forEach(item => {
//         item.onReject(data)
//       })
//     })
//   }
//   //try catch捕获throw抛出的异常
//   try {
//     // 同步调用执行器函数
//     executor(resolve, reject)
//   } catch (e) {
//     reject(e)
//   }

// }

// // 添加then方法
// Promise.prototype.then = function (onResolved, onRejected) {
//   const self = this
//   // 判断回调函数参数
//   if (typeof onRejected !== 'function') {
//     onRejected = reason => {
//       throw reason;
//     }
//   }
//   if (typeof onResolved !== 'function') {
//     onResolved = value => value
//     //value=>{return value}
//   }

//   return new Promise((resolve, reject) => {
//     // 封装函数
//     function callback(type) {
//       try {
//         let result = type(self.PromiseResult)
//         if (result instanceof Promise) {
//           // 如果是promise对象
//           result.then(v => {
//             resolve(v)
//           }, v => {
//             reject(v)
//           })
//         } else {
//           // 结果的对象状态为成功
//           resolve(result)
//         }
//       } catch (e) {
//         reject(e)
//       }
//     }
//     // 调用回调函数 PromiseStute
//     if (this.PromiseState === 'fulfilled') {
//       setTimeout(() => {
//         callback(onResolved)
//       })
//     }
//     if (this.PromiseState === 'rejected') {
//       setTimeout(() => {
//         callback(onRejected)
//       })
//     }
//     if (this.PromiseState === 'pending') {
//       this.callbacks.push({
//         onResolved: function () {
//           callback(onResolved)
//         },
//         onReject: function () {
//           callback(onRejected)
//         }
//       })
//     }
//   })
// }

// // 添加catch方法
// Promise.prototype.catch = function (onRejected) {
//   return this.then(undefined, onRejected)
// }
// // 添加resolve方法
// Promise.resolve = function (value) {
//   return new Promise((resolve, reject) => {
//     if (value instanceof Promise) {
//       value.then(v => {
//         resolve(v)
//       }, r => {
//         reject(v)
//       })
//     } else {
//       resolve(value)
//     }
//   })
// }

// // 添加reject方法
// Promise.reject = function (reason) {
//   return new Promise((resolve, reject) => {
//     reject(reason)
//   })
// }

// // 添加all方法
// Promise.all = function (promises) {
//   return new Promise((resolve, reject) => {
//     // 生命变量
//     let count = 0;
//     let arr = [];
//     for (var i = 0; i < promises.length; i++) {
//       promises[i].then(v => {
//         //对象状态是成功的
//         count++;
//         // 将当前promise对象成功的结果 存入到数组
//         arr[i] = v;
//         if (count === promises.length) {
//           resolve(arr)
//         }
//       }, r => {

//       })
//     }
//   })
// }

// // 添加race方法
// Promise.race = function (promises) {
//   return new Promise((resolve, reject) => {
//     for (var i = 0; i < promises.length; i++) {
//       promises[i].then(v => {
//         // 改变返回结果为成功
//         resolve(v)
//       }, r => {
//         reject(r)
//       })
//     }
//   })
// }

