# HTML 
    HyperText Markup Language 超文本标记语言

### 标签
    起始标签<a></a> 单标签<input/>

### 标签属性
    <标签名 属性名="属性值" 属性名="属性值" />
    特殊的属性 没有属性名，只有属性值:<input disabled />

### html基础结构
运行过程
```
源代码 -> 浏览器 -HTML格式检测-> 格式合法？-合法->直接渲染
                                  |
                                  | -不合法-> 处理后,直接渲染
```
html结构
```html
<html>
    <head>
        <title>我是title</title>
    </head>
    <body>
        <marquee>可以滚动</marquee>
    </body>
</html>
```

### 注释
```html
<!-- 这个是注释 -->
<!-- 
    多
    行
    注
    释 
-->
```

### 文档声明
必须在网页第一行，且在html标签之外
```html
<!DOCTYPE html>
```

### 字符编码
* ASCII
* ISO 8859-1
* GB2312
* GBK
* UTF-8 万国码

```html
<meta charset="UTF-8">
```

### 设置语言
```html
<html lang="zh"> 中文
<html lang="zh-CN"> 简体中文
<html lang="zh-TW"> 繁体中午
<html lang="en-US"> 英语-美国
<html lang="en-GB"> 英语-英国
```
### 排版标签
- h1到h6 标题
- p  段落
- div 没有任何含义
```html
<!-- 
    <h1>一个网页只写一个 
    h1到h6不能嵌套
-->
<!-- 标题标签 -->
    <h1>Beetles</h1>
    <h2>External morphology</h2>
    <h3>Head</h3>
    <h4>Mouthparts</h4>
    <h3>Thorax</h3>
    <h4>Prothorax</h4>
    <h4>Pterothorax</h4>
    <!-- 段落标签 -->
    <p>是一个段落</p>
    <div>
        <p>段落1</p>
        <p>段落1</p>
        <p>段落1</p>
    </div>
<!-- div没有任何含义 用来整体布局 -->
<!-- p标签中不能再有h1到h6和p标签以及div -->
```

### 语义化标签
用特定的标签，去表达特定的含义
标签默认的效果不重要，语义最重要
- 代码的可读性强
- 有利于SEO(搜索引擎优化) 爬虫 ￥====
- 方便设备解析(如屏幕阅读器，盲人阅读器)

### 块级元素与行内元素
```html
<!-- 块级元素 特点：独占一行-->
    <marquee>块级元素</marquee>
    <h1>块级元素</h1>
    <p>块级元素</p>
    <div>块级元素</div>
    <div>块级元素</div>
    <!-- 行内元素 特点：不独占一行-->
    <input type="text" />
    <input type="password" />
    <span>行内元素span</span>

    <!-- 规则1：块级元素中能写：行内元素、块级元素(几乎都能写……)-->
    <div>
        <span>span111</span>
        <input type="text">
        <div>div222</div>
    </div>

    <!-- 规则2：行内元素中能写：行内元素，但不能写块级元素 -->
    <span>
        <span>span111</span>
        <input type="text">
        <span>span</span>
        <!-- <div>div 11</div> -->
    </span>

    <!-- 特殊规则：h1到h6不能嵌套 -->

    <!-- 特殊规则：p标签中不写块元素 -->
    <p>
        <!-- <ul></ul> -->
        <!-- <marquee>aaa</marquee>不推荐使用 -->
    </p>
```

### 常用文本标签
- 用于包裹、词汇、短语等
- 通常写在排版标签中；排版标签更加宏观(大段文字)，文本标签更加微观（词汇、短语）
- 文本标签通常都是行内元素

```html
    <p>
        <!-- em 着重阅读的内容 -->
        请安装，<em>国家反诈APP</em>
    </p>
    <p>
        <!-- strong 十分重要的内容 语义比em要强-->
        <strong>出门关好门窗</strong>
    </p>
    <p>
        <!-- span 没有语义，用于包裹短语的通用容器;div是大包装袋，span是小包装袋-->
        span 没有语义，用于包裹短语的<span>通用容器</span>
    </p>
```

