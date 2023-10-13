
# webpack基础

##### webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

## 安装webpack

```
npm install webpack webpack-cli --global 全局安装(不建议全局安装，因为会污染本地的webpack)
npm install webpack webpack-cli --save --dev 本地安装
```

#### 实例
项目目录下创建 src 文件，并在 src 下创建 hello.js、index.js
hello.js

```js
function hello() {
  console.log('hello webpack')
}
export default hello
```

index.js

```js
import hello from './hello'
hello()
```
#### 打包
在项目目录下执行 webpack,即打包完成，在 src 目录下生产 dist 文件和 dist/main.js。main.js 既是打包好的文件

```bash
webpack         - 全局的webpack打包
npx webpack     - 本地目录的webpack打包
```

打包完成的 ：main.js

```js
;(() => {
  'use strict'
  console.log('hello webpack')
})()
```
##### 查看打包信息
```
webpack --stats detailed
```

## 自定义 webpack - code04

命令行自定义打包方式：

```js
npx webpack --entry ./src/index.js --mode production  //通过 npx webpack --entry 入口文件 --mode production(生产环境) 编译打包项目
npx webpack ./src/index.js --mode production
```

### 通过 webpack 配置文件打包
webpack.config.js
```js
const path = require('path')
module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    filename: "bundle.js",//出口文件名
    path: path.resolve(__dirname, './dist')//出口文件地址
  },
  mode: 'none' //mode
}
```

## 插件Plugins - code04
HtmlWebpackPlu
```
npm install html-webpack-plugin -D
```
#### 配置plugin
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // ...
  plugins: [//插件
    new HtmlWebpackPlugin({
      template: './index.html',//模板文件
      filename: 'app.html',//生成文件
      inject: 'body'//js引用在哪个标签中
    })
  ]
}
```
npx webpack 编译完成；即在dist目录下生成了新的html：app.html，其中js引用在body标签中
#### 打包前清理dist下文件 clean:true
```js
module.exports = {
  // ...
  output: {
    filename: "bundle.js",//出口文件名
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true //打包前清理dist下文件
  },
  // ...
}
```

## mode
#### mode webpack编译模式
```js
module.exports = {
  // ...
  mode: 'development', //设置webpack编译模式为开发模式
  devtool: 'inline-source-map',//精准定位代码的行数
  // ...
}
```

#### 实时编译(自动监测文件变换的功能)
```
npx webpack --watch
```
#### webpack-dev-server 具有live reload(实时重新加载)功能
安装：
```
npm install webpack-dev-server -D
```
```js
devServer: {
  static: './dist' //项目访问地址为dist
}
```
启动项目即可访问http://localhost:8080/
```
npx webpack-dev-server
```

## 资源模块 accet modules - code05
#### 资源模块(asset module)是一种模块类型，它允许我们应用Webpack来打包其他资源文件（如字体，图标等）
- accet/resource 发送一个单独的文件并导出 URL
- accet/inlin 导出一个资源的URL
- asset/source 导入资源的源码代码
- accet 导出一个URL和发送一个单独的文件之间自动进行选择

### asset/resource
```js
module.exports = {
   //...
  output: {
    filename: "bundle.js",//出口文件名
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]'
  },
  //...
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash].[ext]'//images/test.png
        }
      }
    ]
  }
}
```
index.js 导入img .png格式的图片 并添加到页面中
```js
import imgsrc from './accet/lbxx.png';
import hello from "./hello";
hello()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)
```
generator优先于assetModuleFilename

### accet/inlin
```js
module.exports = {
  //...
  module: {
    rules: [
        //...
      {
        test: /\.svg$/,
        type: 'asset/inline',
      }
    ]
  }
}
```
index.js 导入img .svg格式的icon 并添加到页面中
```js

import logSvg from './accet/u899_seg1.svg';

const img2 = document.createElement('img')
img2.style.cssText = 'width:100px;height:100px'
img2.src = logSvg
document.body.appendChild(img2)
```

### asset/resource
```js
module.exports = {
  //...
  module: {
    rules: [
        //...
      {
        test: /\.txt$/,
        type: 'asset/source',
      }
    ]
  }
}
```
index.js 导入文件 .txt格式的代码  并添加到页面中
```js
import exampleTxt from './accet/example.txt';

const block = document.createElement('div')
block.style.cssText = 'width:400px;height:30px;background:aliceblue;'
block.textContent = exampleTxt
document.body.appendChild(block)
```

### asset 通用资源类型

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 //4kb ;当资源文件大于4的时候转为base64格式，否则生成目录文件;maxSize默认资源大小8kb
          }
        }
      }
    ]
  }
}
```
index.js 导入img .jpg格式的代码  并添加到页面中
```js
import jpgMap from './accet/lbxxall.jpg'

const img3 = document.createElement('img')
img3.style.cssText = 'width:220px;height:180px'
img3.src = jpgMap
document.body.appendChild(img3)
```

