const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    publicPath: '/'
  },

  devServer: {
    static: path.resolve(__dirname, './dist'),//配置来提供页面代替任何404的静态资源响应
    compress: true,//是否代码压缩:可选择开启gzips压缩功能，对应静态资源请求的响应头里的Content-Encoding: gzip
    host: '0.0.0.0',//开发服务器主机：局域网访问
    port: 3000,//服区端口号
    headers: {
      'x-Access-Token': 'abc-123',//添加响应头：自定义headers传参
    },
    proxy: {
      "/api": 'http://localhost:9000' //开启代理，解决跨域问题
    },
    // https: true, //本地的https
    http2: true, //http2默认自带https自签名证书
    historyApiFallback: true,//配置来提供页面代替任何404的静态资源响应
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
}