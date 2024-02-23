// 1、安装mongoose
// 2、导入
const  mongoose=require('mongoose')

// 设置strictQuery为true
mongoose.set('strictQuery',true)

// 3、连接
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')


// 4、设置回调
mongoose.connection.once('open',()=>{
    console.log('连接成功')
    // 5、创建文档的结构对象
    // 设置集合中文档的属性以及属性值的类型
    let BookSchema=new mongoose.Schema({
        name:String,
        author:String,
        price:Number
    })
    // 6、创建模型对象 对文档操作的封装对象      mongoose会使用集合名称的复数，创建集合
    let BookModel=mongoose.model('novel',BookSchema)

    // 7、新增
    BookModel.insertMany([{
        name:'西游记',
        author:'吴承恩',
        price:58
    },
    {
        name:'许三观卖血记',
        author:'余华',
        price:28
    },
    {
        name:'活着',
        author:'余华',
        price:38
    },
    {
        name:'红楼梦',
        author:'曹雪芹',
        price:58
    },
    {
        name:'三国',
        author:'不知道',
        price:280
    },
    {
        name:'水浒',
        author:'不知道',
        price:280
    },
    {
        name:'1984',
        author:'乔治',
        price:18
    },
    {
        name:'三体',
        author:'--',
        price:54
    },
    {
        name:'大宅门',
        author:'--',
        price:78
    },
    {
        name:'哈利波特',
        author:'--',
        price:100
    },
    {
        name:'百年孤独',
        author:'--',
        price:28
    },
    {
        name:'小王子',
        author:'--',
        price:28
    },
    {
        name:'三体',
        author:'--',
        price:28
    }
]).then(data=>{
        console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    

    // 8、关闭时数据库连接
    // mongoose.disconnect()
})

//设置连接错误的回调
mongoose.connection.on('errror',()=>{
    console.log('连接错误')
})

//设置连接关闭的回调
// mongoose.connection.on('close',()=>{
//     console.log('连接关闭')
// })
