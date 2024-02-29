var express = require('express');
var router = express.Router();

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
        res.json({
            code:'0000',//20000
            msg:'success',
            data:data
          })
    }).catch(err=>{
        res.json({
            code:'1001',//20000
            msg:'失败',
            data:null
          })
      return
    })
});

// // account 添加列表
// router.get('/account/create', function(req, res, next) {
 
//   res.render('create')
// });

// 新增记录
router.post("/account",function(req, res){
  // 获取请求体
  console.log(req.body)
 
  // 插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).then(data=>{
    // 成功提醒
    // res.render('success',{msg:'添加成功~',url:'/account'})
    res.json({
        code:'0000',
        msg:'创建成功',
        data:data
    })
  }).catch(err=>{
    res.json({
        code:'1001',
        msg:'失败',
        data:null
    })
    return
  })
  
})


//删除记录
router.delete('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id:id}).then(data=>{
    // 成功提醒
    res.json({
        code:'0000',
        msg:'删除成功',
        data:{}
    });
  }).catch(err=>{
    res.json({
        code:'1003',
        msg:'删除失败',
        data:null
    });
  })
});

// 获取单个账单api
router.get('/account/:id', (req, res) => {
    let {id}=req.params;
    AccountModel.findById(id).then(data=>{
        // 成功提醒
        res.json({
            code:'0000',
            msg:'获取成功',
            data:data
        });
      }).catch(err=>{
        res.json({
            code:'1004',
            msg:'获取失败',
            data:null
        });
      })
})

// 更新单个
router.patch('/account/:id', (req, res) => {
    let {id}=req.params;
    AccountModel.updateOne({_id:id},req.body).then(data=>{
        // 成功提醒
        // res.json({
        //     code:'0000',
        //     msg:'更新成功',
        //     data:data
        // });
        AccountModel.findById(id).then(data=>{
            // 成功提醒
            res.json({
                code:'0000',
                msg:'更新成功',
                data:data
            });
          }).catch(err=>{
            res.json({
                code:'1004',
                msg:'读取失败',
                data:null
            });
          })
      }).catch(err=>{
        res.json({
            code:'1005',
            msg:'更新失败',
            data:null
        });
      })
})

module.exports = router;
