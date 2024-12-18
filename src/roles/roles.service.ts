import { sequelize } from '../db/connection';
import Permissions from "../shared/models/permissions.model";
import AppRoles from "../shared/models/roles.model";
import RolePermissions from '../shared/models/rolePermissions.model';
import { NewRoleInput } from "./dto/newRole.dto";
import { AssignRoleInput } from './dto/assignRole';
import User from '../users/model/user.model';
import { CustomError } from '../utils/customError';
import { HttpStatus } from '../utils/statusCodes';

class RolesService {
  async getAllRoles(): Promise<{ role: string; permissions: string[] }[]> {
    const roles = await AppRoles.findAll({ include: [Permissions] })
    return roles.map(role => ({ role: role.role, permissions: role.permissions.map(perm => perm.permission) }));
  }

  async getAllPermissions(): Promise<Permissions[]> {
    return await Permissions.findAll();
  }

  async createRole(newRole: NewRoleInput) {
    const { permissions, role } = newRole;
    const rolePermissions: { role: string; permission: string }[] = [];
    permissions.forEach(perm => {
      rolePermissions.push({ role, permission: perm });
    })
    const t = await sequelize.transaction();
    try {
      const Role = await AppRoles.create({ role }, { transaction: t });
      await RolePermissions.bulkCreate(rolePermissions, { transaction: t });
      await t.commit();
      return Role
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async updateUserRole(roleDetails: AssignRoleInput) {
    const { role, userId } = roleDetails;
    const result = await User.update({ role }, { where: { id: userId } });
    if (result[0] === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'User not found')
    }
  }

  async updateRole() {

  }

  async deleteRole() {

  }
}

export default new RolesService;
