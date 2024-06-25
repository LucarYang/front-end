const jwt = require("jsonwebtoken");
const config = require("../../../config/index");

module.exports = (req, res, next) => {
  let secret = config.jwt.secret;
  // 获取token
  let token = req.get("token");
  if (!token) {
    return res.json({
      code: "-1",
      msg: "token缺失",
      data: null,
    });
  }
  // 校验token
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: "-1",
        msg: "token校验失败",
        data: null,
      });
    }
    //   保存用户信息
    req.user = data;
    next();
  });
};
