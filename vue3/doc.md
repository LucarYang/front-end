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

```html
<script setup lang="ts">
  import { ref, reactive, onMounted, shallowRef, customRef } from "vue";

  function myRef<T = any>(value: T) {
    let timer: any;
    return customRef((track, trigger) => {
      return {
        get() {
          track();
          return value;
        },
        set(newVal) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            console.log("触发了set");
            value = newVal;
            trigger();
          }, 500);
        },
      };
    });
  }

  const name = myRef<string>("小满");

  const change = () => {
    name.value = "大满";
  };
</script>
```

- ref 获取 DOM

```html
<template>
  <div>
    <button @click="changeMsg">change</button>
    <div ref="dom">我是dom</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  const dom = ref<HTMLElement>();
  const changeMsg = () => {
    console.log(dom.value?.innerText);
  };
</script>
```

## reactive

reactive 和 ref 一样都是将一个变量作为响应式变量；用来绑定复杂的数据类型 例如 对象 数组

```html
<template>
  <div>
    <form action="">
      <input v-model="form.name" type="text" />
      <br />
      <input v-model="form.age" type="text" />
      <br />
      <button @click.prevent="submit">submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  // ref, reactive
  //ref支持所有类型，reactive支引用类型 Array Object Map Set
  //ref 取值赋值都需要加.value  reactive是不需要的
  type M = {
    name: string;
    age: number;
  };
  let form = reactive<M>({
    name: "xx",
    age: 13,
  });

  const submit = () => {
    console.log(form);
  };
  form.age = 15;
</script>

<style></style>
```

ref, reactive 区别

- ref 支持所有类型，reactive 支引用类型 Array Object Map Set
- ref 取值赋值都需要加.value reactive 是不需要的

reactive proxy 不能直接赋值 否则破坏响应式的对象： 解决方案

- 1、数组 可以使用 push 加解构
- 2、添加一个对象把数组最为一个属性去解决

```html
<template>
  <div>
    <ul>
      <li v-for="item in list.arr">{{ item }}</li>
    </ul>
    <button @click="add">add</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  // ref, reactive
  //ref支持所有类型，reactive支引用类型 Array Object Map Set
  //ref 取值赋值都需要加.value  reactive是不需要的

  // reactive proxy 不能直接赋值 否则破坏响应式的对象
  // 解决方案
  // 1、数组 可以使用push加解构
  // 2、添加一个对象把数组最为一个属性去解决

  // let list = reactive<string[]>([])
  let list = reactive<{ arr: string[] }>({ arr: [] });

  const add = () => {
    setTimeout(() => {
      let res = ["ABC", "BCD", "EDF"];
      // list.push(...res)
      list.arr = res;
      console.log(list);
    }, 500);
  };
</script>
```

- readonly 拷贝一份 proxy 对象将其设置为只读

```html
<script setup lang="ts">
  import { reactive, readonly } from "vue";
  let obj = reactive({ name: "tom" });
  const read = readonly(obj);
  const show = () => {
    obj.name = "xxx";
    console.log(obj.name);
    console.log(read);
  };
</script>
```

- shallowReactive 只能对浅层的数据 如果是深层的数据只会改变值 不会改变视图

```html
<script setup lang="ts">
  import { shallowReactive } from "vue";

  let obj2: any = shallowReactive({
    foo: {
      bar: {
        num: 1,
      },
    },
  });

  const edit = () => {
    // obj2.foo.bar.num = 234
    obj2.foo = { name: "dd" };
    console.log(obj2);
  };
</script>
```

## toRef toRefs toRaw

- toRef

```html
<script setup lang="ts">
  import { toRef, reactive, toRefs, toRaw } from "vue";

  // toRef 只能修改响应式对象的值 非响应式视图毫无变化，
  const man = { name: "tom", age: 23, like: "ride" };

  const like = toRef(man, "like");

  const change = () => {
    like.value = "ball";
    console.log(like); //Ref<"ball">
  };
</script>
```

- toRefs 可以帮我们批量创建 ref 对象主要是方便我们解构使用

