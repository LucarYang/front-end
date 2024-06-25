const log4js = require("log4js");

const config = require("../../config/index"); //配置文件

// 配置 log4js
log4js.configure({ ...config.log4js });

// 获取 logger
const logger = log4js.getLogger("default");

// 日志中间件
const loggerMiddleware = (req, res, next) => {
  // console.log(req);
  logger.debug(`${req.method} ${req.url}`); // 记录请求方法和URL
  next();
};

module.exports = loggerMiddleware;
