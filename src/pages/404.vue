<template>
  <div class="h-full text-center">
    <a-result class="result" status="404" :subtitle="'404'"></a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="backHome">返回首页</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const router = useRouter()

  const backHome = () => router.replace({ path: '/' })
</script>
