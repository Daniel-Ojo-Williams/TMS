import { z } from "zod";

export const AssignRoleDto = z.object({
  body: z.object({
    role: z.string(),
    userId: z.string().uuid()
  })
});

export type AssignRoleInput = z.infer<typeof AssignRoleDto>['body'];
