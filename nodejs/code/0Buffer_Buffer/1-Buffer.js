//1. alloc
let buf=Buffer.alloc(10)
console.log(buf)

//2. allocUnSafe 不安全，可能会包含旧的内存数据，alloc会对旧的内存清零，但是allocUnSafe创建快
let buf2=Buffer.allocUnsafe(10)
console.log(buf2)

//3.from
let buf3=Buffer.from('hello')
let buf4=Buffer.from([105,108,111,118,101,121,111,117])
console.log(buf3)
console.log(buf4)

let buf5=Buffer.from([105,108,111,118,101,121,111,117])

console.log(buf5.toString())//utf-8 

let buf6=Buffer.from('hello')
buf6[0]=361;//舍弃高位的数字
console.log(buf6) //69
