<template>
    <div>
        <button @click="changeMsg">change</button>
        <div>{{ message }}</div>
    </div>
</template>



<script setup lang="ts">
import { Ref, shallowRef, triggerRef, customRef } from 'vue'

function MyRef<T>(value: T) {
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                value = newValue
                trigger()
            }
        }
    })
}


type Obj = {
    name: string
}
const message = MyRef({
    name: "小满"
})

const changeMsg = () => {
    message.value.name = '大满2'
    // shallowRef更改的话需要这样写
    // message.value = {
    //     name: '我是更新的'
    // }
    // 通过triggerRef做强制更新
    triggerRef(message)
    console.log(message)
}
</script>


<style></style>