const User = require("../models/User");
const Auth = require("../models/Auth");
const userModule = {
  /**
   * 查询用户
   */
  async getuserInfo(userId) {
    try {
      const user = await User.findOne({
        where: { user: userId },
        attributes: ["id", "create_time", "user", "lastlogin"],
      });
      if (!user) {
        return "User not found";
      }
      return user;
    } catch (error) {
      //   console.error("Error finding user:", error);
      return "Error finding user:" + error;
    }
  },
};

const authModule = {
  async getMenuByUser(userId) {
    try {
      const menu = await Auth.findOne({
        where: { user: userId },
        attributes: ["id", "create_time", "user", "menu", "isUse"],
      });
      if (!menu) {
        return "menu not found";
      }
      return menu;
    } catch (error) {
      return "Error finding menu:" + error;
    }
  },
};

module.exports = userModule;