## loader 管理资源 - code06
#### webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
在 webpack 的配置中，loader 有两个属性：
- 1. test 属性，识别出哪些文件会被转换。
- 2. use 属性，定义出在进行转换时，应该使用哪个 loader。

#### 添加css-load、less-load
安装css-load、less-load
```bush
npm install css-loader -D
npm install less-style -D
npm install less-loader less -D
```
webpack.config.js
```js
module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'], //注意编译顺序style-loader<-css-loader<-less-loader
      }
    ]
  }
}
```
index.js
```js
//...
import './style.css';
import './style.less';
//...
document.body.classList.add('hello')
```

### 抽离和压缩css

#### 抽离css
安装mini-css-extract-plugin抽离css插件(本插件基于webpack5)：
```
npm install mini-css-extract-plugin --save-dev
```
webpack.config.js
```js
//...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  //...
   plugins: [//插件
     //...
    new MiniCssExtractPlugin(
      {
        filename: 'styles/[contenthash].css' //哈希格式名称
      }
    )
  ],
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],//MiniCssExtractPlugin代替'style-loader'
      }
    ]
  }
}
```
运行npx webpack命令即会在dist\styles\下生成新的css

#### 压缩css
```
npm install css-minimizer-webpack-plugin -D
```
webpack.config.js
```js
//...
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  //...
  mode: 'production', //development
  //...
  // 优化配置
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}
```

### 加载图片(css添加图片)
style.css
```css
/* ... */
.block-bg{
  background-image: url('./accet/lbxxFamily.png') !important;
}
```
index.js
```js
//...
const block = document.createElement('div')
block.style.cssText = 'width:400px;height:300px;background:aliceblue;'
block.classList.add('block-bg')
block.textContent = exampleTxt
document.body.appendChild(block)
//...
```
webpack.config.js
```js
//...
module.exports = {
  //...
  mode: 'development', //本地调试
  //...
}
```

### 加载 fonts 字体
webpack.config.js
```js
//...
module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      }
    ]
  },
 //...
}
```
style.css
```css
@font-face {
  font-family: 'iconfont';
  src: url('./accet/font.ttf') format('truetype');
}
/* ... */
```
index.js
```js
//...
const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = '&#xe668';
document.body.appendChild(span)
```

### 加载数据
#### 安装csv、xml loader
```
npm install csv-loader xml-loader -D
```
webpack.config.js
```js
//...
module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader',
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      }
    ]
  },
 //...
}
```
index.js
```js
import Notes from "./accet/data.csv";
import Data from "./accet/data.xml";
//...

console.log(Data) //json格式
console.log(Notes) //数组格式
```

### 自定义 JSON 模块 
##### 自定义parser代替webpack loader可以将任何 toml 、 yaml 或json5 文件作为 JSON 模块导入。
#### 安装toml yamljs json5
```
npm install toml yamljs json5 -D
```
webpack.config.js
```js
//...
module.exports = {
  //...
  module: {
    rules: [
      //...
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
 //...
}
```
index.js
```js
import josn from './accet/data.json5';
import toml from './accet/data.toml';
import Data from "./accet/data.xml";
import yaml from './accet/data.yaml';
//...
console.log(toml.title)
console.log(toml)
console.log(yaml.title)
console.log(yaml)
console.log(josn.title)
console.log(josn)
//...
```


## babel-loader - code07
#### Babel 是一个 JavaScript 编译器，可以将ES6+转化成ES5。在Webpack里使用Babel，需要使用 babel-loader
```
npm install -D babel-loader @babel/core @babel/preset-env
```
- babel-loader : 在webpack里应用 babel 解析ES6的桥梁
- @babel/core : babel核心模块
- @babel/preset-env : babel预设，一组 babel 插件的集合
webpack.config.js
```js
//...
module.exports = {
 //...
  module: {
    rules: [
      //...
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules编译成ES5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  //...
}
```

###  regeneratorRuntime 插件
#### regeneratorRuntime 是webpack打包生成的全局辅助函数，由babel生成，用于兼容async/await的语法。
regeneratorRuntime is not defined 这个错误显然是未能正确配置babel。正确的做法需要添加以下的插件和配置：
```
npm install --save @babel/runtime # 这个包中包含了regeneratorRuntime，运行时需要
npm install --save-dev @babel/plugin-transform-runtimwe # 这个插件会在需要regeneratorRuntime的地方自动require导包，编译时需要
```
webpack.config.js
```js
//...
module.exports = {
 //...
  module: {
    rules: [
      //...
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules编译成ES5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
              '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      }
    ]
  },
  //...
}
```

