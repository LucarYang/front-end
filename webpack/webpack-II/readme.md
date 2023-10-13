# 提高开发效率，完善团队开发规范

## source-map

#### souce-map:映射到源码(将报错信息(bundle错误的语句及其所在行列)映射到源码上)

#### webpack已经内置了sourcemap的功能，我们只需要通过简单的配置，将可以开启它

#### 新建项目，在目录下安装

```bash
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

7种SourceMap模式
| 模式                    | 解释                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| eval                    | 每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.                               |
| source-map              | 生成一个SourceMap文件.                                                                                    |
| hidden-source-map       | 和 source-map 一样，但不会在 bundle 末尾追加注释.                                                         |
| inline-source-map       | 生成一个 DataUrl 形式的 SourceMap 文件                                                                    |
| eval-source-map         | 每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap                                          |
| cheap-source-map        | 生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的sourcemap） |
| cheap-module-source-map | 生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的  |

- eval

```js
//...
module.exports = {
  //...
  devtool: 'eval'//false,
  //...
}
```

- source-map

```js
module.exports = {
  //...
  devtool: 'source-map',
  //...
}
```

- hidden-source-map

```js
module.exports = {
  //...
  devtool: 'hidden-source-map',
  //...
}
```

- inline-source-map

```js
module.exports = {
  //...
  devtool: 'inline-source-map',
  //...
}
```

- eval-source-map

```js
module.exports = {
  //...
  devtool: 'inline-source-map',
  //...
}
```

- cheap-source-map

```js
module.exports = {
  //...
  devtool: 'inline-source-map',
  //...
}
```

- cheap-module-source-map
安装 ：npm install babel-loader @babel/core @babel/preset-env -D

```js
module.exports = {
  //...
  devtool: 'inline-source-map',
  //...
}
```

app.js

```js
class A{
  constructor(){
    this.str='hello webpack'
  }
  sayHello(){
    console.log(this.str)
  }
}

const a=new A()
a.sayHello()
```

注意的是，生产环境我们一般不会开启sourcemap功能，主要有两点原因:

1. 通过bundle和sourcemap文件，可以反编译出源码————也就是说，线上产物有soucemap文件的话，就意味着有暴漏源码的风险。
2. 我们可以观察到，sourcemap文件的体积相对比较巨大,这跟我们生产环境的追求不同(生产环境追求更小更轻量的bundle)。

## devServer

```js
const path = require('path')
//...
module.exports = {
  //...
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
  //...
}
```

#### 验证服务代理：proxy

node服务server.js：

```js
const http = require('http')

const app = http.createServer((req, res) => {
  if (req.url === '/api/hello') {
    res.end('hello node')
  }
})

app.listen(9000, 'localhost', () => {
  console.log('localhost:9000')
})
```

app本地请求：app.js

```js
fetch('/api/hello').then(repsonse => repsonse.text()).then(result => {
  console.log(result)
})
```

## 模块热替换和热加载

- 模块热替换

#### 模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面

```js
  //...
  module.exports = {
  //...
  devServer: {
    hot: true, //开启热替换
    liveReload: true //开启热加载
  },
  //...
  }
```

## eslint

安装eslint

```bash
npm i eslint -D
```

.eslintrc.json

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "rules": {
        "no-console":0,
        "linebreak-style":0
    },
    "globals":{
        
    }
}

```

监察src 下面代码

```bash
npx eslint ./src
```

#### vscode中安装Eslint插件

### 在webpack中配置eslint

- webpack4.x中用eslint-loader

```bash
npm i babel-loader eslint-loader @babel/core -D
```

