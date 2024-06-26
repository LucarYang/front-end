const config = require("../../config/index");
const { Sequelize } = require("sequelize");
const { host, user, database, password } = config.mysql;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  logging: true, // 设置为true以在控制台中看到SQL查询
});

module.exports = { sequelize, Sequelize };
