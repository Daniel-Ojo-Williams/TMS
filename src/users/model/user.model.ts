import { Column, CreatedAt, DataType, DeletedAt, Index, Model, Scopes, Table, UpdatedAt } from "sequelize-typescript";
import type { RegisterUserInput } from "../dto/user-auth.dto";

export interface UserModel extends RegisterUserInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Scopes(() => ({
  removePassword: {
    attributes: {  
      exclude: ['password']
    }
  }
}))
@Table({
  tableName: 'users',
  modelName: 'Users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  paranoid: true
})
export default class User extends Model<UserModel, RegisterUserInput> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Index({
    name: 'idx_user_email',
    unique: true
  })
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

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  name!: string;
  
  @CreatedAt
  createdAt!: Date;
  
  @UpdatedAt
  updatedAt!: Date;
  
  @DeletedAt
  deletedAt?: Date;
}