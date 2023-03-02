<template>
  <a-space>
    <img alt="logo" class="w-14 h-14" src="@/assets/images/logo.png" />
    <div class="text-base text-white text-7x1">NUXT</div>

    <!-- <a-button @click="onCollapse">
      <IconCaretRight v-if="collapsed" />
      <IconCaretLeft v-else />
    </a-button> -->
  </a-space>
</template>

<script lang="ts" setup>
  const collapsed = ref(false)

  const onCollapse = () => {
    collapsed.value = !collapsed.value
  }
</script>

<style lang="less" scoped></style>