### 不常用文本标签
```html
     <body>
        <p>
            这是<cite>《挪威的森林》</cite>
        </p>
        <p>
            <dfn>耗子尾汁</dfn>等同于好自为之
        </p>
        <p>
            原价<del>199</del>，现价<ins>99</ins>
        </p>
        <p>
            H<sub>2</sub>0 8<sup>3</sup>
        </p>
        <p>
            代码<code>alert('hello')</code>
        </p>
        <p>
            支付宝到账<samp>100</samp>万元
        </p>
        <p>
            快捷键：<kbd>ctr + s</kbd>
        </p>
        <p>
            游戏还不错<abbr title="英雄联盟">LOL</abbr>
        </p>
        <p>
            <bdo dir="rtl">你是年少的欢喜</bdo>
        </p>
        <p>
            js定义变量<code>let <var>a</var>=1</code>
        </p>
        <p>
            <small>版权文本</small>
        </p>
        <p>
            我买了<b>罗技鼠标</b>
        </p>
        <p>
            <i>燕子 没有你怎么活</i>
        </p>
        <p>
            <u>错误的示例</u>
        </p>
        <p>
            <q>路漫漫其修远兮</q>
        </p>
        <p>
            <blockquote>长引用O(∩_∩)O哈哈~O(∩_∩)O哈哈~O(∩_∩)O哈哈~哈哈</blockquote>
        </p>
        <p>
            <address>成山路608弄100支弄</address>
        </p>
        <!-- blockquote和address是块元素 会换行,其他都是行内元素 -->
    </body>
```

### 图片标签
```html
    <!-- img 行内元素 -->
    <img width="100" height="100" src="./奥特曼.jpg" alt="奥特曼，你相信光吗？">
```


### 相随路径 绝对路径
```html
     <!-- 相对路径：以当前位置作为参考点，去建立路径-->
    <img src="./怪兽.jpg" alt="怪兽">
    <img src="./a/喜羊羊.jpg" alt="喜羊羊">
    <img src="./a/b/灰太狼.jpg" alt="灰太狼">
    <img src="../奥特曼.jpg" alt="奥特曼">

    <!-- 绝对路径，分为两类：本绝对路径、网络绝对路径 -->
    <!-- 本绝对路径 -->
    <!-- <img src="E:/demo1/demo2/小姐姐.jpg" alt=""> -->

    <!-- 网络绝对路径：是以根位置作为参考点，去建立路径 -->
    <img width="400"
        src="https://rs-channel.huanqiucdn.cn/imageDir/d1eee333dd7b68d0f3eb38e5fd5c792b.png"
        alt>
    <!-- 测试防盗链 -->
    <img
        src="https://mmbiz.qpic.cn/mmbiz_png/ScqRBmrn0w3ibEHbTxorxS12e71ythvjKIIIl5EWcy0cYeqnKIRwHAUmcvcPTpaK89qc6voq8TFW0O3rIQ3KlicQ/640.jpg"
        alt>
```


### 图片格式
- jpg 
- png
- bmp
- gif
- webp 未来趋势 ie不兼容
- base64

### 超链接
target:新页签打开 _blank 原有页签打开_self
```html
<a href="https://miaosha.jd.com" target="_blank">去秒杀</a>
```
虽然a标签是行内元素，但a标签可以包裹除它自身以外的任何标签

#### 跳转文件
```html
<!-- 浏览器可以直接打开的文件  -->
    <a href="./resource/我的自拍.jpg">老吴</a>
    <a href="./resource/小电影.mp4">电影</a>
    <a href="./resource/小姐姐.gif">gif</a>
    <a href="./resource/如何一夜暴富.pdf">pdf</a>

    <!-- 浏览器不可以直接打开的文件  -->
    <a href="./resource/内部资源.zip">zip</a>

    <!-- 强制下载 -->
    <a href="./resource/小电影.mp4" download="好看的电影 " >下载电影</a>
```

