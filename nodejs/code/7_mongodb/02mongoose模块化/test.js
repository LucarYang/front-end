const db=require('./db/db')
const  mongoose=require('mongoose')// 导入mongoose
const MovieModel=require('./models/MovieModel')// 导入BookModel

// 调用函数
db(()=>{
    console.log('连接成功')
    MovieModel.create({
      title:'热辣滚烫',
      director:'贾玲'
    }).then(data=>{
    console.log(data)
    }).catch(err=>{
        console.log(err)
    })
})