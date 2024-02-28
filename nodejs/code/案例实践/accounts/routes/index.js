var express = require('express');
var router = express.Router();

// 导入lowdb
const low=require('lowdb')
const FileSync=require('lowdb/adapters/FileSync')

const adapter=new FileSync(__dirname+'/../data/db.json')
// 获取db对象
const db=low(adapter)

// 导入shortid
const shortid=require('shortid')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// account 记账本列表
router.get('/account', function(req, res, next) {
   // 获取所有账单信息
  //  let account=db.get('accounts').value()
  //  console.log(account)
  // res.render('list',{accounts:account})

  let accounts = db.get('accounts').value();
  console.log(accounts)
  res.render('list',{accounts:accounts});
});

// account 添加列表
router.get('/account/create', function(req, res, next) {
 
  res.render('create')
});

// 新增记录
router.post("/account",function(req, res){
  // 获取请求体
  console.log(req.body)
  // 生成Id
  let id=shortid.generate()

  db.get('accounts').unshift({id:id,...req.body}).write()
  // res.send('添加记录')
  // 成功提醒
  res.render('success',{msg:'添加成功~',url:'/account'})
})


//删除记录
router.get('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  db.get('accounts').remove({id:id}).write();
  //提醒
  res.render('success', {msg: '删除成功~~~', url: '/account'});
});

module.exports = router;
