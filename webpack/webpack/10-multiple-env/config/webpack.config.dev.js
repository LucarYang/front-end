module.exports = {
  //入口文件
  output: {
    filename: "scripts/[name].js",//出口文件名
  },
  mode: 'development', //development production
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist'
  }
}
