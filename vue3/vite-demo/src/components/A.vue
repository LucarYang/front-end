<template>

    <!-- <div>A组件</div> -->
    <div ref='div'>{{ str }}</div>
    <button @click="change">修改</button>

</template>

<script setup lang='ts'>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onRenderTracked, onRenderTriggered, getCurrentInstance } from 'vue'
// beforeCreate created setup语法糖模式没有这两个生命周期的 setup去代替
// onBeforeMount之前读不到DOM onMounted可以读取到DOM
// onBeforeUpdate获取的是更新之前的DOM onUpdated过去的是更新之后的DOM

const instace = getCurrentInstance()//获取生命周期的实例
console.log('setup', instace)

const str = ref<string>('测试')
const div = ref<HTMLDivElement>()

const change = () => {
    str.value = '修改后的测试'
}


// 创建  创建之前
onBeforeMount(() => {
    console.log('创建之前-------', div)
})

// 创建完成
onMounted(() => {
    console.log('创建完成-------', div)
})

// 更新的钩子
onBeforeUpdate(() => {
    console.log('更新组件之前-------', div.value?.innerText)
})

onUpdated(() => {
    console.log('更新完成-------', div.value?.innerText)
})

// 销毁的钩子
onBeforeUnmount(() => {
    console.log('销毁之前-------')
})

onUnmounted(() => {
    console.log('销毁完成-------')
})

onRenderTracked((e) => {
    console.log(e)
})

onRenderTriggered((e) => {
    console.log(e)
})
</script>

<style scoped></style>