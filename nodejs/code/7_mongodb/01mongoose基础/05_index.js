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

    // // 7、删除一条
    // BookModel.deleteOne({
    //     _id:'65d7fadaa2798d5ef2ad3b0b'
    // }).then(data => {  
    // console.log('Documents deleted:', data.deletedCount);  
    // })  
    // .catch(err => {  
    // console.error('Error:', err);  
    // });

    // // 批量删除
    // BookModel.deleteMany({
    //     author:'--'
    // }).then(data => {  
    // console.log('Documents deleted:', data.deletedCount);  
    // })  
    // .catch(err => {  
    // console.error('Error:', err);  
    // });
   

    // // 更新一条
    // BookModel.updateOne({name:'西游记'},{price:'99'}).then(data => {  
    //     console.log(data.modifiedCount);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // // 批量更新
    // BookModel.updateMany({author:'余华'},{price:'99.99'}).then(data => {  
    //     console.log(data.modifiedCount);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });


    // // 读取单条
    // BookModel.findOne({name:'活着'}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // // 根据ID来读取文档
    // BookModel.findById({_id:'65d7fadaa2798d5ef2ad3b06'}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // // 批量读取
    // BookModel.find({author:'余华'}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // // 读取所有
    // BookModel.find().then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });


    // // 价格小于100的图书
    // BookModel.find({price:{$lt:100}}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // //吴承恩或者余华的书
    // BookModel.find({$or:[{author:'吴承恩'},{author:'余华'}]}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // // 价格大于90小于100的书
    // BookModel.find({$and:[{price:{$gt:90}},{price:{$lt:100}}]}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // 正则表达式，搜索书名中带有`三`的书
    // BookModel.find({name:/三/}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // BookModel.find({name:RegExp('三')}).then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });


    // 设置字段
    // BookModel.find().select({name:1,author:1,_id:0}).exec().then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // 数据排序
    // BookModel.find().select({name:1,price:1,_id:0}).sort({price:1}).exec().then(data => {  
    //     console.log(data);  
    // })  
    // .catch(err => {  
    //     console.error('Error:', err);  
    // });

    // 数据截取
    // BookModel.find().select({name:1,price:1,_id:0}).sort({price:1}).limit(3).exec().then(data => {   //截取前三个
    BookModel.find()
    .select({name:1,price:1,_id:0})
    .sort({price:1})
    .skip(3) //截取从第三个开始的三个
    .limit(3)
    .exec()
    .then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });


    // 8、关闭时数据库连接
    // mongoose.disconnect()
})

//设置连接错误的回调
mongoose.connection.on('errror',()=>{
    console.log('连接错误')
})

