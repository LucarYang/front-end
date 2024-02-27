# MongoDB
MongoDB是一个基于分布式文件存储的数据库

## 核心概念
- 数据库(database)数据库是一个数据仓库,数据库服务下可以创建很多数据库,数据库中可以存放很多集合
- 集合(collection)集合类似于JS中的数组,在集合中可以存放很多文档
- 文档(document)文档是数据录中的最小单位,类似于js中的对象

```
--database
 |--collection
 |--collection
    |--document
    |--document
    |--document
--database
```
mongodb windows配置参照：https://zhuanlan.zhihu.com/p/604719050?utm_id=0

启动mongodb命令:mongod

mongodb的默认端口：27017

mongodb客户端程序 ：安装目录/bin/mongo.exe 双击启动

## 命令交互

### 数据库命令
通过cmd进入MongoDB： monog
```
    show dbs 显示所有数据库

    use 数据库名 切换到指定的数据库，如果数据库不存在会自动创建数据库

    db 显示当前所在的数据库

    use 库名
    db.dropDatabase() 删除当前数据库
```
### 集合命令
```
    db.createCollection('集合名词') 创建集合

    show collection 显示当前数据库中的所有数据库

    db.集合名.drop() 删除某个集合

    db.集合名.renameCollection 重命名集合

```

```cmd
> use bilibili
switched to db bilibili
> db
bilibili
> db.createCollection('users')
{ "ok" : 1 }
> show dbs
admin     0.000GB
bilibili  0.000GB
config    0.000GB
local     0.000GB
>
> db
bilibili
> show collections
users
> db.createCollection('books')
{ "ok" : 1 }
> db.createCollection('movies')
{ "ok" : 1 }
> show collections
books
movies
users
> db.movies.drop()
true
> show collections
books
users
> db.books.renameCollection('shuji')
{ "ok" : 1 }
> show collections
shuji
users
>
```

### 文档命令
```
db.集合名.insert(文档对象) 插入文档

db.集合名.find(查询条件) 查询文档
_id是mongodb自动生成的唯一编号，用来唯一标识文档

更新文档
db.集合名.update(查询条件，新的文档)
db.集合名.update({name:'tom'},{$set:{age:21}})

db.集合名.remove(查询条件) 删除文档
```

## mongoose

是一个对象模型库，官网

作用：方便用代码操作mongodb数据库

安装 npm i mongoose

node通过mongoose链接mogodb 
```js
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
```


插入文档
```js
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
        price:Number
    })
    // 6、创建模型对象 对文档操作的封装对象
    let BookModel=mongoose.model('books',BookSchema)

    // 7、新增
    return BookModel.create({
        name:'西游记',
        author:'吴承恩',
        price:58
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

```

### mongoose字段类型
|类型|描述|
|-|-|
|Stirng|字符串|
|Number|数字|
|Boolean|布尔值|
|Array|数组，也可以使用[]来标识|
|Date|日期|
|Buffer|Buffer对象|
|Mixed|任性类型，需要使用mongoose.Schema.Type.Mixed指定|
|ObejctID|对象ID，需要使用mongoose.Schema.Type.ObejctID指定|
|Decimal128|高精度数字，需要使用mongoose.Schema.Type.Decimal128指定|
```js
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

```

### mongoose字段值验证
mongoose有一些内建验证器，可以对字段值进行验证

- 必填项
```js
title:{
    type:String,
    required:true // 设置必填项
}
```

- 默认值
```js
author:{
    type:String,
    default:"匿名" // 默认值
}
```

- 枚举值
```js
gander:{
    type:String,
    enum:['男','女'] // 枚举值
}
```

- 唯一值
```js
username:{
    type:String,
    unique:true //唯一值
}
```
unique需要重建集合才能有效果
* 永远不要相信用书的输入

#### mongoose数据操作

- 批量添加
```js
...
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
```

- 删除一条
```js
    BookModel.deleteOne({
        _id:'65d7fadaa2798d5ef2ad3b0b'
    }).then(data => {  
    console.log('Documents deleted:', data.deletedCount);  
    })  
    .catch(err => {  
    console.error('Error:', err);  
    });
```

- 批量删除
```js
    BookModel.deleteMany({
        author:'--'
    }).then(data => {  
    console.log('Documents deleted:', data.deletedCount);  
    })  
    .catch(err => {  
    console.error('Error:', err);  
    });
```
- 更新一条
```js
    BookModel.updateOne({name:'西游记'},{price:'99'}).then(data => {  
        console.log(data.modifiedCount);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

- 批量更新
```js
    BookModel.updateMany({author:'余华'},{price:'99.99'}).then(data => {  
        console.log(data.modifiedCount);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

- 读取单条
```js
    BookModel.findOne({name:'活着'}).then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

- 根据ID来读取文档
```js
    BookModel.findById({_id:'65d7fadaa2798d5ef2ad3b06'}).then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

- 批量读取
```js
    BookModel.find({author:'余华'}).then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```
    
- 读取所有
```js
    BookModel.find().then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

### mongoose 条件控制
- 运算符

    在mongoose不能 > < >= <=等运算符，需要使用替代符号
    * > 使用$gt
    * < 使用$lt
    * >= 使用$gte
    * <= 使用$lte
    * != 使用$ne
```js
// 价格小于100的图书
BookModel.find({price:{$lt:100}}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});
```
- 逻辑运算

* $or 逻辑或的情况
* $and 逻辑与的情况

```js
// 价格小于100的图书
BookModel.find({price:{$lt:100}}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});

//吴承恩或者余华的书
BookModel.find({$or:[{author:'吴承恩'},{author:'余华'}]}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});

// 价格大于90小于100的书
BookModel.find({$and:[{price:{$gt:90}},{price:{$lt:100}}]}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});
```

- 正则匹配
条件中可以直接使用JS的正则语法，通过正则可以进行模糊查询
```js
// 正则表达式，搜索书名中带有`三`的书
BookModel.find({name:/三/}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});

BookModel.find({name:RegExp('三')}).then(data => {  
    console.log(data);  
})  
.catch(err => {  
    console.error('Error:', err);  
});
```
#### 个性化读取
- 字段筛选
```js
BookModel.find().select({name:1,author:1,_id:0}).exec().then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```
- 数据排序
```js
// sort 排序
// 1 升序
// -1降序

BookModel.find().select({name:1,price:1,_id:0}).sort({price:1}).exec().then(data => {  
        console.log(data);  
    })  
    .catch(err => {  
        console.error('Error:', err);  
    });
```

- 数据截取
```js
// skip 跳过
// limit 限定
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
```


### mongoose代码模块化

```js
/* 
@param {*} success 数据库连接成功的回调
@param {*} error 数据库连接失败的回调
*/

module.exports= function(success,error){
    // 判断 error 为期设置一个默认值
    if(typeof error!=='function'){
        error=()=>{
            console.log('连接失败~')
        }
    }
    // 1、安装mongoose
    // 2、导入
    const  mongoose=require('mongoose')

    // 设置strictQuery为true
    mongoose.set('strictQuery',true)

    const {DBHOST,DBPORT,DBNAME}=require('../config/config')

    // 3、连接
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    // 4、设置回调
    //设置连接成功的回调
    // mongoose.connection.on('open',()=>{  官方推荐使用once
    mongoose.connection.once('open',()=>{
        success()
    })

    //设置连接错误的回调
    mongoose.connection.on('errror',()=>{
        error()
    })

    //设置连接关闭的回调
    // mongoose.connection.on('close',()=>{
    //     console.log('连接关闭')
    // })
    /// // 8、关闭时数据库连接
    // mongoose.disconnect()
}
```



