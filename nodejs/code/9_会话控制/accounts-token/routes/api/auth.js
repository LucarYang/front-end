var express = require('express');
var router = express.Router();

const UserModel=require('../../models/UserModel')

const md5=require('md5')
const jwt=require('jsonwebtoken')
const {secret}=require('../config/config')

// 登录操作
router.post('/login',(req, res, next) =>{
    // 获取用户名和密码
    let {username,password}=req.body
    // 查询数据库
    UserModel.findOne({username:username,password:md5(password)}).then(data=>{
        // 验证data
        if(!data){
            res.json({
                code:'-1',
                msg:'账号或密码错误',
                data:null
            })
            return
        }
        let token=jwt.sign({
            username:data.username,
            _id:data._id
        },secret,{
            expiresIn:60*60*24*7
        })
        // 响应token
        res.json({
            code:0,
            msg:'success',
            data:token
        })
      }).catch(err=>{
        res.json({
            code:'-1',
            msg:'DB 读取失败',
            data:null
        })
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
