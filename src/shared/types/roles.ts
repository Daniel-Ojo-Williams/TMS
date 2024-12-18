export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

export const RolePermissions: Record<Roles, string[]> = {
  admin: ['create-task', 'delete-task', 'update-task', ''],
  user: [],
  manager: [],
}