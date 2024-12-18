import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import AppRoles from "./roles.model";
import Permissions from "./permissions.model";


export interface RolePermissionAtt {
  role: string;
  permission: string;
}

@Table({
  tableName: 'rolePermissions',
  modelName: 'RolePermissions',
  timestamps: false
})
class RolePermissions extends Model<RolePermissionAtt> {
  @ForeignKey(() => AppRoles)
  @PrimaryKey
  @Column
  role!: string
 
  @ForeignKey(() => Permissions)
  @PrimaryKey
  @Column
  permission!: string
}

export default RolePermissions;
