<template>

    <div>子组件</div>
    <!-- <div>值：{{ title }}</div>
    <div>{{ arr }}</div> -->
    <button> 传递给父组件</button>
</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'



// 暴露给父组件
defineExpose({
    name: '暴露给父组件',
    open: () => console.log('暴露方法')
})
</script>

<style scoped></style>