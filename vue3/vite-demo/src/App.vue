<template>

    <div>
        case1:
        <input v-model="message.foo.bar.name" type="text">
        <hr>
        case2:
        <input v-model="message2" type="text">
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'

let message = ref({
    foo: {
        bar: {
            name: '测试'
        }
    }
})
let message2 = ref<string>("小试")

watch([message, message2], (newVal, oldVal) => {
    console.log(newVal, oldVal)
}, {
    deep: true //深度监听
})
</script>

<style scoped></style>