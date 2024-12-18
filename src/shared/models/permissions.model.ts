import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import AppRoles from "./roles.model";
import RolePermissions from "./rolePermissions.model";


@Table({
  tableName: 'permissions',
  modelName: 'Permissions',
  timestamps: false
})
class Permissions extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  permission!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  description?: string;

  @BelongsToMany(() => Permissions, () => RolePermissions)
  roles!: AppRoles[];
}

export default Permissions;