```html
<script setup lang="ts">
  import { toRef, reactive, toRaw, toRefs } from "vue";

  // toRef 只能修改响应式对象的值 非响应式视图毫无变化，
  const man = reactive({ name: "tom", age: 23, like: "ride" });

  const { name, age, like } = toRefs(man);
  // const like = toRef(man, 'like')

  const change = () => {
    like.value = "ball";
    console.log(like);
  };

  // const toRefs = <T extends object>(object: T) => {
  //     const map: any = {}
  //     for (let key in object) {
  //         map[key] = toRef(object, key)
  //     }
  //     return map
  // }
</script>
```

- toRaw 将响应式对象转化为普通对象

```html
<script setup lang="ts">
  import { toRef, reactive, toRaw, toRefs } from "vue";

  // toRef 只能修改响应式对象的值 非响应式视图毫无变化，
  const man = reactive({ name: "tom", age: 23, like: "ride" });

  const change = () => {
    console.log(man, toRaw(man));
    // console.log(man, man['_v_raw'])
  };
</script>
```

## computed 计算属性

计算属性就是当依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值

- 选项式写法

```html
<template>
  <div>
    <div>姓 <input v-model="firstName" type="text" /></div>
  </div>
  <div>
    <div>明 <input v-model="lastName" type="text" /></div>
  </div>
  <div>全名{{ name }}</div>
  <button @click="changenName">修改</button>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  let firstName = ref("张");
  let lastName = ref("三");
  // 1、选项式写法，支持一个对象传入get函数以及set函数自定义操作
  let name = computed<string>({
    get() {
      return firstName.value + "-" + lastName.value;
    },
    set(newVal) {
      // console.log(newVal.split('-'))
      [firstName.value, lastName.value] = newVal.split("-");
    },
  });

  const changenName = () => {
    name.value = "小-四";
  };
</script>
```

- 函数式写法

```html
<script setup lang="ts">
  import { ref, computed } from "vue";
  let firstName = ref("张");
  let lastName = ref("三");
  // 2、函数式写法 只能支持一个getter函数 不允许修改的值
  let name = computed(() => firstName.value + "-" + lastName.value);
</script>
```

```html
<template>
  <div>
    <div>
      <input v-model="keyWord" placeholder="搜索" type="text" />
    </div>
    <div style="margin-top: 20px;">
      <table>
        <thead>
          <tr>
            <th>物品名称</th>
            <th>物品单价</th>
            <th>物品数量</th>
            <th>物品总价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchData">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.num * item.price }}</td>
            <td>
              <button @click="item.num > 1 ? (item.num--) : null">-</button>
              <input v-model="item.num" type="number" />
              <button @click="item.num < 99 ? (item.num++) : null">+</button>
            </td>
            <td><button @click="del(index)">删除</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" align="right">
              <span>总价：{{ total }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from "vue";
  // let $total = ref<number>(0)
  let keyWord = ref<string>("");
  interface Data {
    name: string;
    price: number;
    num: number;
  }
  let data = reactive<Data[]>([
    { name: "测试1", price: 100, num: 1 },
    { name: "测试2", price: 120, num: 1 },
    { name: "测试3", price: 110, num: 1 },
  ]);

  // const total = () => {
  //     $total.value = data.reduce((prev: number, next: Data) => {
  //         return prev + next.num * next.price
  //     }, 0)
  // }

  // total()

  const total = computed(() => {
    return data.reduce((prev: number, next: Data) => {
      return prev + next.num * next.price;
    }, 0);
  });
  const del = (index: number) => {
    data.splice(index, 1);
    // total()
  };

  const searchData = computed(() => {
    return data.filter((item: Data) => {
      return item.name.includes(keyWord.value);
    });
  });
</script>

<style scoped></style>
```

## watch 监听数据源

需要侦听特定的数据源，并在单独的回调函数中执行副作用

```js
//watch第一个参数监听源

//watch第二个参数回调函数cb（newVal,oldVal）

//watch第三个参数一个options配置项是一个对象

{
  immediate: true; //是否立即调用一次

  deep: true; //是否开启深度监听
}
```

https://xiaoman.blog.csdn.net/article/details/122792620
