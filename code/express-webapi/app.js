var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");

const loggerMiddleware = require("./libs/log4/logger"); //日志中间件
const mysqlClient = require("./libs/mysql/mysqlClient"); //MySQL链接
const { sequelize } = require("./libs/sequelize_orm/index"); //sequelize - mssql的orm

var app = express();

// 配置session会话中间件
app.use(
  session({
    secret: "wuxude12$%^&*()asdsd", // 设置你的session密钥
    resave: false, // 强制session被存储，即使它并没有变化
    saveUninitialized: true, // 强制一个未初始化的session被保存
    // 其他配置项...
  })
);
/** sequelize start*/
sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize已成功建立连接.");
  })
  .catch((error) => {
    console.error("sequelize建立连接失败:", error);
  });

// 当你的应用程序关闭时，确保关闭数据库连接。
process.on("exit", () => {
  sequelize.close();
});
``;
/** sequelize end*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(loggerMiddleware);

// console.log(indexRouter);
app.use("/", indexRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

mysqlClient.CueMysql(); //验证数据库是否连接成功
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
