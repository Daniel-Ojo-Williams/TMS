import { z } from "zod";
import { Pagination } from "./newTask.dto";

export const GetTaskDto = z.object({
  params: z.object({
    taskId: z.string().uuid()
  })
});

export const GetUserTasks = z.object({
  params: z.object({
    userId: z.string().uuid()
  }),
  query: Pagination.shape.query
});

export const GetAllTasks = z.object({
  query: Pagination.shape.query
})

export type GetTaskParam = z.infer<typeof GetTaskDto>['params'];
export type GetUserTasksParam = z.infer<typeof GetUserTasks>['params'];