#### 跳转锚点
```html
 <a href="#htl">看灰太狼</a>
    <a href="#atm">看奥特曼</a>

    <p>我是一只羊，一只很肥美的羊</p>
    <img src="./path_test/a/喜羊羊.jpg" alt="喜羊羊">

    <a name="htl"></a>
    <p>我是一只狼，一只很邪恶的狼</p>
    <img src="./path_test/a/b/灰太狼.jpg" alt="灰太狼">

    <p id="atm">我是一只奥特曼，一只很能打的奥特曼</p>
    <img src="./奥特曼.jpg" alt="奥特曼">

    <p>我是一只怪兽，一只很丑的怪兽</p>
    <img src="./path_test/怪兽.jpg" alt="怪兽">

    <p>整体的介绍完毕了</p>
    <a href="#">回到顶部</a>
    <a href="">刷新页面</a>
    <a href="javascript:;">点我弹窗</a>
```
#### 唤起指定应用
```html
     <a href="tel:10010">打电话</a>
    <a href="mailto:lucaryang.gamil.com">邮件</a>
    <a href="sms:10086">发短信</a>
```
“超文本”（hypertext）是指连接单个网站内或多个网站间的网页的链接。

### 列表

```html
<!-- 有序列表 Ordered list ol -->
    <h2>要把大象装冰箱 拢共分几步</h2>
    <ol>
        <li>打开冰箱门</li>
        <li>把大象放进去</li>
        <li>把冰箱门关上 </li>
    </ol>

    <!-- 无需列表 Unordered list ul-->
    <h2>我想出去玩</h2>
    <ul>
        <li>大理</li>
        <li>三亚</li>
        <li>泉州</li>
        <li>潮汕</li>
    </ul>
    <!-- 自定义列表 definition list dl-->
    <h2>如何更好地学习</h2>
    <dl>
        <dt>做好笔记</dt>
        <dd>好记性不如烂笔头</dd>
        <dt>多练习</dt>
        <dd>多练习111</dd>
        <dt>敲代码</dt>
        <dd>敲代码111 </dd>
    </dl>
```
### 表格
```html
 <table border="1 ">
    <!-- 表格标题 -->
    <caption>标题信息</caption>
    <!-- 表格头部 -->
    <thead>
        <!-- 行 -->
        <tr>
            <!-- 单元格 -->
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>民族</th>
            <th>还有啥</th>
        </tr>
    </thead>
    <!-- 表格主题 -->
    <tbody>
        <tr>
            <td>张三</td>
            <td>男</td>
            <td>18</td>
            <td>汉族</td>
            <td>哈哈哈</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>男</td>
            <td>28</td>
            <td>汉族</td>
            <td>想学学</td>
        </tr>
        <tr>
            <td>王五</td>
            <td>男</td>
            <td>38</td>
            <td>汉族</td>
            <td>哈哈哈</td>
        </tr>
        <tr>
            <td>赵六</td>
            <td>男</td>
            <td>48</td>
            <td>汉族</td>
            <td>哈1哈哈</td>
        </tr>
    </tbody>
    <!-- 表格脚注 -->
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>合计4人</td>
        </tr>
    </tfoot>
</table>
```

### 表单
form 表单的常用属性
- action 请求地址
- target 表单提交后_self 在本窗口打开,_blank在新窗口打开
- method 表单请求方式  get/post
```html
<form action="https://www.baidu.com/s">
    <input name="wd" type="text">
    <button>百度搜索</button>
</form>
```

