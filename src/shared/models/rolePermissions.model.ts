import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import AppRoles from "./roles.model";
import Permissions from "./permissions.model";


@Table({
  tableName: 'rolePermissions',
  modelName: 'RolePermissions',
  timestamps: false
})
class RolePermissions extends Model {
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
