<template>

  <div>
    <TreeVue :data="data"></TreeVue>

  </div>

</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import TreeVue from './components/Tree.vue'
// import CardVue from './components/Card.vue'
interface Tree {
  name: string,
  cheack: boolean,
  children?: Tree[]
}
const data = reactive<Tree[]>([
  {
    name: '1',
    cheack: false,
    children: [{
      name: '1-1',
      cheack: false
    }, {
      name: '1-2',
      cheack: true
    }]
  },
  {
    name: '2',
    cheack: false
  },
  {
    name: '3',
    cheack: false,
    children: [{
      name: '3-1',
      cheack: false,
      children: [{
        name: '3-1-2',
        cheack: false
      }]
    }]
  }
])
</script>

<style scoped></style>