export type RoleType = '*' | 'admin' | ''
export interface UserState {
  account?: string
  realName?: string
  avatar?: string
  phone?: string
  roleId: string
  roleName: RoleType
  token?: string
  userId: string
  permissionList?: string[]
}
