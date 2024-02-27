# 接口

接口是前后端通信的桥梁(API Application Program Program Interface)

接口是一个服务中的路由规则，根据请求响应结果

### 接口的组成
- 请求方法
- 接口地址(URL)
- 请求参数
- 响应结果

## RESTful API
RESTful API是一种特殊的风格的接口：
- URL中的路径表示资源，路径中不能有动词，如create、delete、update等这些都不能用
- 操作资源要与HTTP请求方式对应
- 操作结果要与HTTP响应状态码对应

规则示例
|操作|请求类型|URL|返回|
|-|-|-|-|
|新增|POST|/song|返回新生成的信息|
|删除|DELETE|/song/10|返回一个空文档|
|修改|PUT|/song/10|返回更新后的歌曲信息|
|修改|PATCH|/song/10|返回更新后的歌曲信息|
|获取|GET|/song|返回所有列表|
|获取|GET|/song/10|返回单个信息|

### json-server

```
npm i -g json-server
```

在json目录下执行：json-server --watch db.json


接口测试工具：apipost\postman