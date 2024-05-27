<template>

    <div class="tree" v-for="item in data">
        <input v-model="item.cheack" type="checkbox"><span>{{ item.name }}</span>
        <Tree v-if="item?.children" :data="item?.children"></Tree>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
interface Tree {
    name: string,
    cheack: boolean,
    children?: Tree[]
}
defineProps<{
    data?: Tree[]
}>()
</script>

<style scoped lang="scss">
.tree {
    margin-left: 10px;
}
</style>