webpack.config.js

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  //...
}
```

- webpack5.x中用eslint-webpack-plugin

```bash
npm i eslint-webpack-plugin -D
```

webpack.config.js

```js
//...
const { resolve } = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  //...
  plugins: [
   //...
    new EslintWebpackPlugin({
      context: resolve(__dirname, 'src'),
      fix: true,
    }),
  ],
};
```

手动修改隐层eslint页面覆盖层

```js
module.exports = {
  //..
  devServer: {
    client: {
      overlay: false,
    },
  },
  //..
}
```

## Githooks-Husky

- git Hooks

```bash
git --version
git version 2.32.0.windows.1
git init
ls




Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2023/9/20     14:43                src
-a----        2023/9/20     15:34            312 .eslintrc.json
-a----        2023/9/20     15:51             14 .gitignore
-a----        2023/9/20     15:36         235865 package-lock.json
-a----        2023/9/20     15:36            590 package.json
-a----        2023/9/20     15:47            814 webpack.config.js
git status 
On branch master

No commits yet

Untracked files:
        .gitignore
        package-lock.json
        package.json
        src/
        webpack.config.js

nothing added to commit but untracked files present (use "git add" to track)
git add.
git: 'add.' is not a git command. See 'git --help'.

The most similar command is
        add
 git -m 'init'
unknown option: -m
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]
 cd .git
 ls


    目录: E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2023/9/20     15:51                hooks
d-----        2023/9/20     15:51                info
d-----        2023/9/20     15:51                objects
d-----        2023/9/20     15:51                refs
-a----        2023/9/20     15:51            130 config
-a----        2023/9/20     15:51             73 description
-a----        2023/9/20     15:51             23 HEAD

cd hooks
 ls


    目录: E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git\hooks


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        2023/9/20     15:51            478 applypatch-msg.sample
-a----        2023/9/20     15:51            896 commit-msg.sample
-a----        2023/9/20     15:51           4655 fsmonitor-watchman.sample
-a----        2023/9/20     15:51            189 post-update.sample
-a----        2023/9/20     15:51            424 pre-applypatch.sample
-a----        2023/9/20     15:51           1643 pre-commit.sample
-a----        2023/9/20     15:51            416 pre-merge-commit.sample
-a----        2023/9/20     15:51           1374 pre-push.sample
-a----        2023/9/20     15:51           4898 pre-rebase.sample
-a----        2023/9/20     15:51            544 pre-receive.sample
-a----        2023/9/20     15:51           1492 prepare-commit-msg.sample
-a----        2023/9/20     15:51           2783 push-to-checkout.sample
-a----        2023/9/20     15:51           3650 update.sample

 cat pre-commit.sample
#!/bin/sh
#
# An example hook script to verify what is about to be committed.  
# Called by "git commit" with no arguments.  The hook should       
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
        against=HEAD
else
        # Initial commit: diff against an empty tree object        
        against=$(git hash-object -t tree /dev/null)
fi

# If you want to allow non-ASCII filenames set this variable to true.
allownonascii=$(git config --type=bool hooks.allownonascii)

# Redirect output to stderr.
exec 1>&2

# Cross platform projects tend to avoid non-ASCII filenames; prevent
# them from being added to the repository. We exploit the fact that the
# printable range starts at the space character and ends with tilde.
if [ "$allownonascii" != "true" ] &&
        # Note that the use of brackets around a tr range is ok here, (it's
        # even required, for portability to Solaris 10's /usr/bin/tr), since
        # the square bracket bytes happen to fall in the designated range.
        test $(git diff --cached --name-only --diff-filter=A -z $against |
          LC_ALL=C tr -d '[ -~]\0' | wc -c) != 0
then
        cat <<\EOF
Error: Attempt to add a non-ASCII file name.

This can cause problems if you want to work with people on other platforms.

To be portable it is advisable to rename the file.

If you know what you are doing you can disable this check using:

  git config hooks.allownonascii true
EOF
        exit 1
fi

# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --

# Windows 系统中，类似 touch 的功能，你可以使用以下 PowerShell 命令: New-Item -ItemType File -Force pre-commit
touch pre-commit

```

```bash
PS E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git\hooks> cd..
PS E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git> cd..
PS E:\newcode\git\webpack-II\01-dev-config\04-eslint> cd .git
PS E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git> ls


    目录: E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2023/9/20     16:05                hooks
d-----        2023/9/20     15:51                info
d-----        2023/9/20     15:51                objects
d-----        2023/9/20     15:51                refs
-a----        2023/9/20     16:24            155 config
-a----        2023/9/20     15:51             73 description
-a----        2023/9/20     15:51             23 HEAD

