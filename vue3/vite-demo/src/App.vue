<template>
  <Suspense>
    <template #default>
      <SyncVue></SyncVue>
    </template>
    <template #fallback>
      <sk></sk>
    </template>
  </Suspense>

</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'
import sk from './components/expame/skeleton.vue'
const SyncVue = defineAsyncComponent(() => import('@/components/expame/sync.vue'))
</script>

<style scoped lang="scss"></style>