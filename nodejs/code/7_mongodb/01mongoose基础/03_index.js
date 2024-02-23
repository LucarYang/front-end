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
    // 5、创建文档的结构对象
    // 设置集合中文档的属性以及属性值的类型
    let BookSchema=new mongoose.Schema({
        name:String,
        author:String,
        price:Number,
        is_hot:Boolean,
        tags:Array,
        pub_date:Date,
        test:mongoose.Schema.Types.Mixed
    })
    // 6、创建模型对象 对文档操作的封装对象
    let BookModel=mongoose.model('books',BookSchema)

    // 7、新增
    return BookModel.create({
        name:'西游记',
        author:'吴承恩',
        price:58,
        is_hot:true,
        tags:['名著','历史'],
        pub_date:new Date('1682-01-01'),
        test:'abc123'
    }).then(data=>{
    console.log(data)
    }).catch(err=>{
        console.log(err)
    })

    // 8、关闭时数据库连接
    mongoose.disconnect()
})

//设置连接错误的回调
mongoose.connection.on('errror',()=>{
    console.log('连接错误')
})

//设置连接关闭的回调
// mongoose.connection.on('close',()=>{
//     console.log('连接关闭')
// })
