var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 记账本列表 */
router.get('/account', function(req, res, next) {
  res.render('list');
});

/* 添加记录 */
router.get('/account/create', function(req, res, next) {
  res.send('account create');
});

module.exports = router;
