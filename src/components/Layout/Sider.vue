<template>
  <div class="layout-sider h-full bg-gray-800">
    <a-menu class="bg-gray-800" accordion :auto-open-selected="true" :level-indent="40" style="height: 100%">
      <template v-for="route in menuList" :key="route.key">
        <a-menu-item v-if="!route.children || !route.children.length" :key="route.key" @click="goto(route)">
          <template #icon>
            <!-- <component :is="icon" :style="{ color: 'rgba(0, 0, 0, 0.7)' }" /> -->
            <icon-tag />
          </template>
          {{ route.title }}
        </a-menu-item>
        <a-sub-menu v-if="route.children && route.children.length" :key="route.key">
          <template #icon>
            <component :is="route.icon" :style="{ color: 'rgba(255, 255, 255, 0.7)' }" />
          </template>
          <template #title>
            {{ route.title || '' }}
          </template>
          <template #expand-icon-down>
            <icon-caret-down :size="10" :style="{ color: 'rgba(255, 255, 255, 0.7)' }" />
          </template>
          <a-menu-item v-for="_route in route.children || []" :key="_route.key" @click="goto(_route)">
            {{ _route.title || '' }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { generatorMenu, MenuProps } from '@/utils/router'

  const icon = resolveComponent('IconTag')
  const menu = ['index', 'about', 'list', 'user']

  const router = useRouter()

  const menuList = computed(() => {
    const routers = router.getRoutes().filter(item => menu.includes(item.name as string))
    return generatorMenu([], routers)
  })

  const goto = (item: MenuProps) => {
    console.log(item)
    router.push({ path: item.path })
  }
</script>
