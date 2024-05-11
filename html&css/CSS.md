# css

层叠样式表 (cascading style sheets)

## 01 css 的编写位置

### 行内样式

写在标签的 style 属性中 又称内联样式

```html
<h1 style="color: cornflowerblue;font-size: 60px;">位置1_行内样式</h1>
```

### 内部样式

```html
<style>
  h1 {
    color: cornflowerblue;
    font-size: 60px;
  }
  h2 {
    color: bisque;
    font-size: 40px;
  }
  img {
    width: 100px;
  }
</style>
```

### 外部样式

a.css

```css
h1 {
  color: cornflowerblue;
  font-size: 60px;
}
h2 {
  color: bisque;
  font-size: 40px;
}
img {
  width: 100px;
}
p {
  color: coral;
}
```

页面引入

```html
<link rel="stylesheet" href="./a.css" />
```

## 02 样式表的优先级

```html
<!-- <link rel="stylesheet" href="./index.css"> link 在内部样式之前，会被后面的覆盖 -->
<style>
  h1 {
    color: rebeccapurple;
    font-size: 20px;
  }
</style>
<link rel="stylesheet" href="./index.css" />

<h1 style="color: red;">Wellcom shanghai</h1>
```

行内样式 > 内部样式 = 外部样式

- 内部样式和外部样式同级别，且 后面的会覆盖前面的；后来者居上
- 同一个样式中，优先级也和编写顺序有关，且后面的会覆盖前面的；后来者居上

## 03 语法规则

## 04 代码风格

## 05 css 基本选择器

- 统配选择器
- 元素选择器
- 类选择器
- id 选择器

## 06 复合选择器

- 交集选择器
- 并集选择器
- 后代选择器
- 子代选择器
- 兄弟选择器
- 属性选择器

#### 伪类

伪类 --很像类，但不是类(class)，是元素特殊状态的一种表现

```css
/* a标签的伪类 :link :visited */
/* 选中的是没有访问过的a元素 */
a:link {
  color: skyblue;
}

/* 选中的是访问过的a元素 */
a:visited {
  color: gray;
}
```

- 动态伪类
- 结构伪类
- 否定伪类
- UI 伪类
- 目标伪类
- 语言伪类
- 伪类选择器

#### HTML 元素间的关系

- 父元素：直接包裹某元素的元素
- 子元素：被父元素直接包裹的元素
- 祖先元素：父亲的父亲……一直往外找，都是祖先
- 后代元素：儿子的儿子……一直往里找，都是后代
- 兄弟元素：具有相同父元素的元素互为父元素

## 07 选择器优先级

行内样式 > id 选择器(1,0,0) > 类选择器(0,1,0) > 元素选择器(0,1,0) > 通配选择器(0,0,0)

```html
<style>
    h2{
        color: aqua;
    }
    *{
        color: azure;
    }
    .sloga{
        color: red;
    }
    #haha{
        color: black;
    }
    h2{
        color: gray;
    }
</style>
</head>
<body>
    <h2 id="haha" class="sloga" style="color: blue;">hello word</h2>
</body>
```

## 08 css 三大特性

1、层叠性

- 概念:如果发生了样式冲突，那就会根据一定的规则(选择器优先级)，进行样式的层叠(覆盖)
- 样式冲突：元素的同一样式，被设置了不同的值

2、继承性

- 概念：元素会自动拥有其父元素、或其祖先元素上所设置的某些样式
- 规则：优先继承离得近的
- 常见的可继承属性
  text-?? font-?? line-?? color-??

3、优先级

- 简单聊：!important > 行内样式 > id 选择器 > 类选择器 > 元素选择器 > 通配选择器(\*) > 继承的样式
- 详细聊：需要计算权重
  计算权重时需要注意:并集选择器的每一个部分是分开算的

```

```

## 09 像素与颜色

### 像素

### 颜色

- RGB
- RGBA(红(0~255),绿(0~255),蓝(0~255),透明度(0 到 1)) color: rgb(138,43,226,0.5);
- HEX #
- HEXA # HEX 的原理与 rgb 一样，依然是通过红绿蓝进行组合，只不过要通过 6 个数字，分成 3 组来表达。格式为#rrggbb 每一位的取值范围[0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f],最小为 00，最大为 ff HEXA 不支持 IE;示例 color: #ff0000;
- hsl color: hsl(色相, 饱和度, 亮度);示例：color: hsl(0deg, 100%, 50%);
- hsla color:hsla(色相, 饱和度, 亮度,透明度) 示例：background-color:hsla(180deg, 100%, 80%,0.68)

```css
.hello1 {
  /* 颜色名 */
  color: darkred;
}
.hello2 {
  /* 
    RGB
    RGBA(红(0~255),绿(0~255),蓝(0~255),透明度(0到1)) 
    */
  color: rgb(138, 43, 226, 0.5);
}
.hello3 {
  /* 
    HEX #
    HEXA #
    HEX的原理与rgb一样，依然是通过红绿蓝进行组合，只不过要通过6个数字，分成3组来表达。格式为#rrggbb
    每一位的取值范围[0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f],最小为00，最大为ff
    HEXA 不支持
    */
  color: #ff0000;
  background-color: #00f2;
}
.hello4 {
  /* 
    hsl
    color: hsl(色相, 饱和度, 亮度);
    color:hsla(色相, 饱和度, 亮度,透明度)
        */
  color: hsl(0deg, 100%, 50%);
  background-color: hsla(180deg, 100%, 80%, 0.68);
}
```

## 10 常用字体属性

##