PS E:\newcode\git\webpack-II\01-dev-config\04-eslint\.git> cat config
[core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        symlinks = false
        ignorecase = true
        hooksPath = .mygithooks
```

- husky

```bash
npm i husky

npx husky install
```

# 模块与依赖

### webpack模块

- webpack引用的模块

```js
es的import
import a from './a'
// commonjs的require
const a=require('/a')
// AMDd的define...require
define([],function(){return()=>{}})
require(['./a.js','./b.js'],function(a,b){})
// css中sass、less的@import语句
@import '/a.less'
// 样式url引用的资源
.block-bg{
  backgroud-image:url('./a.png') !import;
}
```

- loader 非语言的模块

#### webpack模块解析原理

- compiler对象
每一次webpack打包，就是创建一个compiler对象，走完整个生命周期的过程。

## 模块解析(resolve)

#### webpack通过Resolvers实现了模块之间的依赖和引用;所引用的模块可以是来自应用程序的代码，也可以是第三方库

#### resolver 帮助webpack 从每个 require/import 语句中，找到需要引入到 bundle 中的模块代码。当打包模块时，webpack 使用 enhanced-resolve 来解析文件路径。(webpack_resolver的代码实现很有思想，webpack基于此进行treeshaking)

### webpack中的模块路径解析规则:通过内置的enhanced-resolve，webpack 能解析三种文件路径

- 绝对路径

```js
import Header from '/src/components/header.js'
```

- 相对路径

```js
import Header from './components/header'; 
```

- 模块路径
npm i lodash -D

```js
import _ from "lodash"; //模块路径
```

### resolve

- resolve.alias
webpack.config.js

```js
const path = require('path')
module.exports = {
  //...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
```

```js
const math = require("@/math.js")
```

- extentions
webpack.config.js

```js
const path = require('path')
module.exports = {
  //...
  resolve: {
    //...
    extensions: ['.json', '.js', '.vue']
  }
}
```

```js
const math = require('./math')
console.log(math)
```

## 外部扩展(externals)

index.html

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js"></script>
```

index.js

```js
import $ from 'jquery';
console.log($);
```

webpack.config.js

```js
module.exports = {
  //...
  plugins: [
    new HtmWebpackPlugin({
      template: './index.html'
    })
  ],
  externals: {
    jquery: '$'
    }
}
```

## 依赖图(dependency graph)

安装webpack-bundle-analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

webpack.config.js

```js
//...
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
module.exports = {
 //...
  entry: {
    app: './src/app.js',
    app2: './src/app2.js'
  },
  //...
  plugins: [
    //...
    new BundleAnalyzerPlugin()
  ],
 //...
}
```

npx webpack  自动打开页面开<http://127.0.0.1:8888，我们成功可视化了打包产物依赖图>

# 扩展功能

## PostCSS 与 CSS模块

- PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。比如可以使用Autoprefixer 插件自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮我们自动的 为 CSS 规则添加前缀，将最新的 CSS 语法转换成大多数浏览器都能理解的语法。

```bash
npm i postcss-loader -D 将css编译成兼容低版本的css
npm i autoprefixer -D 加载样式前缀
npm i postcss-nested -D 样式嵌套
```

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/app.js',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
    ]
  }
}
```

postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

package.json

```json
{
  //...
  "browsersList": [
    ">1%",  //> 1% or >= 1% : 全球浏览器使用率大于1%或大于等于1%。
    "last 2 version" //last 2 versions : 每个浏览器中最新的两个版本。
  ]
}
```

app.js

```js
import style from './app.css';
console.log(style)
const div = document.createElement('div')
div.textContent = 'hello postcss'
div.classList.add(style.box)
document.body.appendChild(div)

