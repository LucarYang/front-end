<template>

    <div>
        <header class="header">
            <slot name="header"></slot>
        </header>
        <main class="main">
            <div v-for="(item, index) in data">
                <slot :index="index" :data="item"></slot>
            </div>
        </main>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>

</template>

<script setup lang='ts'>
import { reactive } from 'vue'
type names = {
    name: string,
    age: number
}
const data = reactive<names[]>([{
    name: '测试', age: 18
},
{
    name: '测试1', age: 18
},
{
    name: '测试2', age: 18
},
{
    name: '测试3', age: 18
}])
</script>

<style scoped lang="scss">
.header {
    height: 200px;
    background: red;
    color: #fff;
}

.main {
    height: 300px;
    background: green;
    color: #fff;
}

.footer {
    height: 200px;
    background: blue;
    color: #fff;
}
</style>