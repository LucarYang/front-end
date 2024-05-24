<template>

    <div class="xm-box">
        <div>
            <Menu></Menu>
        </div>
        <div class="xm-box__right">
            <Header></Header>
            <Content></Content>
        </div>
    </div>

</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Content from './Content/index.vue'
</script>

<style scoped lang="scss">
@include b(box) {
    @include bfc;
    display: flex;

    @include e(right) {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
}
</style>