<template>

    <div class="sk">
        <div class="sk-2">
            <div></div>
            <div></div>
        </div>
        <hr>
        <div class="sk-3"> </div>
        <div class="sk-4"></div>
    </div>

</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
.sk {
    .sk-2>div {
        margin: 10px;
    }

    .sk-2>div:first-child {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #ccc;
    }

    .sk-2>div:nth-child(2) {
        width: 200px;
        height: 10px;
        border-radius: 25px;
        background-color: #ccc;
    }
}

.sk-3 {
    margin: 10px;
    width: 500px;
    height: 10px;
    border-radius: 25px;
    background-color: #ccc;
}

.sk-4 {
    margin: 10px;
    width: 300px;
    height: 10px;
    border-radius: 25px;
    background-color: #ccc;
}
</style>