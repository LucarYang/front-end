# npm
npm(Node Package Module Manager)npm是node安装包内置的管理工具。官网：https://www.npmjs.com/

node安装默认安装了npm

## npm 常用命令
- npm -v
- npm config list 查看配置列表
```bash
; "builtin" config from C:\Users\Administrator\AppData\Roaming\npm\node_modules\npm\npmrc

prefix = "C:\\Users\\Administrator\\AppData\\Roaming\\npm"

; "user" config from C:\Users\Administrator\.npmrc

legacy-peer-deps = true
msvs_version = "2015"
registry = "https://registry.npmjs.org/"
strict-ssl = false

; node bin location = C:\Program Files\nodejs\node.exe
; node version = v18.12.1
; npm local prefix = E:\newcode\git\TS
; npm version = 9.8.0
; cwd = E:\newcode\git\TS
; HOME = C:\Users\Administrator
; Run `npm config ls -l` to show all defaults.
```
- npm config get prefix 查看单个配置 获取全局包安装路径
- npm config get cache npm缓存目录
- npm config get registry 显示默认的包注册服务器地址

## 配置使用国内的仓库地址:
安装cnpm
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm config get registry
// 修改包仓库源(原来是https://registry.npmmirror.com/)
cnpm config set registry https://registry.npm.taobao.org
```
## .npmrc文件
#### .npmrc 是一个文件，用于配置 npm 的行为
.npmrc
```
msvs_version=2015
strict-ssl=false
registry=https://registry.npm.org
legacy-peer-deps=true
```
.cnpmrc
```
registry=https://registry.npm.taobao.org
```
### 修改全局安装路径
1、在.npmrc配置文件中新增的内容
```
prefix=E:\programs\Mynpm\npm
cache=E:\programs\Mynpm\npm_cache
```
2、修改环境变量path增加：E:\programs\Mynpm\npm

## npm 常用命令
### 安装包
- npm root  查看局部安装路径：root目录：E:\newcode\git\TS\node_modules
- npm i jquery 当前目录下安装:root目录下安装
- npm i jquery -g 全局安装

### package.json
保存依赖的各种包，从vcs clone 下来的项目之后，直接使用 npm install 即可安装所有依赖，不需要把真正的依赖上传
使用向导创建 npm init
```js
// - 按照package.json中的配置来安装
npm i  
// - 查看当前目录下已安装的第三方包，加 -g 查看全局的 
npm list  
// - 查看jquery的最新可用版本
npm view jquery versions 
// - 保存到开发依赖节点(添加 --save-dev/-D)，默认保存到运行时依赖(即默认加了 --save/-S)
npm install webpack webpack-cli -D
// - 清理npm安装的缓存，实际上清理的是你配置的缓存目录(C:\...\npm_cache)
npm cache clean --force
// - 删除某个包;全局用-g
npm uninstall jquery 
// - 更新某个包
npm update jquery
// - 运行脚本，xxx是你在package.json的scripts标签里面自定义的命令：
"scripts": {
  "dev": "cross-env NODE_ENV=development  rollup -c -w",    
  "build": "cross-env NODE_ENV=produaction  rollup -c"
 }
