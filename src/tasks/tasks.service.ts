import { Op, WhereOptions } from "sequelize";
import User from "../users/model/user.model";
import { CustomError } from "../utils/customError";
import { getPaginationData } from "../utils/pagination";
import { HttpStatus } from "../utils/statusCodes";
import { PaginationQuery, TaskInput } from "./dto/newTask.dto";
import { UpdateTaskInput } from "./dto/updateTask,dto";
import { AllTasks } from "./interfaces";
import Tasks, { TaskModel } from "./model/tasks.model";

class TaskService {
  async createTask(newTask: TaskInput, userId: string): Promise<Tasks> {
    const { title, description, dueDate, status } = newTask;
    const task = Tasks.build({ title, description, dueDate, status });
    task.userId = userId;
    return task.save();
  }

  async getATask(taskId: string): Promise<Tasks> {
    const task = await Tasks.findOne({ where: { id: taskId }, include: [{ model: User, attributes: ['name', 'email'] }] });

    if (!task) throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found');

    return task;
  }

  async getAllUserTasks(userId: string, pagination: PaginationQuery): Promise<AllTasks> {
    const { size, page, status } = pagination;  
    // --| Number of items on each page
    const limit = size || 3;
    // --| Number of items to skip
    const offset = page ? limit * (page - 1) : 0;
    const result = await Tasks.findAndCountAll({ where: { userId, status }, limit, offset });
    const { currentPage, items: tasks, totalItems: totalTasks, totalPages } = getPaginationData({ count: result.count, items: result.rows }, limit, page)
    return { currentPage, tasks, totalPages, totalTasks }
  }

  async updateTask(taskId: string, taskDetails: UpdateTaskInput): Promise<Tasks> {
    const { description, dueDate, status, title } = taskDetails;
    const result = await Tasks.update({ description, dueDate, status, title }, { where: { id: taskId }, returning: true });

    const affectedRows = result[0];
    const task = result[1][0];

    if (affectedRows === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found');
    }

    return task;
  }

  async getAllTasks(query: PaginationQuery): Promise<AllTasks> {
    const { page, size, status, deleted } = query;
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
    const result = await Tasks.findAndCountAll({ where, limit, offset, paranoid: deleted === 'true' ? false : true, include: [{ model: User, attributes: ['name', 'email', 'role'] }] });
    const { currentPage, items: tasks, totalItems: totalTasks, totalPages } = getPaginationData({ count: result.count, items: result.rows }, limit, page)
    return { currentPage, tasks, totalPages, totalTasks }
  }

  async deleteTask(taskId: string) {
    const result = await Tasks.destroy({ where: { id: taskId } });

    if (result === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Task not found')
    }
  }
}

export default new TaskService;
