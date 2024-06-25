var express = require("express");
const session = require("express-session");
var router = express.Router();
const { mysqlClient } = require("../libs/mysql/mysqlClient");
const JWT = require("../libs/middleware/jwt/index");

const checkTokenMiddleware = require("../libs/middleware/jwt/checkTokenMiddleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 登录
router.post("/login", (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;
  // 使用参数化查询来避免SQL注入
  mysqlClient.query(
    "SELECT * FROM user WHERE user = ? and password= ?",
    [username, password], // 问号?是一个占位符，后面的数组[name]是对应的参数
    (err, data) => {
      console.log(req.body);
      if (err) {
        return res.status(500).json({ code: -1, msg: err }); // 发送500状态码和错误信息
      }
      if (data.length === 0) {
        return res.status(404).json({ code: -1, msg: "账号或密码错误" }); // 如果没有找到用户，发送一个404状态码
      }
      // 实例化 JWT 类
      const jwt = new JWT();
      console.log(data[0]);
      res.status(200).json({
        code: 0,
        msg: "success",
        data: {
          ...data[0],
          token: jwt.createToken({ ...data[0] }),
        },
      }); // 发送200状态码和用户数据 // 或者 res.send(data); 如果不想返回JSON格式
    }
  );
});

// 登出
router.post("/logout", (req, res) => {
  try {
    // 销毁session
    req.session.destroy(() => {
      res.render("success", { msg: "退出成功", url: "/login" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: -1, msg: error.toString() });
  }
});

// 查询user
router.get("/user/:id", checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  let token = req.get("token");
  console.log(req.get("token"));
  res.status(200).json({ id, token });
});

// 菜单权限
router.get("/menu/:id", checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  mysqlClient.query("SELECT * FROM auth WHERE user = ?", [id], (err, data) => {
    if (err) {
      return res.status(500).json({ code: -1, msg: err }); // 发送500状态码和错误信息
    }
    if (data.length === 0) {
      return res.status(404).json({ code: -1, msg: "账号或密码错误" }); // 如果没有找到用户，发送一个404状态码
    }
    res.status(200).json({
      code: 0,
      msg: "success",
      data: {
        ...JSON.parse(data[0].menu),
      },
    });
  });
});

// 添加新用户权限
router.post("/menu/:id", checkTokenMiddleware, (req, res) => {});

// 修改用户权限
router.put("/menu/:id", checkTokenMiddleware, (req, res) => {});

module.exports = router;
