<template>
  <a-result status="403" subtitle="Access to this resource on the server is denied.">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="backHome">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
  const router = useRouter()

  const backHome = () => router.replace({ path: '/' })
</script>