```

app.css

```css
body{
  background-color:antiquewhite;
  display: flex;
  .box {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
  }
}
```

- CSS 模块 能让你永远不用担心命名太大众化而造成冲突，只要用最有意义的名字就行了

## Web Works

#### webWorkers提供了js的后台处理线程的API，它允许将复杂耗时的单纯js逻辑处理放在浏览器后台线程中进行处理，让js线程不阻塞UI线程的渲染

work.js

```js
self.onmessage = (message) => {
  console.log(message.data.question)
  self.postMessage({
    answer: 1111
  })
}
```

app.js

```js
const worker = new Worker(new URL('./work.js', import.meta.url))
worker.postMessage({
  question: 'hi 那边的worker线程 请告诉我今天的幸运数字是多少？'
})

worker.onmessage = (message) => {
  console.log(message.data.answer)
}
```

## Typescript

```bash
npm i typescript ts-loader -D
npx tsc --init #生成tsconfig.json;在其中修改 "rootDir": "./src",   "outDir": "./dist",    
npm i lodash -S #ts中无法使用需要在https://www.typescriptlang.org/安装相应的 如下
npm install --save-dev @types/lodash #
```

webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  mode:'development',
  entry:'./src/app.ts',
  devtool:'inline-source-map',
  module:{
    rules:[
      {
        test:/\.ts$/,
        use:'ts-loader',
        exclude:/node_modules/
      }
    ]
  },
  resolve:{
    extensions:['.ts','.js']
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'./dist')
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}
```

app.ts

```ts
import _ from 'lodash'
const age:number=18
console.log(age)
console.log(_.join(['hello','typescript lodash'],' '))
```

# 多页面应用

#### entry 配置

webpack.config.js entry单个入口（简写）语法

```js
module.exports = {
  //...
  entry: ['./src/app.js', './src/app2.js', 'lodash']
}
```

webpack.config.js entry对象语法entry: { <entryChunkName> string | [string] } | {}

```js
module.exports = {
  //...
  entry: {
    main: ['./src/app.js', './src/app2.js'],
  }
}
```

webpack.config.js

```js
module.exports = {
  //...
   main: {
      import: ['./src/app.js', './src/app2.js'],
      dependOn: 'lodash',
      filename: 'chanel1/[name].js'
    },
    main2: {
      import: './src/app3.js',
      dependOn: 'lodash',
      filename: 'chanel2/[name].js'
    },
    lodash: {
      import: 'lodash',
      filename: 'common/[name].js'
    }
}
```

#### 配置 index.html 模板

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: '多页面应用',
      template: './index.html',
      inject: 'body',
      filename: 'chanel1/index.html',
      chunks: ['main', 'lodash'],
      publicPath: 'http://www.b.com/'
    }),
    new HtmlWebpackPlugin({
      template: './index2.html',
      inject: 'body',
      filename: 'chanel2/index2.html',
      chunks: ['main2', 'lodash'],
      publicPath: 'http://www.a.com/'
    })
  ],
}
```

# Tree Shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',// development
  entry: './src/app.js',
  // devtool:'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  optimization:{
    usedExports:true
  }
}
```

## sideEffects

代码无副作用,在package.json中配置sideEffects：

```json
  {
    "sideEffects":true //如果不指定其他值的话。这意味着所有的文件都有副作用，也就是没有一个文件可以 tree-shaking。
    "sideEffects":false //告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking
    "sideEffects":["*.css","*.global.js"],//告诉 webpack，除了数组中包含的文件外，你的任何文件都没有副作用
  }
```

# 渐进式网络应用程序PWA

渐进式网络应用程序(progressive web application - PWA)，是一种可以提供类似于native app(原生应用程序) 体验的 web app(网络应用程序)

npm i http-server -D

```js
module.exports={
   //...
    devServer:{
        devMiddleware:{
            writeToDisk:true
        }
    }
}
```

### 添加workbox

