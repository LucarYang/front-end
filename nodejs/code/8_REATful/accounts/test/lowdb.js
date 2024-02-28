// 导入lowdb
const low=require('lowdb')
const FileSync=require('lowdb/adapters/FileSync')

const adapter=new FileSync('db.json')
// 获取db对象
const db=low(adapter)

// 初始化数据
// db.defaults({
//     posts:[],
//     user:[]
// }).write()

// 写入数据
// db.get('posts').push({id:1,title:'今天天气一般般'}).write()

// 获取数据
// console.log(db.get('posts').value())

// // 获取单挑
// let res=db.get('posts').find({id:1}).value()
// console.log(res)

// 删除数据
// let res=db.get('posts').remove({id:3}).write()
// console.log(res)

// 更新数据
// let res=db.get('posts').find({id:1}).assign({title:'今天下雨'}).write()
// console.log(res)