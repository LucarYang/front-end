var express = require("express");
var router = express.Router();
const { mysqlClient } = require("../utils/mysql/mysqlClient");
const JWT = require("../utils/middleware/jwt/index");

const checkTokenMiddleware = require("../utils/middleware/jwt/checkTokenMiddleware");

const userModule = require("../controllers/user");
const User = require("../models/User");

// 查询所有用户users

/**
 * 查询所有用户
 */
router.get("/users", checkTokenMiddleware, async (req, res) => {
  try {
    const users = await userModule.getAll();
    // userInfo不是object就是有数据异常
    if (typeof users === "object") {
      res.status(200).json({ code: 0, msg: "sueccss", data: { users } });
    } else {
      res.status(200).json({ code: -1, msg: users, data: null });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
      error: error.toString(),
    });
  }
});

/**
 * 查询user
 */
router.get("/:id", checkTokenMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const userInfo = await userModule.getUserInfo(userId);
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

/**
 * 新增用户
 */
router.post("/", checkTokenMiddleware, async (req, res) => {
  try {
    let { username, password } = req.body;

    // 验证账号\密码严格度
    var user_regex = /^.{6,}$/;
    if (!user_regex.test(username)) {
      return res.status(200).json({ code: 0, msg: "账号格式不正确" });
    }
    var regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}$/;
    if (!regex.test(password)) {
      return res.status(200).json({ code: 0, msg: "密码格式不正确" });
    }

    const user = await userModule.addUser({
      user: username,
      password: password,
    });
    if (typeof user === "object") {
      res.status(200).json({ code: 0, msg: "sueccss", data: { ...user } });
    } else {
      res.status(200).json({ code: -1, msg: user, data: null });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
      error: error.toString(),
    });
  }
});

/**
 * 修改用户信息
 */
router.put("/:id", checkTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassWord, is_used } = req.body;
    const user = await userModule.upUser(id, req.body);

    if (typeof user === "object") {
      res.status(200).json({ code: 0, msg: "sueccss", data: { ...user } });
    } else {
      res.status(200).json({ code: -1, msg: user, data: null });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
      error: error.toString(),
    });
  }
});

module.exports = router;
