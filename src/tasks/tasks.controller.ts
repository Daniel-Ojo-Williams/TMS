import type { Request, NextFunction, Response } from "express";
import { PaginationQuery, TaskInput } from "./dto/newTask.dto";
import TasksService from "./tasks.service";
import { HttpStatus } from "../utils/statusCodes";
import { UpdateTaskInput, UpdateTaskParam } from "./dto/updateTask,dto";
import { GetTaskParam, GetUserTasksParam } from "./dto/getTask.dto";

class TasksController {
  async createTask(req: Request<{}, {}, TaskInput>, res: Response, next: NextFunction) {
    try {
      const { sub } = req.user;
      const data = await TasksService.createTask(req.body, sub);
      res.status(HttpStatus.CREATED).json({ error: false, message: 'Task created successfully', data });
    } catch (error) {
      next(error)
    }
  }

  async getTask(req: Request<GetTaskParam, {}, TaskInput>, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const data = await TasksService.getATask(taskId, req.user);
      res.status(HttpStatus.OK).json({ error: false, message: 'Task fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getAllTasks(req: Request<{}, {}, {}, PaginationQuery>, res: Response, next: NextFunction)  {
    try {
      const data = await TasksService.getAllTasks(req.query);
      res.status(HttpStatus.OK).json({ error: false, message: 'Tasks fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getMyTasks(req: Request<{}, {}, {}, PaginationQuery>, res: Response, next: NextFunction)  {
    try {
      const { sub } = req.user;
      const data = await TasksService.getAllUserTasks(sub, req.query);
      res.status(HttpStatus.OK).json({ error: false, message: 'Tasks fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async getAllUserTasks(req: Request<GetUserTasksParam, {}, {}, PaginationQuery>, res: Response, next: NextFunction)  {
    try {
      const { userId } = req.params;
      const data = await TasksService.getAllUserTasks(userId, req.query);
      res.status(HttpStatus.OK).json({ error: false, message: 'Tasks fetched successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request<UpdateTaskParam, {}, UpdateTaskInput>, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const data = await TasksService.updateTask(taskId, req.body, req.user);
      res.status(HttpStatus.OK).json({ error: false, message: 'Task updated successfully', data });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request<GetTaskParam, {}, {}>, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      await TasksService.deleteTask(taskId, req.user);
      res.status(HttpStatus.OK).json({ error: false, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new TasksController;
