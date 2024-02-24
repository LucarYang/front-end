const e = require('express');
var express = require('express');
var router = express.Router();

// 导入formidable
const {formidable} =require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 显示网页表单(文件上传)
router.get('/potrait',(req,res)=>{
  res.render('potrait');
})

// 处理文件上传
router.post('/potrait',(req,res,next)=>{
  // 创建表单对象
  const form= formidable({
    multiples:true,
    // 设置上传文件的保存目录
    uploadDir:__dirname+'/../public/images',
    // 保持文件后缀
    keepExtensions:true
  })

  // 解析请求报文
  form.parse(req,(err,fields,files)=>{
    if(err){
      next(err)
      return
    }
    // console.log(fields)//text radio checkbox select
    // console.log(files)//files
    // res.json({fields,files})

    // 服务器保存该图片的访问url
    console.log(files)
    let newname={...files.hand[0]}
    console.log(newname.newFilename)
    let imgUrl='/images/'+newname.newFilename //将此数据保存到数据库

    res.send('ok'+imgUrl);
  })
})

module.exports = router;
