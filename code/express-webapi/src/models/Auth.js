const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../libs/sequelize_orm");
// `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
// `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
// `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '{}' COMMENT '用户名',
// `menu` json DEFAULT NULL,
// `isUse` tinyint(1) DEFAULT '0' COMMENT '是否启用',
// `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'updated_at ',
const Auth = sequelize.define(
  "auth",
  {
    id: {
      type: DataTypes.INET,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    create_time: { type: DataTypes.DATEONLY },
    user: { type: DataTypes.STRING },
    menu: { type: DataTypes.JSON },
    isUse: { type: DataTypes.BOOLEAN },
    updated_at: { type: DataTypes.DATEONLY },
  },
  {
    tableName: "auth", // 指定表名为 'user'
    timestamps: false, // 禁用自动时间戳
  }
);

module.exports = Auth;
