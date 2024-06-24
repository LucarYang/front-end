var express = require("express");
var router = express.Router();
const { mysqlClient } = require("../libs/mysql/mysqlClient");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  const name = "admin";
  // 使用参数化查询来避免SQL注入
  mysqlClient.query(
    "SELECT * FROM user WHERE user = ?",
    [name], // 问号?是一个占位符，后面的数组[name]是对应的参数
    (err, data) => {
      if (err) {
        // 发送500状态码和错误信息
        return res.status(500).send("Error:", err);
      }
      if (data.length === 0) {
        // 如果没有找到用户，发送一个404状态码
        return res.status(404).send("User not found");
      }
      // 发送200状态码和用户数据
      res.status(200).json(data[0]); // 或者 res.send(data); 如果不想返回JSON格式
    }
  );
});

router.get("/menu", (req, res) => {
  res.send("menu");
});

module.exports = router;
