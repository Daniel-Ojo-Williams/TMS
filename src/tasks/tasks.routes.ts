import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import TasksController from "./tasks.controller";
import { Validator } from "../middlewares/validator";
import { TaskDto } from "./dto/newTask.dto";
import { GetAllTasks, GetTaskDto, GetUserTasks } from "./dto/getTask.dto";
import { UpdateTaskDto } from "./dto/updateTask,dto";
import { hasPermission } from "../middlewares/hasPermissions";
import { Permissions } from "../utils/seedRoles&Permissions";

const router = Router();

router.post('/api/v1/tasks', ensureAuthenticated, Validator(TaskDto), TasksController.createTask);
router.get('/api/v1/tasks', ensureAuthenticated, Validator(GetAllTasks), TasksController.getMyTasks);
router.get('/api/v1/tasks/all', ensureAuthenticated, hasPermission(Permissions.VIEW_ALL_TASKS), Validator(GetAllTasks), TasksController.getAllTasks);
router.get('/api/v1/user/:userId/tasks', ensureAuthenticated, hasPermission(Permissions.VIEW_USER_TASKS), Validator(GetUserTasks), TasksController.getAllUserTasks);
router.route('/api/v1/tasks/:taskId')
  .get(ensureAuthenticated, Validator(GetTaskDto), TasksController.getTask)
  .patch(ensureAuthenticated, Validator(UpdateTaskDto), TasksController.updateTask)
  .delete(ensureAuthenticated, Validator(GetTaskDto), TasksController.deleteTask);

export default router;