npm i workbox-webpack-plugin -D

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin=require('workbox-webpack-plugin')
module.exports={
    mode:'development',
    entry:'./src/index.js',
    plugins:[
        new HtmlWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ],
    devServer:{
        devMiddleware:{
            writeToDisk:true
        }
    }
}
```

package.json

```json
{
  //...
   "scripts": {
    "start": "http-server dist"
  },
  //..
}
```

npm start 运行在chrome中打开 <http://127.0.0.1:8081> ctrl+c关闭npm 也可以正常运行;即将代码缓存在浏览器中。

关闭serviceworker;取消缓存
chrome://serviceworker-internals/

# Shimming 预支依赖

## Shimming 预置全局变量

./src.index.js

```js
console.log(_.join(['hello','webpack!'],' '))
```

webpack.config.js

```js
module.exports={
mode:'development',
entry:'./src/index.js',
plugins:[
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
        _:'lodash'
    })
]
}
```

## 细粒度 Shimming

npm i imports-loader -D

./src.index.js

```js
this.alert('hello webpack ')
```

webpack.config.js

```js
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
  //...
  module:{
      rules:[
          {
              test:require.resolve('./src/index.js'),
              use:'imports-loader?wrapper=window'
          }
      ]
  }
}
```

## 全局 Exports

npm i exports-loader -D

./src.index.js

```js
const {file,parse}=require('./globals.js')
console.log(file)
parse()
```

webpack.config.js

```js
const webpack=require('webpack')
module.exports={
//...
module:{
    rules:[
        //...
        {
            test:require.resolve('./src/globals.js'),
            use:'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
        }
    ]
}
}
```

## 发布npm-package

npm config get registry 确保npm在(<https://registry.npmjs.org/)下>

npm adduser 登录

npm publish 上传包 在npmjs.com中可以查看

# 模块联邦(Module Federation)

- NPM方式共享模块
- UMD方式共享模块
- 微前端方式共享模块
- 模块联邦方式共享模块

## 模块联邦方式共享模块

```js
const HtmlWebpackPlugin=require('html-webpack-plugin')
const {ModuleFederationPlugin}=require('webpack').container
module.exports={
    mode:'production',
    entry:'./src/index.js',
    plugins:[
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            // 模块联邦名字
            name: 'search',
            // 外部访问的资源名字
            filename: 'remoteEntry.js',
            // 引用的外部资源列表
            remotes: {
                nav:"nav@http://localhost:3003/remoteEntry.js",
                home:"home@http://localhost:3001/remoteEntry.js"
            },
            // 暴露给外部资源列表
            exposes: {
            },
            // 共享模块，如lodash
            shared: {},
        })
    ]
}
```

# 提升构建性能

### 三个环境提升构建性能：

## 1、通用环境

- 更新到最近版本:webpack | nodejs
- 将loader应用于最少数量的必要模块
- 引导(bootstrap)；每个额外的loader/plugin都有其启动时间。尽量少的使用工具。
- 解析
- 小即是快(smaller = faster)减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。
- 持久化缓存在 webpack 配置中使用 cache 选项。使用 package.json 中的 "postinstall"清除缓存目录。
- 自定义 plugin/loader
- dll 使用 DllPlugin 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度
- Progress plugin
- work pool

### DLL

webpack.config.js

```js
const HtmlWebpackPlugin=require('html-webpack-plugin')
const path=require('path')
const webpack=require('webpack')
const AddAssetHtmlPlugin=require('add-asset-html-webpack-plugin')
module.exports={
    mode:'production',
    entry:'./src/index.js',
    plugins:[
        new HtmlWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'./dll/manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath:path.relative(__dirname,'./dll/jquery.js'),
            publicPath:'./'
        })
    ]
}
```

webpack.dll.config.js

```js
const path=require('path')
const webpack=require('webpack')
module.exports={
    mode:'production',
    entry:{
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dll'),
        library:'[name]_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path:path.resolve(__dirname,'dll/manifest.json')
        })
    ]
}
```

package.json

```json
 "scripts": {
    "dll": "webpack --config ./webpack.dll.config.js"
  },
```

运行 webpack dll 即将jQuery打包到dll下

安装add-asset-html-webpack-plugin将jQuery自动添加到页面上

npm i add-asset-html-webpack-plugin -D

### work pool

npm i babel-loader @babel/core @babel/preset-env -D

npm i thread-loader -D

## 2、开发环境

## 3、生产环境
