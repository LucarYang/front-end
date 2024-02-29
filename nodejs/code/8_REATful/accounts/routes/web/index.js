var express = require('express');
var router = express.Router();

// 导入lowdb
// const low=require('lowdb')
// const FileSync=require('lowdb/adapters/FileSync')

// const adapter=new FileSync(__dirname+'/../data/db.json')
// // 获取db对象
// const db=low(adapter)

// // 导入shortid
// const shortid=require('shortid')

// 导入moment
const moment=require('moment')
const AccountModel=require('../../models/AccountModel')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// account 记账本列表
router.get('/account', function(req, res, next) {
    // 获取所有账单信息
    // 读取集合的信息
    AccountModel.find().sort({time:-1}).exec().then(data=>{
      res.render('list',{accounts:data,moment:moment});
    }).catch(err=>{
      res.status(500).send('err:'+err)
      return
    })
});

// account 添加列表
router.get('/account/create', function(req, res, next) {
 
  res.render('create')
});

// 新增记录
router.post("/account",function(req, res){
  // 获取请求体
  console.log(req.body)
 
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性
    time:moment(req.body.time).toDate()
  }).then(data=>{
    // 成功提醒
    res.render('success',{msg:'添加成功~',url:'/account'})
  }).catch(err=>{
    res.status(500).send('err:'+err)
    return
  })
  
})


//删除记录
router.get('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id:id}).then(data=>{
    // 成功提醒
    res.render('success', {msg: '删除成功~~~', url: '/account'});
  }).catch(err=>{
    res.status(500).send('err:'+err)
    return
  })
});

module.exports = router;