npm run dev
```

#### package.json中^和~
* ^1.5.0中^表示 取值范围<2.0且>=1.5.0
* ~1.5.1安装最新的小版本;~1.5.x,选最大的版本


# npm的包管理机制
https://juejin.cn/post/6844904022080667661?searchId=20230913094739196196DCEB0BEB47B638#heading-47
## package.json。
创建了一个 Node.js 项目，意味着创建了一个模块，这个模块必须有一个描述文件，即 package.json。

#### 1、必备属性:
* name 包名称
* version 包版本
#### 2、描述信息
* description 用于添加模块的的描述信息，方便别人了解你的模块。
* keywords 用于给你的模块添加关键字
* author 指包的主要作者
* contributors 指贡献者信息，一个 contributors 对应多个贡献者
* homepage 用于指定该模块的主页。
* repository 用于指定模块的代码仓库。
* bugs 指定一个地址或者一个邮箱，对你的模块存在疑问的人可以到这里提出问题。
#### 3、依赖配置
* dependencies 指定了项目运行所依赖的模块，开发环境和生产环境的依赖模块都可以配置到这里
* devDependencies 有一些包有可能你只是在开发环境中用到，例如你用于检测代码规范的 eslint ,用于进行测试的 jest 
* peerDependencies 用于指定你正在开发的模块所依赖的版本以及用户安装的依赖包版本的兼容性。
* bundledDependencies 可有可无的包
* optionalDependencies bundledDependencies 的值是一个数组，数组里可以指定一些模块，这些模块将在这个包发布时被一起打包。
#### 4、协议
```js
{
   "license": "MIT"
}
```
- "MIT"：MIT许可证，全称Massachusetts Institute of Technology许可证，是一种自由软件许可证，允许自由使用、修改和分发软件，但要求在使用和分发时必须保留许可证副本和版权声明。
- "Apache-2.0"：Apache许可证2.0版，是一种自由软件许可证，允许自由使用、修改和分发软件，但要求在使用和分发时必须保留许可证副本和版权声明。与MIT许可证相比，Apache许可证更加详细和复杂，包含一些额外的要求。
- "BSD-3-Clause"：BSD三子句许可证，是一种自由软件许可证，允许自由使用、修改和分发软件，但要求在使用和分发时必须保留许可证副本和版权声明。与MIT和Apache许可证相比，BSD三子句许可证更加简洁明了。
- "GPL-3.0"：GNU通用公共许可证3.0版，是一种自由软件许可证，允许自由使用、修改和分发软件，但要求在使用和分发时必须保留许可证副本和版权声明。GPL许可证具有病毒效应，即如果在一个GPL许可证下发布的程序使用了其他GPL许可证下发布的代码，那么整个程序也必须使用GPL许可证发布。
- "MPL-2.0"：Mozilla公共许可证2.0版，是一种自由软件许可证，允许自由使用、修改和分发软件，但要求在使用和分发时必须保留许可证副本和版权声明。MPL许可证与其他许可证相比，更加注重保护贡献者的权益。
#### 5、目录、文件相关
- main 属性可以指定程序的主入口文件
- files 属性用于描述你 npm publish 后推送到 npm 服务器的文件列表
- man 命令是 Linux 下的帮助指令，通过 man 指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息。
- directories 属性性来指定你的目录结构和上述的规范结构的对应情况
#### 6、脚本配置
- scripts 用于配置一些脚本命令的缩写
- config 字段用于配置脚本中使用的环境变量
#### 7、发布配置
- preferGlobal 警告本地安装
- private 限制发布
- publishConfig  限制发布仓库|限制发布版本
- os 限制用户安装系统
- cpu 限制用户安装CPU架构

## 包版本管理机制
npm view conard version 查看npm包版本
npm ls 可查看当前仓库依赖树上所有包的版本信息。
### SemVer规范
npm包 中的模块版本都需要遵循 SemVer规范;SemVer规范的标准版本号采用 X.Y.Z 的格式，其中 X、Y 和 Z 为非负的整数，且禁止在数字前方补零。X 是主版本号、Y 是次版本号、而 Z 为修订号。每个元素必须以数值来递增。

- 主版本号(major)：当你做了不兼容的API 修改
- 次版本号(minor)：当你做了向下兼容的功能性新增
- 修订号(patch)：当你做了向下兼容的问题修正。

例如：1.9.1 -> 1.10.0 -> 1.11.0
- 内部版本(alpha):
- 公测版本(beta):
- 正式版本的候选版本rc: 即 Release candiate

例如：18.0.0-alpha-e6be2d531

#### 严格按照 SemVer 规范来发版的：
- 版本号严格按照 主版本号.次版本号.修订号 格式命名
- 版本是严格递增的，：16.8.0 -> 16.8.1 -> 16.8.2
- 发布重大版本或版本改动较大时，先发布alpha、beta、rc等先行版本

#### Semver 规范的命令来完成这一操作：

- npm version patch : 升级修订版本号
- npm version minor : 升级次版本号 v1.0.0 ->v1.1.0
- npm install semvernpm version major : 升级主版本号

## 剖析 npm install 原理
- 嵌套结构：早期的嵌套结构在不同层级的依赖中，可能引用了同一个模块，导致大量冗余。在 Windows 系统中，文件路径最大长度为260个字符，嵌套层级过深可能导致不可预知的问题。
- 扁平结构：安装模块时，不管其是直接依赖还是子依赖的依赖，优先将其安装在 node_modules 根目录；npm 3.x

- Lock文件：npm 5.x 
package-lock.json 的作用是锁定依赖结构，即只要你目录下有 package-lock.json 文件，那么你每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的。
- 缓存
在执行 npm install 或 npm update命令下载依赖后，除了将依赖包安装在node_modules 目录下外，还会在本地的缓存目录缓存一份。
















