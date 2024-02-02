//1. alloc
let buf=Buffer.alloc(10)
console.log(buf)

// //2. allocUnSafe
// let buf2=Buffer.allocUnsafe(10)
// console.log(buf2)

//3.from
let buf3=Buffer.from('hello')
let buf4=Buffer.from([105,108,111,118,101,121,111,117])

console.log(buf4)
