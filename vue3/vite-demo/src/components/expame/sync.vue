<template>

    <div class="sync">
        <div class="sync-content">
            <div><img :src="data.url"></div>
            <div class="sync-pop">
                <div>{{ data.name }} {{ data.age }}</div>
                <div>&nbsp;</div>
            </div>
        </div>
        <hr>
        <div>{{ data.desc }}</div>
    </div>

</template>

<script setup lang='ts'>
// import { ref, reactive } from 'vue'
import { axios } from '@/server/axios'
interface Data {
    data: {
        name: string,
        age: number,
        url: string,
        desc: string
    }
}
const { data } = await axios.get<Data>('./data.json')

</script>

<style scoped lang="scss">
.sync {
    .sync-content {
        div img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
        }
    }
}
</style>