const Auth = require("../models/Auth");

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
      return menu.dataValues;
    } catch (error) {
      return "Error finding menu:" + error;
    }
  },
};

module.exports = authModule;
