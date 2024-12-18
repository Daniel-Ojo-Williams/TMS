import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import Permissions from "./permissions.model";
import RolePermissions from "./rolePermissions.model";

export interface RolesModel {
  role: string,
  permissions: string[];
}

@Table({
  tableName: 'roles',
  modelName: 'AppRoles',
  timestamps: false
})
class AppRoles extends Model<RolesModel, { role: string }> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  role!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  description?: string;

  @BelongsToMany(() => Permissions, () => RolePermissions)
  permissions!: Permissions[];
}

export default AppRoles;
