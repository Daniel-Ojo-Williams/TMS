import Permissions from "../shared/models/permissions.model";
import AppRoles from "../shared/models/roles.model";
import { Roles } from "../shared/types/roles";

class RolesService {
  async getAllRoles(): Promise<{ role: string; permissions: string[] }[]> {
    const roles = await AppRoles.findAll({ include: [Permissions] })
    return roles.map(role => ({ role: role.role, permissions: role.permissions.map(perm => perm.permission) }));
  }

  async getAllPermissions(): Promise<Permissions[]> {
    return await Permissions.findAll();
  }

  async createRole() {

  }

  async updateRole() {

  }

  async deleteRole() {

  }
}

export default new RolesService;
