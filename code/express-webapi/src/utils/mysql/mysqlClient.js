// 引入mysql模块
const mysql = require("mysql");
const config = require("../../../config/index"); //配置文件

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

// 查询方法
const query = (sql, params, callback) => {
  pool.query(sql, params, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// 封装增删改查方法

// 增（Create）
const create = (table, data, callback) => {
  const keys = Object.keys(data);
  const values = Object.values(data)
    .map((value) => `?`)
    .join(", ");
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values})`;
  query(sql, Object.values(data), callback);
};

// 查（Read）
const read = (table, where = "", callback) => {
  let sql = `SELECT * FROM ${table}`;
  if (where) {
    sql += ` WHERE ${where}`;
  }
  query(sql, [], callback);
};

// 更新单个记录（Update）
const updateById = (table, id, data, callback) => {
  const set = Object.keys(data)
    .map((key) => `${key}=?`)
    .join(", ");
  const sql = `UPDATE ${table} SET ${set} WHERE id = ?`;
  const params = [...Object.values(data), id];
  query(sql, params, callback);
};

//
// 删（Delete）
//
const deleteById = (table, id, callback) => {
  const sql = `DELETE FROM ${table} WHERE id = ?`;
  query(sql, [id], callback);
};

module.exports = {
  CueMysql,
  mysqlClient,
  query,
  create,
  read,
  updateById,
  deleteById,
};
