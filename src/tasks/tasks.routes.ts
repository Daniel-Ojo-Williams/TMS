import { Router } from "express";
import { EnsureAuthenticated } from "../middlewares/authentication";
import TasksController from "./tasks.controller";
import { Validator } from "../middlewares/validator";
import { TaskDto } from "./dto/newTask.dto";
import { GetAllTasks, GetTaskDto, GetUserTasks } from "./dto/getTask.dto";
import { UpdateTaskDto } from "./dto/updateTask,dto";

const router = Router();

router.post('/api/v1/tasks', EnsureAuthenticated, Validator(TaskDto), TasksController.createTask);
router.get('/api/v1/tasks', EnsureAuthenticated, Validator(GetAllTasks), TasksController.getMyTasks);
router.get('/api/v1/tasks/all', EnsureAuthenticated, Validator(GetAllTasks), TasksController.getAllTasks);
router.get('/api/v1/user/:userId/tasks', EnsureAuthenticated, Validator(GetUserTasks), TasksController.getAllUserTasks);
router.route('/api/v1/tasks/:taskId')
  .get(EnsureAuthenticated, Validator(GetTaskDto), TasksController.getTask)
  .patch(EnsureAuthenticated, Validator(UpdateTaskDto), TasksController.updateTask)
  .delete(EnsureAuthenticated, Validator(GetTaskDto), TasksController.deleteTask);

export default router;