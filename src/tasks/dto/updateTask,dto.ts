import { z } from "zod";
import { TaskDto } from "./newTask.dto";

export const UpdateTaskDto = z.object({
  body: TaskDto.shape.body.partial(),
  params: z.object({
    taskId: z.string().uuid()
  })
});

export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>['body'];
export type UpdateTaskParam = z.infer<typeof  UpdateTaskDto>['params'];