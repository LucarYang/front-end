const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    filename: "bundle.js",//出口文件名
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]'
  },
  mode: 'development', //mode
  devtool: 'inline-source-map',
  plugins: [//插件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    })
  ],
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash].[ext]'//images/test.png
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      }
    ]
  }
}