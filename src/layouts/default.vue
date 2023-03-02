<template>
  <a-layout class="w-full h-full">
    <a-layout-header class="h-16 px-5 flex items-center bg-gray-800"><LayoutNavbar /></a-layout-header>

    <a-layout>
      <a-layout-sider>
        <LayoutSider />
      </a-layout-sider>
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="flex items-center justify-center h-10 bg-gray-800 text-white">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const empty = ref(false)

  watch(
    () => route,
    () => {
      empty.value = route.name === 'login'
    },
    {
      deep: true,
      immediate: true
    }
  )
</script>
