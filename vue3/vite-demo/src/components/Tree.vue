<template>

    <div @click.stop="clickTap(item, $event)" class="tree" v-for="item in data">
        <input v-model="item.cheack" type="checkbox"><span>{{ item.name }}</span>
        <xiaoman v-if="item?.children" :data="item?.children"></xiaoman>
        <!-- <ceshi v-if="item?.children" :data="item?.children"></ceshi> -->
    </div>

</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
interface Tree {
    name: string,
    cheack: boolean,
    children?: Tree[]
}

defineOptions({
    name: 'xiaoman'
})

defineProps<{
    data?: Tree[]
}>()

const clickTap = (item: Tree, e: { target: any; }) => {
    console.log(item, e.target)
}
</script>

<!-- <script lang="ts">
export default {
    name: 'ceshi'
}
</script> -->

<style scoped lang="scss">
.tree {
    margin-left: 10px;
}
</style>