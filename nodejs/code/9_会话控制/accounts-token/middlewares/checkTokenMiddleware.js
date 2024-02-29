const jwt=require('jsonwebtoken');
const {secret}=require('../config/config')

module.exports=(req,res,next)=>{
    // 获取token
    let token=req.get('token')
    if(!token){
      return res.json({
        code:'-1',
        msg:'token缺失',
        data:null
      })
    }
    // 校验token
    jwt.verify(token,secret,(err,data)=>{
      if(err){
        return res.json({
          code:'-1',
          msg:'token校验失败',
          data:null
        })
      }
    //   保存用户信息
    req.user=data
      next()
     })
 }
 