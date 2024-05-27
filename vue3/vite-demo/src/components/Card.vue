<template>
    <div class="card">
        <div class="card-header">
            <div>标题</div>
            <div>副标题</div>
        </div>
        <div v-if='content' class="card-content">
            {{ content }}
        </div>
    </div>
</template>

<script setup lang="ts">
type Props = {
    content: string
}
defineProps<Props>()

</script>

<style scoped lang='scss'>
.card {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 3px;

    &:hover {
        box-shadow: 0 0 10px #ccc;
    }

    &-content {
        padding: 10px;
    }

    &-header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
}
</style>