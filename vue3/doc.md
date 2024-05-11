vue3 最新的 Setup 语法糖
Vite 构建工具
TypeScript
Pinia 状态管理

Linux Nginx
云计算 K8s Docker
NodeJs
NestJs

# vue3

vue 是一套用于构建用户界面的渐进式框架

## vue3 新特性

- 重写双向数据绑定
- VDOM 性能瓶颈
- Fragments
- Tree-Shaking 的支持
- Composition API

## 构建 Vue3 项目

- 通过 Vite ：npm init vite@latest
- 通过 Vue ：npm init vue@latest

## 语法模板

- Options API

```html
<script>
  export default {
    deta() {
      return {
        a: 1,
      };
    },
    methods: {
      fun() {},
    },
  };
</script>
```

- setup 模式

```html
<script>
  export default {
    setup() {
      const a = 1;
      return { a };
    },
  };
</script>
<template>
  <div>{{ a }}</div>
</template>
```

- setup 语法糖模式

```html
<script setup lang="ts">
  const a: number[] = [1, 2, 3, 4, 5];
</script>
<template>
  <div>{{ a.map(v => ({ num: v })) }}</div>
</template>
```

## Vue 核心虚拟 Dom 和 diff 算法

虚拟 DOM 就是通过 JS 来生成一个 AST 节点树。
diff 算法
diff 是什么？diff 就是比较两个树，render 会生成两颗树，一个新树 newVnode,一棵旧树 oleVnode。然后两棵树进行对比更新差异就是 diff ,全称是 difference, 在 vue 里面 diff 算法就是通过 patch 函数来完成的，所有有的时候也叫 patch 算法。

## ref

接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。

```html
<script setup lang="ts">
  import { ref } from "vue";
  import type { Ref } from "vue";
  type M = {
    name: string;
  };
  const Man: Ref<M> = ref({ name: "哈哈哈" });
</script>
<template>
  <div>{{ Man }}</div>
</template>
```

注意被 ref 包装之后需要.value 来进行赋值

- isRef:判断是不是一个 ref 对象

```html
<script setup lang="ts">
  import { ref, isRef, shallowRef } from "vue";
  import type { Ref } from "vue";
  type M = {
    name: string;
  };
  const Man: Ref<M> = ref({ name: "哈哈哈" });
  const change = () => {
    Man.value.name = "测试";
    console.log(isRef(Man));
  };
</script>
```

- shallowRef 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的
  ref 深层次 shalowRef 浅层次的响应 shalowRef 只到.value
  ref 和 shalowRef 是不能一块写的 不然会影响 shalowRef 造成视图的更新

```html
<script setup lang="ts">
  import { Ref, shallowRef } from "vue";
  type Obj = {
    name: string;
  };
  const message = shallowRef({
    name: "小满",
  });

  const changeMsg = () => {
    message.value.name = "大满2";
    // shallowRef更改的话需要这样写
    message.value = {
      name: "我是更新的",
    };
    console.log(message);
  };
</script>
```

- triggerRef 强制更新页面 DOM

```html
<script setup lang="ts">
  import { Ref, shallowRef, triggerRef } from "vue";
  type Obj = {
    name: string;
  };
  const message = shallowRef({
    name: "小满",
  });

  const changeMsg = () => {
    message.value.name = "大满2";
    triggerRef(message);
    console.log(message);
  };
</script>
```

- customRef 自定义 ref
  customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set 适合去做防抖之类的
