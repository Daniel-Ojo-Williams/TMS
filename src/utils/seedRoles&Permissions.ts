import AppRoles from '../shared/models/roles.model';
import Permission from '../shared/models/permissions.model';
import RolePermission from '../shared/models/rolePermissions.model';

export enum Permissions {
  CREATE_TASK = 'CREATE_TASK',
  VIEW_TASK = 'VIEW_TASK',
  VIEW_ALL_USERS = 'VIEW_ALL_USERS',
  VIEW_USER_TASKS = 'VIEW_USER_TASKS',
  VIEW_ALL_TASKS = 'VIEW_ALL_TASKS',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export const RolePermissions: Record<string, Permissions[]> = {
  admin: Object.values(Permissions),
  user: [],
  manager: [Permissions.DELETE_TASK, Permissions.VIEW_ALL_USERS, Permissions.VIEW_USER_TASKS]
};

export const seedRolesAndPermissions = async () => {
  for (const [key, val] of Object.entries(RolePermissions)) {
    await AppRoles.upsert({ role: key });
  }

  for (const permission of Object.values(Permissions)) {
    await Permission.upsert({ permission });
  }

  for (const role in RolePermissions) {
    for (const permission of RolePermissions[role]) {
      await RolePermission.upsert({ role, permission });
    }
  }
};
