// 引入mysql模块
const mysql = require("mysql");
const config = require("../../config/index"); //配置文件

// 创建连接池（可选，但推荐用于高并发场景）
const mysqlClient = mysql.createPool({
  ...config.mysql,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 测试连接
const CueMysql = () => {
  return mysqlClient.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("MySQL-数据库连接意外关闭.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("MySQL-数据库的连接太多.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("MySQL-数据库连接被拒绝.");
      }

      console.error("MySQL-数据库连接异常:", err);
    }

    if (connection) {
      connection.release(); // 使用完连接后，释放回连接池
      console.log("MySQL-数据库连接成功!");
    }
  });
};

// 当应用程序关闭时，关闭连接池
process.on("exit", () => {
  pool.end();
});

module.exports = { CueMysql, mysqlClient };
