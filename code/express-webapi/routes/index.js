var express = require("express");
const session = require("express-session");
var router = express.Router();
const { mysqlClient } = require("../libs/mysql/mysqlClient");
const JWT = require("../libs/middleware/jwt/index");

const checkTokenMiddleware = require("../libs/middleware/jwt/checkTokenMiddleware");
const user = require("../src/controllers/user");

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
    console.log(req.session);
    req.session.destroy(() => {
      // res.render("success", { msg: "退出成功", url: "/login" });
      res.status(200).json({ code: 0, msg: "退出成功" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: -1, msg: error.toString() });
  }
});

const userModule = require("./../src/controllers/user");
const User = require("../src/models/User");
// 查询user
router.get("/user/:id", checkTokenMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const userInfo = await userModule.getuserInfo(userId);
    // userInfo不是object就是有数据异常
    if (typeof userInfo === "object") {
      res.status(200).json({ code: 0, msg: "sueccss", data: { ...userInfo } });
    } else {
      res.status(200).json({ code: -1, msg: userInfo, data: null });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
      error: error.toString(),
    });
  }
});

const authModule = require("./../src/controllers/Auth");
// 菜单权限
router.get("/menu/:id", checkTokenMiddleware, async (req, res) => {
  try {
    let { id } = req.params;
    const menu = await authModule.getMenuByUser(id);
    if (typeof menu === "object") {
      res.status(200).json({ code: 0, msg: "sueccss", data: { ...menu } });
    } else {
      res.status(200).json({ code: -1, msg: menu, data: null });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
      error: error.toString(),
    });
  }

  // mysqlClient.query("SELECT * FROM auth WHERE user = ?", [id], (err, data) => {
  //   if (err) {
  //     return res.status(500).json({ code: -1, msg: err }); // 发送500状态码和错误信息
  //   }
  //   if (data.length === 0) {
  //     return res.status(404).json({ code: -1, msg: "账号或密码错误" }); // 如果没有找到用户，发送一个404状态码
  //   }
  //   res.status(200).json({
  //     code: 0,
  //     msg: "success",
  //     data: {
  //       ...JSON.parse(data[0].menu),
  //     },
  //   });
  // });
});

// 添加新用户权限
router.post("/menu/:id", checkTokenMiddleware, (req, res) => {});

// 修改用户权限
router.put("/menu/:id", checkTokenMiddleware, (req, res) => {});

module.exports = router;
