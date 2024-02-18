# Vue 3 + Vite

## 安装pnpm

``` bash
npm i pnpm -g
```

## 创先vite+vue

``` bash
pnpm create vite
```

## 运行项目

``` bash
cd vite-basics
pnpm install
pnpm run dev
```

## vite 功能介绍

## npm依赖解析和预构建

当你首次启动 vite 时，Vite 在本地加载你的站点之前预构建了项目依赖。

### 依赖预构建 过程的两个目的

CommonJS和UMD的兼容性

性能

#### 自动依赖搜寻

#### 自定义行为

#### esbuild（Vite 是通过esbuild进行打包的）

- 极快的速度而不需要缓存
- ES6和CommonJS的模块支持
- ES6模块的tree shaking
- 一个用于JavaScript和Go的API
- typescript和jsx语法支持
- Source maps支持
- 简化打包
- 插件支持

#### 缓存

- 文件系统缓存：vvite 将预构建的依赖项缓存到 node_modules/.vite 中
- 浏览器缓存：已预构建的依赖请求使用 HTTP 头 max-age=31536000, immutable 进行强缓存，以提高开发期间页面重新加载的性能。

```bash
"dev": "vite --host --force", 
```

## 模块热重载（HMR）

vite内置了HMR到

- vue 单页面组件(SFC)
- React Fast Refresh
- @prefresh/vite

### 模块热重载

### vite天然支持引入.ts文件

vite只执行转义工作不做类型检查

vue-tsc --noEmit
tsc --noEmit

### vite viue2

npm install vite-plugin-vue2 -D
pnpm i vue@2
