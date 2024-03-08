# css
层叠样式表 (cascading style sheets)


### 行内样式
写在标签的style属性中 又称内联样式
```html
<h1 style="color: cornflowerblue;font-size: 60px;">位置1_行内样式</h1>
```

### 内部样式
```html
<style>
    h1{
        color: cornflowerblue;
        font-size: 60px;
    }
    h2{
        color:bisque;
        font-size: 40px;
    }
    img{
        width: 100px;
    }
</style>
```

### 外部样式
a.css
```css
h1{
    color: cornflowerblue;
    font-size: 60px;
}
h2{
    color:bisque;
    font-size: 40px;
}
img{
    width: 100px;
}
p{
    color: coral;
}
```
页面引入
```html
<link rel="stylesheet" href="./a.css">
```

### 样式表的优先级
```html
<!-- <link rel="stylesheet" href="./index.css"> link 在内部样式之前，会被后面的覆盖 -->
<style>
h1{
    color: rebeccapurple;
    font-size: 20px;
}
</style>
<link rel="stylesheet" href="./index.css">

<h1 style="color: red;">Wellcom shanghai</h1>
```

行内样式 > 内部样式 = 外部样式
- 内部样式和外部样式同级别，且 后面的会覆盖前面的；后来者居上
- 同一个样式中，优先级也和编写顺序有关，且后面的会覆盖前面的；后来者居上

### 语法规则

### 代码风格

### css基本选择器
- 统配选择器
- 元素选择器
- 类选择器
- id选择器

## 复合选择器
- 交集选择器
- 并集选择器
- 后代选择器

### HTML元素间的关系
- 父元素：直接包裹某元素的元素
- 子元素：被父元素直接包裹的元素
- 祖先元素：父亲的父亲……一直往外找，都是祖先
- 后代元素：儿子的儿子……一直往里找，都是后代
- 兄弟元素：具有相同父元素的元素互为父元素







### css三大特性
 1、层叠性
- 概念:如果发生了样式冲突，那就会根据一定的规则(选择器优先级)，进行样式的层叠(覆盖)
- 样式冲突：元素的同一样式，被设置了不同的值

2、继承性
- 概念：元素会自动拥有其父元素、或其祖先元素上所设置的某些样式
- 规则：优先继承离得近的
- 常见的可继承属性
    text-??  font-??  line-??  color-??

3、优先级
- 简单聊：!important > 行内样式 > id选择器 > 类选择器 > 元素选择器  > 通配选择器(*) > 继承的样式
- 详细聊：需要计算权重
    计算权重时需要注意:并集选择器的每一个部分是分开算的
