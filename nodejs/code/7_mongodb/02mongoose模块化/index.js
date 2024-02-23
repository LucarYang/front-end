// 导入db

const db=require('./db/db')
const  mongoose=require('mongoose')// 导入mongoose
const BookModel=require('./models/BookModel')// 导入BookModel

// 调用函数
db(()=>{
    console.log('连接成功')
    BookModel.create({
        name:'还珠格格',
        author:'琼瑶',
        price:128
    }).then(data=>{
    console.log(data)
    }).catch(err=>{
        console.log(err)
    })
},()=>{
    console.log('连接失败')
})