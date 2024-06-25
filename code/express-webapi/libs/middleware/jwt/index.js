// JWT
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

class JWT {
  constructor() {
    this.secret = "wuxude12$%^&*()asdsd";
    this.initStrategy();
  }

  /**
   * 初始化jwt策略
   */
  initStrategy() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret,
    };

    const strategy = new Strategy(jwtOptions, (payload, done) => {
      done(null, payload);
    });

    passport.use(strategy);
  }

  /**
   * 返回中间件
   */
  middleware() {
    return passport.authenticate("jwt", { session: false });
  }

  /**
   * 创建token
   * @param {Object} data - 要签名的数据
   * @returns {string} - 生成的token
   */
  createToken(data) {
    // 有效期为1天1d 一小时1h 一分钟1m 一秒1*1000
    let token = jsonwebtoken.sign(data, this.secret, { expiresIn: "1h" });
    console.log(token);
    return token;
  }

  /**
   * 初始化并返回中间件，集成到express
   * @returns {Function} - express中间件
   */
  init() {
    return passport.initialize();
  }
}

module.exports = JWT;
