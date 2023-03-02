import type { RouteRecordRaw, RouteRecordName } from 'vue-router'

export function assertRedirectRoute(route: any): boolean {
  return !['/:path(.*)*', '/login', '/403'].includes(route.path)
}

export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter(item => assertRedirectRoute(item))
}

export interface MenuProps {
  key: string
  name: RouteRecordName
  path: string
  title: string
  icon: string
  children?: MenuProps[]
  permission?: string
}

export function sortByOrder(routes: RouteRecordRaw[]) {
  routes.sort((a, b) => {
    if (a.meta && b.meta) {
      return (a.meta.order ?? 0) - (b.meta.order ?? 0)
    }
    return 0
  })
}

export function generatorMenu(permissionList: any[], routerMap: Array<any>, result: MenuProps[] = []) {
  // 过滤无权限的菜单路由
  sortByOrder(routerMap)
  routerMap.forEach(item => {
    console.log('item', item)
    const isRoot = item.name === 'root'
    const info = isRoot ? item.children[0] : item
    const permission = item.permission ?? info.meta?.permission
    const hasPermission = !permission || permissionList.includes(permission)

    if (hasPermission) {
      const currentMenu = {
        title: info.meta?.title,
        permission: item.permission ?? info.meta?.permission,
        name: info.name,
        path: info.path,
        key: info.name,
        icon: isRoot ? item.meta?.icon : info.meta?.icon,
        children: [] as MenuProps[]
      }
      //   // 是否有子菜单，并递归处理
      if (info.children && info.children.length > 0) {
        // Recursion

        currentMenu.children = generatorMenu(permissionList, info.children, [])
      }
      result.push(currentMenu)
    }
  })
  return result
}
