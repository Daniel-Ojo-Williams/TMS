import { Op, Order, WhereOptions } from "sequelize";
import User from "../users/model/user.model";
import { CustomError } from "../utils/customError";
import { getPaginationData } from "../utils/pagination";
import { HttpStatus } from "../utils/statusCodes";
import { PaginationQuery, TaskInput } from "./dto/newTask.dto";
import { UpdateTaskInput } from "./dto/updateTask,dto";
import { AllTasks } from "./interfaces";
import Tasks, { TaskModel } from "./model/tasks.model";
import { checkPermission, hasPermission } from "../middlewares/hasPermissions";
import { Permissions } from "../utils/seedRoles&Permissions";
import { AuthPayload } from "../shared/types/auth";

class TaskService {
  async createTask(newTask: TaskInput, userId: string): Promise<Tasks> {
    const { title, description, dueDate, status } = newTask;
    const task = Tasks.build({ title, description, dueDate, status });
    task.userId = userId;
    return task.save();
  }

  async getATask(taskId: string, user: AuthPayload): Promise<Tasks> {
    const task = await Tasks.findOne({ where: { id: taskId }, include: [{ model: User, attributes: ['name', 'email', 'id'] }] });

    if (!task) throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found');
    checkPermission(Permissions.VIEW_TASK, user, task);
    return task;
  }

  async getAllUserTasks(userId: string, query: PaginationQuery): Promise<AllTasks> {
    const { size, page, status, endDate, startDate } = query;  
    let { sortBy, order } = query;
    sortBy = sortBy === 'dueDate' ? 'dueDate' : 'createdAt';
    order = order === 'ASC' ? 'ASC' : 'DESC'

    // --| Number of items on each page
    const limit = size || 3;
    // --| Number of items to skip
    const offset = page ? limit * (page - 1) : 0;
    const where: WhereOptions<TaskModel> = { userId };
    if (status) {
      where.status = status;
    }
    if (startDate && endDate) {
      where.dueDate = {
        [Op.between]: [startDate, endDate]
      }
    }

    const result = await Tasks.findAndCountAll({ where, limit, offset, order: [ [sortBy, order] ] });
    const { currentPage, items: tasks, totalItems: totalTasks, totalPages } = getPaginationData({ count: result.count, items: result.rows }, limit, page)
    return { currentPage, tasks, totalPages, totalTasks }
  }

  async updateTask(taskId: string, taskDetails: UpdateTaskInput, user: AuthPayload): Promise<Tasks> {
    const { description, dueDate, status, title } = taskDetails;
    await this.getATask(taskId, user);
    const result = await Tasks.update({ description, dueDate, status, title }, { where: { id: taskId }, returning: true });

    const affectedRows = result[0];
    const task = result[1][0];

    if (affectedRows === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found');
    }

    return task;
  }

  async getAllTasks(query: PaginationQuery): Promise<AllTasks> {
    const { page, size, status, deleted, startDate, endDate } = query;
    let { sortBy, order } = query;
    sortBy = sortBy === 'dueDate' ? 'dueDate' : 'createdAt';
    order = order === 'ASC' ? 'ASC' : 'DESC'
    const limit = size || 0;
    const offset = page ? limit * (page - 1) : 0;
    const where: WhereOptions<TaskModel> = {};
    if (status) {
      where.status = status;
    }
    if (deleted) {
      where.deletedAt = {
        [Op.not]: null as any
      }
    }
    if (startDate && endDate) {
      where.dueDate = {
        [Op.between]: [startDate, endDate]
      }
    }
    const result = await Tasks.findAndCountAll({ where, limit, offset, paranoid: deleted === 'true' ? false : true, include: [{ model: User, attributes: ['name', 'email', 'role'] }], order: [[sortBy, order]] });
    const { currentPage, items: tasks, totalItems: totalTasks, totalPages } = getPaginationData({ count: result.count, items: result.rows }, limit, page)
    return { currentPage, tasks, totalPages, totalTasks }
  }

  async deleteTask(taskId: string, user: AuthPayload) {
    await this.getATask(taskId, user);
    const result = await Tasks.destroy({ where: { id: taskId } });

    if (result === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found')
    }
  }
}

export default new TaskService;
