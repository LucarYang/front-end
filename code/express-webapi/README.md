# webapi

## 框架 Express

## 日志 log4

- 中间件日志
- 结构日志
  - 按照日期划分文件夹
  - 日志 level：debug info error

## 数据库 Mysql

- MySQL 数据库
- ORM-Sequelize

## 功能模块

- 限流阀
- jwt(令牌刷新)
- 文件下载

## 项目目录

```
express=webapi/
|-- node_modules/ (npm 安装的依赖项)
|-- bin/ (启动目录)
|-- dist/ (打包文件)
|-- sql/ (sql文件)
|-- config/ (配置文件)
|-- public/ (静态文件，如 CSS、JS、图片等)
|-- src
      |-- utils/ (工具文件)
            |-- log4/ (日志)
            |-- middleware/ (中间价)
                    |-- jwt/ (令牌认证)
            |-- mysql/ (数据库)
            |-- sequelize_orm/ (sequelize_orm)
      |-- routes/ (路由文件)
      |-- models/ (模型文件，ORM 相关)
      |-- controllers/ (控制器文件)
|-- views/ (视图文件，如 EJS 模板)
|-- app.js (主应用文件)
|-- package.json
|-- webpack.config.js
```

## 开发排期：

- admin 前端:(3week)
  静态页面搭建(1week)
  接口联调与对接(1week)
  线上部署与调试(1week)

- 后端开发(3.5week)
  数据库表搭建与服务框架搭建(1week)
  前端接口开发(3day)
  测试部署上线联调-前端接口模块(2day)
  admin 后端接口开发(5day)
  测试部署上线联调-后端接口模块(2day)