##### 表单常用控件
```html
 <form action="https://search.jd.com/search">
    <!-- 文本输入 -->
    账户：<input name="account" type="text" value="张三" maxlength="10">
    <br>
    <!-- 密码输入 -->
    密码：<input name="pwd" type="password" value="zhangsan" maxlength="8">
    <br>
    <!-- 单选框 -->
    性别：
    <input type="radio" name="gender" value="male" checked>男
    <input type="radio" name="gender" value="female">女
    <br>
    <!-- 复选框 -->
    爱好：
    <input type="checkbox" name="hobby" value="smoke">抽烟
    <input type="checkbox" name="hobby" value="drink">喝酒
    <input type="checkbox" name="hobby" value="perm" checked>烫头
    <br>
    <!-- 文本域 -->
    其他：
    <textarea name="other" id cols="22" rows="5"></textarea>
    <br>
    <!-- 下拉框 -->
    籍贯：
    <select name="place">
        <option value='shandong' selected>山东</option>
        <option value='hebei'>河北</option>
        <option value='henan'>河南</option>
        <option value='shanghai'>上海</option>
    </select>
    <br>

    <!-- 隐藏域 -->
    <input type="hidden" name='tag' value="123">
    <!-- 确认按钮 第一种写法-->
    <button>确认</button>
    <!-- 确认按钮 第二种写法-->
    <!-- <input type="submit" value="确认"> -->
    <!-- 重置按钮 第二种写法-->
    <button type="reset">重置</button>
    <!-- 重置按钮 第一种写法-->
    <!-- <input type="reset" value="重置"> -->

    <!-- 普通按钮 第一种写法-->
    <button type="button">检测账户是否被注册</button>
    <!-- 普通按钮 第二种写法-->
    <!-- <input type="button" value="检测账户是否被注册"> -->
</form>
```
### 框架标签 iframe
```html
<!-- 利用iframe 嵌入网页-->
<iframe src="https://www.toutiao.com" width="300" height="200"
    frameborder="0"></iframe>

<!-- 嵌入其他内容 -->
<iframe src="../HTML4/resource/如何一夜暴富.pdf" frameborder="0"></iframe>
<iframe src="./30_表单label标签.html" frameborder="0"></iframe>

<!-- 与超链接的target属性配置使用 -->
<a href="https://www.toutiao.com" target="tt">看新闻</a><br>
<iframe name="tt" frameborder="0"></iframe>

<!-- 与表单的target属性配置使用 -->
<form action="https://so.toutiao.com、search" target="tt">
    <input type="text" name="keyword">
    <input type="submit" value="搜">
</form>
```

### 字符实体
```html
<!-- 在html中用一种特殊形式的内容，来表达某个符号 -->
<!-- &nbsp; -->
<div>我 美女</div>
<div>我 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;美女</div>
<div>我 &#160;&#160;&#160;&#160;&#160;美女</div>

<!-- &lt;和&gt; -->
<div>&lt;h1&gt;是一个标签</div>

<!-- &amp; -->
<div>表示空格的字符实体 &amp;nbsp;</div>
<div>表示&的字符实体 &amp;amp;</div>

<!-- &yen; -->
<div>当前价格为 &yen;199</div>

<!-- 版权所有 -->
<div>版权所有&copy;</div>

<!-- 乘号 -->
<div>2&times;2=4</div>

<!-- 除号 -->
<div>2&divide;2=1</div>
```

### meta标签
```html
<!-- 配置字符编码 -->
<meta charset="UTF-8">
<!-- 针对IE浏览器的兼容性设置 -->
<meta http-equiv="X-UA-Compatible" content='IE=edge'>
<!-- 针对移动端的配置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 配置网页关键字 -->
<meta name="keywords" content="网上shopping,衣服,电子商务">
<!-- 配置网页描述信息 -->
<meta name="description" content="80字以内">
<!-- 搜索引擎爬虫配置 -->
<meta name="robots" content='noindex'>
<!-- 配置作者 -->
<meta name="author" content="lucar">
<!-- 配置网页生成工具 -->
<meta name="generator" content="vscode">
<!-- 配置定义网页版权信息 -->
<meta name="ccopyright" content="2023-2027©版权">
<!-- 配置网页自动刷新 -->
<meta http-equiv="refresh" content='10;url=https://www.baidu.com'>
```















