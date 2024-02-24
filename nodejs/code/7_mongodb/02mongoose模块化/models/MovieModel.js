const  mongoose=require('mongoose')// 导入mongoose// 创建文档的结构对象

// 创建文档模型
let MovieSchema=new mongoose.Schema({
    title:String,
    director:String
})
// 创建模型对象 
let MovieModel=mongoose.model('movie',MovieSchema)

// 暴露模型对象
module.exports=MovieModel