const HtmWebpackPlugin = require('html-webpack-plugin')
// const { template } = require('lodash')
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    app2: './src/app2.js'
  },
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.json', '.vue']
  },
  plugins: [
    new HtmWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  // externalsType: 'script',
  externals: {
    jquery: {
      url: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js',
      global: '$'
    }
  }
}
