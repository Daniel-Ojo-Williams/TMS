import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Index, Model, Scopes, Table, UpdatedAt } from "sequelize-typescript";
import type { RegisterUserInput } from "../dto/user-auth.dto";
import AppRoles from "../../shared/models/roles.model";

interface UserModelAttributes extends RegisterUserInput {
  role: string;
}

export interface UserModel extends UserModelAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  Role: AppRoles;
}

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',  
  day: 'numeric'
});
}

@Table({
  tableName: 'users',
  modelName: 'Users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  paranoid: true
})
export default class User extends Model<UserModel, UserModelAttributes> {
  @Column({ primaryKey: true, type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({
    unique: true,
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @BelongsTo(() => AppRoles, 'role')
  Role!: AppRoles

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  name!: string;
  
  @Column({
    get() {
      const value = this.getDataValue('createdAt');
      if (value) {
        return formatDate(value)
      }
      return value;
    }
  })
  @CreatedAt
  createdAt!: Date;
  
  @Column({
    get() {
      const value = this.getDataValue('updatedAt');
      if (value) {
        return formatDate(value)
      }
      return value;
    }
  })
  @UpdatedAt
  updatedAt!: Date;
  
  @Column({
    get() {
      const value = this.getDataValue('deletedAt');
      if (value) {
        return formatDate(value)
      }
      return value;
    }
  })
  @DeletedAt
  deletedAt?: Date;
}