const  mongoose=require('mongoose')// 导入mongoose// 创建文档的结构对象

// 设置集合中文档的属性以及属性值的类型
let AccountSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    time:Date,
    type:{
        type:Number,
        default:-1
    },
    account:{
        type:Number,
        require:true
    },
    remarks:String
})
// 创建模型对象 对文档操作的封装对象      mongoose会使用集合名称的复数，创建集合
let AccountModel=mongoose.model('accounts',AccountSchema)

// 暴露模型对象
module.exports=AccountModel