const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    filename: "bundle.js",//出口文件名
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]'
  },
  mode: 'development', //development production
  devtool: 'inline-source-map',
  plugins: [//插件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(
      {
        filename: 'styles/[contenthash].css'
      }
    )
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
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 //4kb ;当资源文件大于4的时候转为base64格式，否则生成目录文件;maxSize默认资源大小8kb
          }
        }
      },
      {
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],//MiniCssExtractPlugin代替'style-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader',
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      },
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  },
  // 优化配置
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}