// 1、安装mongoose
// 2、导入
const  mongoose=require('mongoose')

// 3、连接
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 4、设置回调
//设置连接成功的回调
// mongoose.connection.on('open',()=>{  官方推荐使用once
mongoose.connection.once('open',()=>{
    console.log('连接成功')
})

//设置连接错误的回调
mongoose.connection.on('errror',()=>{
    console.log('连接错误')
})

//设置连接关闭的回调
mongoose.connection.on('close',()=>{
    console.log('连接关闭')
})

setTimeout(()=>{
    mongoose.disconnect()
},2000)