## 代码分离 - code08
#### 常用的代码分离方法有三种：
- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离chunk。
- 动态导入：通过模块的内联函数调用来分离代码

### 入口起点
```js
module.exports = {
  //...
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文
  //...
}
```
若两个js都引用了lodash，这样将会lodash都打包到这个两个文件中；造成了代码重复

### 防止重复
Entry dependencies
```js
//...
module.exports = {
  //...
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared', //防止重复
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash'//防止重复-重复的文件
  },//入口文件
  //...
}
```
SplitChunksPlugin
```js
//...
module.exports = {
  //...
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文件
  //...
  // 优化配置
  optimization: {
    //...
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

### 代码导入
当涉及到动态代码拆分时，webpack 提供了两个类似的技术。
- 第一种，也是推荐选择的方式是，使用符合 ECMAScript 提案 的 import() 语法 来实现动态导入。
- 第二种，则是 webpack 的遗留功能，使用 webpack 特定的 require.ensure 。
  

async-module.js 引用动态加载
```js
function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack', "I'm from import"], ' ')
    return element
  })
}
getComponent().then((element) => {
  document.body.appendChild(element)
})
```
indx.js 引入async-module
```js
import './async-module'
```
webpack.js
```js
//...
module.exports = {
  entry: {
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared', //防止重复
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash'//防止重复-重复的文件
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文件
  //...
  // 优化配置
  optimization: {
   //...放开splitChunks同时实现静态加载
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

### 懒加载
懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载
#### math.js 文件，在主页面中通过点击按钮调用其中的函数：
```js
export const add = (x, y) => {
  return x + y
}
export const minus = (x, y) => {
  return x - y
}
```
index.js
```js
//...
const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click', () => {
  import(/*webpackChunkName:'math'*/'./math.js').then(({ add }) => { //webpackChunkName魔法注释
    console.log(add(1, 2))
  })
})
document.body.appendChild(button)
```
第一次加载完页面， math.bundle.js 不会加载，当点击按钮后，才加载math.bundle.js 文件

### 预获取/预加载模块
Webpack v4.6.0+ 增加了对预获取和预加载的支持。在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resourcehint(资源提示)"，来告知浏览器：
- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资
index.js
```js
const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click', () => {
  import(/*webpackChunkName:'math',webpackPrefetch:true*/'./math.js').then(({ add }) => { //webpackChunkName魔法注释 | webpackPrefetch:true 预加载 |  webpackPreload:true 预加载
    console.log(add(1, 2))
  })
})

document.body.appendChild(button)
```
webpackPrefetch会在网路空闲的时候加载，

## 缓存 - code09
### 输出文件的文件名
通过替换 output.filename 中的 substitutions 设置，来定义输出文件的名称。webpack 提供了一种使用称为 substitution(可替换模板字符串) 的方式，通过带括号字符串来模板化文件名。其中， [contenthash] substitution 将根据资源内容创建出唯一 hash。当资源内容发生变化时， [contenthash] 也会发生变化。
```js
//...
module.exports = {
  //...
  output: {
  filename: '[name].[contenthash].js',
  //...
  },
  //...
}
```
见
```html
<link rel="prefetch" as="script" href="http://localhost:8080/math.08ed1e44457e638bba36.js">
<script defer="" src="index.141d0b34e18113d5f61a.js"></script>
<script defer="" src="another.4ab5574dc9f73c6bc728.js"></script>
```

### 缓存第三方库
webpack.config.js
```js
module.exports = {
  //...
  optimization: {
   //...
    splitChunks: {
      // chunks: 'all'
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```
见
```html
<script defer="" src="vendors.6a2270b342549bbd25bd.js"></script>
```

### 将 js 文件放到一个文件夹中
```js
module.exports = {
  //...
  output: {
    filename: "scripts/[name].[contenthash].js",//出口文件名
   //...
  },
}
```
见
```html
<link rel="prefetch" as="script" href="http://localhost:8080/scripts/math.08ed1e44457e638bba36.js">
<script defer="" src="scripts/index.205798b8346c84584e96.js"></script>
<script defer="" src="scripts/another.de9af1778e75cd346296.js"></script>
```


## 拆分开发环境和生产环境配置

### 公共路径
publicPath 配置选项在各种场景中都非常有用。你可以通过它来指定应用程序中所
有资源的基础路径。
webpack.config.js
```js
module.exports = {
  //...
  output: {
    filename: "scripts/[name].[contenthash].js",//出口文件名
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]',
    publicPath: 'http://localhost:8080/'
  }
}
```
dist/app.html
```html
<!-- ... -->
<link href="http://localhost:8080/styles/2064829a73bf817a57af.css" rel="stylesheet"></head>
<body>
<script defer src="http://localhost:8080/scripts/vendors.29025132a649c43205f8.js"></script><script defer src="http://localhost:8080/scripts/index.0e0787f457f459b9d3a0.js"></script><script defer src="http://localhost:8080/scripts/another.605352f71b3edc62b9a4.js"></script></body>
<!-- ... -->
```

### 环境变量
webpack 命令行 环境配置 的 --env 参数，可以允许你传入任意数量的环境变量。而在 webpack.config.js 中可以访问到这些环境变量。
```bash
npx webpack --env production 
{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }
```
#### webpack.config.js 通过env中接收参数
```js
//...
module.exports = (env) => {
  console.log(env, env.goal)
}
//...
```
```bash
npx webpack --env production --env goal=local
{
  WEBPACK_BUNDLE: true,
  WEBPACK_BUILD: true,
  production: true,
  goal: 'local'
} local
```
通过en配置环境变量
```js
module.exports = (env) => {
  //...
  return {
    //...
    mode: env.production ? 'production' : 'development', //development production
  }
}
```

### 生成环境的压缩
安装terser-webpack-plugin
```dash
npm install terser-webpack-plugin -D
```
webpack.config.js
```js
const TerserPlugin = require('terser-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
module.exports = (env) => {
  return {
    //...
    optimization: {
      minimizer: [
        //...
        new TerserPlugin()
      ],
     }
    //...
  }
}
```
运行 npx webpack --env production 

### 拆分配置文件

#### 拆分开发环境dev
- root目录下创建config文件；创建webpack.config.dev.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
module.exports = {
  // console.log(env, env.goal)

  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文件
  output: {
    filename: "scripts/[name].js",//出口文件名
    path: path.resolve(__dirname, '../dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]',
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules编译成ES5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 优化配置
  optimization: {
    splitChunks: {
      // chunks: 'all'
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

```
运行 npx webpack --config ./config/webpack.config.dev.js
#### 拆分生成环境prod
- root目录下创建config文件；创建webpack.config.pro.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
module.exports = {
  // console.log(env, env.goal)

  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文件
  output: {
    filename: "scripts/[name].[contenthash].js",//出口文件名
    path: path.resolve(__dirname, '../dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]',
    publicPath: 'http://localhost:8080/'
  },
  mode: 'production', //development production
  // devtool: 'inline-source-map',
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
  // devServer: {
  //   static: './dist'
  // },
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules编译成ES5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 优化配置
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
    splitChunks: {
      // chunks: 'all'
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

```

运行 npx webpack --config ./config/webpack.config.pro.js


### npm脚本
##### 将父目录的package.json 、 node_modules 与 package-lock.json 拷贝到当前目录下
##### 配置 npm 脚本来简化命令行的输入，这时可以省略 npx ：
10-multiple-env/package.json
```js
{
  //...
  "scripts": {
    "start":"webpack serve --config ./config/webpack.config.dev.js",
    "build":"webpack --config ./config/webpack.config.prod.js"
  },
  //...
}
```
运行脚本
```bash
npm run start
npm run build
```

### 提取公共配置
公共配置的 ../config/webpack webpack.config.common.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },//入口文件
  output: {
    path: path.resolve(__dirname, './dist'),//出口文件地址
    clean: true,
    assetModuleFilename: 'images/[contenthash].[ext]'
  },

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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules编译成ES5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 优化配置
  optimization: {
    splitChunks: {
      // chunks: 'all'
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

修改 ../config/webpack.config.dev.js 
```js
module.exports = {
  //入口文件
  output: {
    filename: "scripts/[name].js",//出口文件名
  },
  mode: 'development', //development production
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  }
}
```

修改 ../config/webpack.config.prod.js 
```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  output: {
    filename: "scripts/[name].[contenthash].js",//出口文件名
    publicPath: 'http://localhost:8080/'
  },
  mode: 'production',
  // 优化配置
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  performance: {
    hints: false
  }
}
```

### 合并配置文件
安装webpack-merge工具
npm install webpack-merge -D
修改 ../config/webpack.config.js 
```js
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.config.common')
const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(commonConfig, developmentConfig)
    case env.production:
      return merge(commonConfig, productionConfig)
    default:
      return new Error('No matching configuration was found')
  }
}
```








