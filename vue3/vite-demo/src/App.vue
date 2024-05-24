<template>

  <!-- <div class="xm-test">
    aaa
    <div class="xm-test__inner">el</div>
    <div class="xm-test--success">test</div>
  </div>
  <a href="">111</a> -->
  <!-- <Layout></Layout> -->
  <div>父组件</div>
  <hr>
  <waterFallVue ref="waterFall"></waterFallVue>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
// import Layout from './Layout/index.vue'
import waterFallVue from './components/water-fall.vue'

const waterFall = ref<InstanceType<typeof waterFallVue>>()

onMounted(() => {
  console.log(waterFall.value?.name)
  if (waterFall.value) {
    waterFall.value.open()
  }
})
</script>

<style lang="scss" scoped>
#app {

  @include bfc;
}

@include b(test) {
  color: red;

  @include e(inner) {
    color: blue;
  }

  @include m(success) {
    color: #678903;
  }
}
</style>