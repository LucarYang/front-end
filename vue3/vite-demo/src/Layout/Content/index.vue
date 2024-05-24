<template>

    <div class="xm-content">content
        <div class="xm-content__item" v-for="item in 100">{{ item }}</div>
    </div>

</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
@include b(content) {
    flex: 1;
    overflow: auto;

    @include e(item) {
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
}
</style>