var express = require('express');
var router = express.Router();

const UserModel=require('../../models/UserModel')

const md5=require('md5')

// 注册页面
router.get('/reg', function(req, res, next) {
    // 响应HTML内容
    res.render('auth/reg')
})

// 注册用户
router.post('/reg', function(req, res, next) {
    // 表单验证
    // 响应HTML内容
    console.log(req.body)
    UserModel.create({...req.body,password:md5(req.body.password)}).then(data=>{
        // 成功提醒
        res.render('success',{msg:'注册成功~',url:'/login'})
      }).catch(err=>{
        res.status(500).send('err:'+err)
        return
      })
})


// 登录页面
router.get('/login', (req, res, next) => {
    // 响应HTML内容
    res.render('auth/login')
})

// 登录操作
router.post('/login',(req, res, next) =>{
    // 获取用户名和密码
    let {username,password}=req.body
    // 查询数据库
    UserModel.findOne({username:username,password:md5(password)}).then(data=>{
        // 验证data
        if(!data){
            res.send('账号或密码错误')
            return
        }
        // 写入session
        req.session.username=data.username
        req.session._id=data._id
        res.render('success',{msg:'登录成功~',url:'/account'})
      }).catch(err=>{
        res.status(500).send('err:'+err)
        return
      })
})

// 退出登录
router.post('/logout', (req, res, next) =>{
    // 销毁session
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})
module.exports = router;
