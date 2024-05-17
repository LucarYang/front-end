<template>

    <div>
        <div>
            <input placeholder="搜索" type="text">
        </div>
        <div style="margin-top: 20px;">
            <table>
                <thead>
                    <tr>
                        <th>物品名称</th>
                        <th>物品单价</th>
                        <th>物品数量</th>
                        <th>物品总价</th>
                        <th>操作</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.num }}</td>
                        <td>{{ item.num * item.price }}</td>
                        <td>
                            <button @click="item.num > 1 ? item.num-- : null">-</button>
                            <input v-model="item.num" type="number">
                            <button @click="item.num < 99 ? item.num++ : null">+</button>


                        </td>
                        <td><button>删除</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
interface Data {
    name: string,
    price: number,
    num: number
}
let data = reactive<Data[]>([
    { name: '测试1', price: 100, num: 1 },
    { name: '测试2', price: 120, num: 1 },
    { name: '测试3', price: 110, num: 1 }
])
</script>

<style scoped></style>