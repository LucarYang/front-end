const { where } = require("sequelize");
const User = require("../models/User");
const userModule = {
  /**
   * 查询用户信息
   * @param {*} userId
   * @returns
   */
  async getUserInfo(userId) {
    try {
      const user = await User.findOne({
        where: { user: userId },
        attributes: ["id", "create_time", "user", "lastlogin", "is_used"],
      });
      if (!user) {
        return "User not found";
      }
      return user.dataValues;
    } catch (error) {
      //   console.error("Error finding user:", error);
      return "Error finding user:" + error;
    }
  },

  /**
   * 添加用户
   * @param {*} user
   * @returns
   */
  async addUser(user) {
    try {
      // 验证账号是否存在
      const { count } = await User.findAndCountAll({
        where: { user: user.user },
      });
      if (count > 0) {
        return "用户已存在";
      }
      // 添加用户
      const adduser = await User.create({
        user: user.user,
        password: user.password,
      });
      if (!adduser) {
        return "User not found";
      }
      return { id: adduser.id, user: adduser.user };
    } catch (error) {
      return "Error finding user:" + error;
    }
  },

  /**
   * 修改用户信息 (密码/状态)
   * @param {*} userId
   * @param {*} params
   * @returns
   */
  async upUser(userId, params = {}) {
    try {
      const updates = {}; //更新对象
      if (params.newPassWord != null) {
        updates.password = params.newPassWord;
      }
      if (params.is_used != null) {
        updates.is_used = params.is_used;
      }
      if (Object.keys(updates).length === 0) {
        throw new Error("No updates provided");
      }

      console.log(updates);
      const upuser = await User.update(updates, {
        where: { user: userId },
        // returning: true, // 获取更新后的记录，可以设置为true
        plain: true, // 返回原始数据对象
      });
      return upuser > 0
        ? { ok: "修改成功" }
        : "修改失败(没有行被更改,数据已经相同)";
    } catch (error) {
      return "Error finding user:" + error;
    }
  },

  /**
   *
   * @returns 查询所有用户
   */
  async getAll() {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "create_time",
          "user",
          "lastlogin",
          "updated_at",
          "is_used",
        ],
      });
      console.log(users);
      return users;
    } catch (error) {
      return "Error finding user:" + error;
    }
  },
};

module.exports = userModule;
