const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../libs/sequelize_orm");

// `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
// `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
// `user` varchar(100) DEFAULT NULL,
// `password` varchar(255) DEFAULT NULL,
// `lastlogin` datetime DEFAULT NULL,
// `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'updated_at',
// PRIMARY KEY (`id`)
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INET,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    create_time: { type: DataTypes.DATEONLY },
    user: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    lastlogin: { type: DataTypes.DATEONLY },
    updated_at: { type: DataTypes.DATEONLY },
    is_used: { type: DataTypes.BOOLEAN },
  },
  {
    tableName: "user", // 指定表名为 'user'
    timestamps: false, // 禁用自动时间戳
  }
);

module.exports = User;
