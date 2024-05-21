<template>

    <div>
        <input type="text" v-model="message" name="" id="ipt">
        <input type="text" v-model="message2" name="" id="">
        <button @click="stopWatch">停止监听</button>
    </div>

</template>

<script setup lang='ts'>
import { watchEffect, ref, reactive } from 'vue'

let message = ref<string>("飞机")
let message2 = ref<string>("大炮")

const stop = watchEffect((oninavlidate) => {
    // let ipt: HTMLInputElement = document.querySelector('#ipt') as HTMLInputElement
    console.log('message:', message.value, message2.value)
    // console.log(ipt)
    oninavlidate(() => {
        console.log('before')
    })
}, {
    flush: 'post',
    onTrigger(e) {
        debugger
    }
})

const stopWatch = () => stop()
</script>

<style scoped></style>