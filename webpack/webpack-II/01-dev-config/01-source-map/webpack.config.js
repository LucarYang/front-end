const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: "development",

  entry: './app.js',

  output: {
    clean: true
  },

  devtool: 'cheap-module-source-map',//false,

  plugins: [
    new HtmlWebpackPlugin()
  ],
  module:{
    rules:[
      {
        test:/\.js/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      }
    ]
  }
}