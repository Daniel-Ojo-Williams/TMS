import { AllowNull, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { TaskInput } from "../dto/newTask.dto";
import User from "../../users/model/user.model";

export interface TaskModel extends TaskInput {
  id: string;
  createdAt: Date;
  userId: string;
  updatedAt: Date;
  deletedAt?: Date;
};

export enum TaskStatus {
  PENDING = 'pending',
  INPROGRESS = 'in-progress',
  COMPLETED = 'completed'
};

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',  
  day: 'numeric'
});

}

@Table({
  tableName: 'tasks',
  modelName: 'Tasks',
  timestamps: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
})
class Tasks extends Model<TaskModel, TaskInput> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string

  @Column({
    type: DataType.DATE,
    allowNull: true,
    get() {
      const value = this.getDataValue('dueDate');
      if (value) {
        return formatDate(value)
      }
      return value;
    }
  })
  dueDate?: Date;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TaskStatus),
    defaultValue: TaskStatus.PENDING
  })
  status!: TaskStatus

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userId!: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user!: User;

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

export default Tasks;