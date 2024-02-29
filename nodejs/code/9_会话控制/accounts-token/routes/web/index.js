var express = require('express');

// 导入moment
const moment=require('moment')
const AccountModel=require('../../models/AccountModel')

// 生命中间件检测登录
let cheackLoginMiddleware=require('../../middlewares/cheackLoginMiddleware')


var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
  res.redirect('/account')
});

// account 记账本列表
router.get('/account', cheackLoginMiddleware,function(req, res, next) {
  
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
router.get('/account/create',cheackLoginMiddleware, function(req, res, next) {
 
  res.render('create')
});

// 新增记录
router.post("/account",cheackLoginMiddleware,function(req, res){
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
router.get('/account/:id', cheackLoginMiddleware,(req, res) => {
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
