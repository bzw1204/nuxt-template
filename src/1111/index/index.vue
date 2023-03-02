<template>
  <div class="flex flex-col items-center justify-center">
    <h1>INDEX</h1>
    <NuxtLink to="/detail">to detail</NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import { getDictCache } from '@/api/common'

  getDictCache()
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err.message)
    })
</script>
